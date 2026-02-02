import { NextRequest, NextResponse } from 'next/server';
import { validateSession, coupons } from '@/lib/db';

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

// POST /api/v1/coupons/validate - Validate a coupon code
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
    const { code, orderValue } = body;

    if (!code) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Coupon code is required'
        }
      }, { status: 400 });
    }

    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_COUPON',
          message: 'Invalid coupon code'
        }
      }, { status: 400 });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'COUPON_INACTIVE',
          message: 'This coupon is no longer active'
        }
      }, { status: 400 });
    }

    // Check validity period
    const now = new Date();
    if (now < coupon.validFrom) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'COUPON_NOT_STARTED',
          message: 'This coupon is not yet valid'
        }
      }, { status: 400 });
    }

    if (now > coupon.validTo) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'COUPON_EXPIRED',
          message: 'This coupon has expired'
        }
      }, { status: 400 });
    }

    // Check minimum order value
    if (orderValue && orderValue < coupon.minOrderValue) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MINIMUM_ORDER_NOT_MET',
          message: `Minimum order value of ₹${coupon.minOrderValue} required`
        }
      }, { status: 400 });
    }

    // Calculate discount
    let discount = 0;
    if (orderValue) {
      if (coupon.type === 'percentage') {
        discount = Math.min(
          Math.round(orderValue * coupon.value / 100),
          coupon.maxDiscount
        );
      } else {
        discount = Math.min(coupon.value, coupon.maxDiscount);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount: discount,
        minOrderValue: coupon.minOrderValue,
        maxDiscount: coupon.maxDiscount,
        validUntil: coupon.validTo,
        message: `Coupon applied! You save ₹${discount}`
      }
    });

  } catch (error) {
    console.error('Validate coupon error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
