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

// GET /api/v1/wishlist - Get wishlist
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

    const wishlistIds = wishlists.get(userId) || [];
    
    const items = wishlistIds.map(productId => {
      const product = findProductById(productId);
      if (!product) return null;
      
      return {
        id: productId,
        productId: product.id,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount,
        image: product.images.find(i => i.isPrimary)?.url || product.images[0]?.url,
        inStock: product.inStock,
        rating: product.rating
      };
    }).filter(Boolean);

    return NextResponse.json({
      success: true,
      data: {
        items,
        count: items.length
      }
    });

  } catch (error) {
    console.error('Get wishlist error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
