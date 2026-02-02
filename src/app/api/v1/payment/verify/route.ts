import { NextRequest, NextResponse } from 'next/server';
import { validateSession, orders } from '@/lib/db';
import crypto from 'crypto';

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

// POST /api/v1/payment/verify - Verify Razorpay payment
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
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderId,
      developmentMode 
    } = body;

    // Find order
    const order = orders.find(o => o.id === orderId && o.userId === userId);

    if (!order) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Order not found'
        }
      }, { status: 404 });
    }

    if (order.paymentStatus === 'completed') {
      return NextResponse.json({
        success: true,
        data: {
          orderId: order.id,
          status: 'already_paid',
          message: 'Payment was already verified'
        }
      });
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // Development mode - skip signature verification
    if (developmentMode || !razorpayKeySecret) {
      const now = new Date();
      
      order.paymentStatus = 'completed';
      order.status = 'confirmed';
      order.updatedAt = now.toISOString() as any;

      return NextResponse.json({
        success: true,
        data: {
          orderId: order.id,
          status: 'success',
          message: 'Payment verified successfully (Development Mode)'
        }
      });
    }

    // Verify signature
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing payment verification parameters'
        }
      }, { status: 400 });
    }

    const generatedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      order.paymentStatus = 'failed';
      
      return NextResponse.json({
        success: false,
        error: {
          code: 'SIGNATURE_MISMATCH',
          message: 'Payment verification failed - invalid signature'
        }
      }, { status: 400 });
    }

    // Payment verified successfully
    const now = new Date();
    
    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    order.updatedAt = now.toISOString() as any;

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        status: 'success',
        message: 'Payment verified successfully'
      }
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while verifying payment'
      }
    }, { status: 500 });
  }
}
