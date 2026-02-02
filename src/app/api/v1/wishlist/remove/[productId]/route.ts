import { NextRequest, NextResponse } from 'next/server';
import { validateSession, wishlists } from '@/lib/db';

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

// DELETE /api/v1/wishlist/remove/[productId] - Remove from wishlist
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
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

    const { productId } = await params;
    let wishlist = wishlists.get(userId) || [];
    
    const originalLength = wishlist.length;
    wishlist = wishlist.filter(id => id !== productId);

    if (wishlist.length === originalLength) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Item not in wishlist'
        }
      }, { status: 404 });
    }

    wishlists.set(userId, wishlist);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Removed from wishlist',
        count: wishlist.length
      }
    });

  } catch (error) {
    console.error('Remove from wishlist error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
