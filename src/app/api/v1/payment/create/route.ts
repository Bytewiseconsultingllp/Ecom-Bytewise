import { NextRequest, NextResponse } from 'next/server';
import { validateSession, orders, findUserById } from '@/lib/db';
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

// POST /api/v1/payment/create - Create Razorpay order
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
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Order ID is required'
        }
      }, { status: 400 });
    }

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
        success: false,
        error: {
          code: 'ALREADY_PAID',
          message: 'Order is already paid'
        }
      }, { status: 400 });
    }

    const user = findUserById(userId);
    const amount = order.summary.total * 100; // Razorpay expects amount in paise

    // Check if Razorpay credentials are available
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      // Return mock response for development
      const mockRazorpayOrderId = `order_${Date.now()}${Math.random().toString(36).substring(2, 7)}`;

      return NextResponse.json({
        success: true,
        data: {
          orderId: order.id,
          razorpayOrderId: mockRazorpayOrderId,
          amount: amount,
          currency: 'INR',
          keyId: 'rzp_test_demo', // Demo key for testing
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || ''
          },
          notes: {
            orderId: order.id
          },
          theme: {
            color: '#2563eb' // Primary blue color
          },
          // For development: auto-complete payment
          developmentMode: true,
          message: 'Development mode - Razorpay credentials not configured'
        }
      });
    }

    // Create actual Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount,
      currency: 'INR',
      receipt: order.id,
      notes: {
        orderId: order.id,
        userId: userId
      }
    }, razorpayKeyId, razorpayKeySecret);

    // Store the razorpay order id (would normally be stored in DB)
    // order.razorpayOrderId = razorpayOrder.id;

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: razorpayKeyId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        notes: razorpayOrder.notes,
        theme: {
          color: '#2563eb'
        }
      }
    });

  } catch (error) {
    console.error('Create payment error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while creating payment'
      }
    }, { status: 500 });
  }
}

// Helper function to create Razorpay order
async function createRazorpayOrder(
  orderData: {
    amount: number;
    currency: string;
    receipt: string;
    notes: Record<string, string>;
  },
  keyId: string,
  keySecret: string
) {
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    throw new Error('Failed to create Razorpay order');
  }

  return response.json();
}
