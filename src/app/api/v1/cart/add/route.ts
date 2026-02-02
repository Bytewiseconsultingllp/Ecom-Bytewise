import { NextRequest, NextResponse } from 'next/server';
import { validateSession, carts, findProductById } from '@/lib/db';

// Helper to get userId from token
function getUserId(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  const session = validateSession(token);
  return session?.userId || null;
}

// POST /api/v1/cart/add - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Product ID is required'
        }
      }, { status: 400 });
    }

    // Validate product exists
    const product = findProductById(productId);
    if (!product) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }
      }, { status: 404 });
    }

    // Check stock
    if (!product.inStock || product.stock < quantity) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'OUT_OF_STOCK',
          message: 'Product is out of stock or insufficient quantity'
        }
      }, { status: 400 });
    }

    // Get or create cart
    let cartItems = carts.get(userId) || [];
    
    // Check if item already in cart
    const existingIndex = cartItems.findIndex(item => item.productId === productId);
    
    if (existingIndex >= 0) {
      // Update quantity
      const newQuantity = cartItems[existingIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `Only ${product.stock} items available`
          }
        }, { status: 400 });
      }
      cartItems[existingIndex].quantity = newQuantity;
    } else {
      // Add new item
      cartItems.push({
        id: `${userId}-${productId}`,
        productId,
        name: product.name,
        sku: product.sku,
        price: product.price,
        mrp: product.mrp,
        quantity,
        image: product.images[0]?.url || '',
        addedAt: new Date()
      });
    }

    carts.set(userId, cartItems);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Item added to cart',
        cartItemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
