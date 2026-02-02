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

// GET /api/v1/cart - Get cart contents
export async function GET(request: NextRequest) {
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

    const cartItems = carts.get(userId) || [];
    
    // Build cart with product details
    const cartWithDetails = cartItems.map(item => {
      const product = findProductById(item.productId);
      if (!product) return null;
      
      return {
        id: `cart_${item.productId}`,
        productId: item.productId,
        name: product.name,
        sku: product.sku,
        price: product.price,
        mrp: product.mrp,
        quantity: item.quantity,
        image: product.images.find(i => i.isPrimary)?.url || product.images[0]?.url,
        inStock: product.inStock,
        stock: product.stock
      };
    }).filter(Boolean);

    // Calculate totals
    const subtotal = cartWithDetails.reduce((sum, item: any) => sum + (item.price * item.quantity), 0);
    const mrpTotal = cartWithDetails.reduce((sum, item: any) => sum + (item.mrp * item.quantity), 0);
    const discount = mrpTotal - subtotal;
    const shipping = subtotal >= 999 ? 0 : 49;
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + tax + shipping;

    return NextResponse.json({
      success: true,
      data: {
        items: cartWithDetails,
        itemCount: cartWithDetails.reduce((sum, item: any) => sum + item.quantity, 0),
        summary: {
          subtotal,
          mrpTotal,
          discount,
          tax,
          shipping,
          total
        }
      }
    });

  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}

// DELETE /api/v1/cart - Clear cart
export async function DELETE(request: NextRequest) {
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

    carts.set(userId, []);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Cart cleared successfully'
      }
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
