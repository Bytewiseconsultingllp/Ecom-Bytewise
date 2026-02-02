import { NextRequest, NextResponse } from 'next/server';
import { validateSession, carts } from '@/lib/db';

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

// DELETE /api/v1/cart/remove/[itemId] - Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
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

    const { itemId } = await params;
    // itemId could be cart_productId or just productId
    const productId = itemId.startsWith('cart_') ? itemId.replace('cart_', '') : itemId;

    let cartItems = carts.get(userId) || [];
    const originalLength = cartItems.length;
    
    cartItems = cartItems.filter(item => item.productId !== productId);

    if (cartItems.length === originalLength) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Item not found in cart'
        }
      }, { status: 404 });
    }

    carts.set(userId, cartItems);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Item removed from cart',
        cartItemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
