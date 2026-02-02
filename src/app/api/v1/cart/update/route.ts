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

// PUT /api/v1/cart/update - Update cart item quantity
export async function PUT(request: NextRequest) {
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
    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Product ID and quantity are required'
        }
      }, { status: 400 });
    }

    let cartItems = carts.get(userId) || [];
    const itemIndex = cartItems.findIndex(item => item.productId === productId);

    if (itemIndex < 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Item not in cart'
        }
      }, { status: 404 });
    }

    if (quantity <= 0) {
      // Remove item
      cartItems = cartItems.filter(item => item.productId !== productId);
    } else {
      // Check stock
      const product = findProductById(productId);
      if (product && quantity > product.stock) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `Only ${product.stock} items available`
          }
        }, { status: 400 });
      }
      cartItems[itemIndex].quantity = quantity;
    }

    carts.set(userId, cartItems);

    return NextResponse.json({
      success: true,
      data: {
        message: quantity <= 0 ? 'Item removed from cart' : 'Cart updated',
        cartItemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
