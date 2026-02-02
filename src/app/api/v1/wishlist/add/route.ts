import { NextRequest, NextResponse } from 'next/server';
import { validateSession, wishlists, findProductById } from '@/lib/db';

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

// POST /api/v1/wishlist/add - Add to wishlist
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
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Product ID is required'
        }
      }, { status: 400 });
    }

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

    const wishlist = wishlists.get(userId) || [];
    
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      wishlists.set(userId, wishlist);
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Added to wishlist',
        count: wishlist.length
      }
    });

  } catch (error) {
    console.error('Add to wishlist error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
