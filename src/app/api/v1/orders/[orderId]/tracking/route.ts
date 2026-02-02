import { NextRequest, NextResponse } from 'next/server';
import { validateSession, orders } from '@/lib/db';

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

// GET /api/v1/orders/[orderId]/tracking - Get order tracking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
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

    const { orderId } = await params;
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

    // Simulate tracking data
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        currentStatus: order.status,
        trackingNumber: order.trackingNumber || null,
        carrier: order.carrier || null,
        estimatedDelivery: order.status !== 'delivered' && order.status !== 'cancelled' 
          ? estimatedDelivery.toISOString().split('T')[0]
          : null,
        timeline: order.timeline
      }
    });

  } catch (error) {
    console.error('Get tracking error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
