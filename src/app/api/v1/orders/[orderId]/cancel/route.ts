import { NextRequest, NextResponse } from 'next/server';
import { validateSession, orders, walletBalances, walletTransactions, generateId } from '@/lib/db';

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

// POST /api/v1/orders/[orderId]/cancel - Cancel order
export async function POST(
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
    const body = await request.json();
    const { reason, notes } = body;

    const orderIndex = orders.findIndex(o => o.id === orderId && o.userId === userId);

    if (orderIndex < 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Order not found'
        }
      }, { status: 404 });
    }

    const order = orders[orderIndex];

    // Check if order can be cancelled
    const cancellableStatuses = ['pending_payment', 'pending', 'confirmed', 'processing'];
    if (!cancellableStatuses.includes(order.status)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'CANNOT_CANCEL',
          message: `Order with status "${order.status}" cannot be cancelled`
        }
      }, { status: 400 });
    }

    const now = new Date();

    // Update order status
    order.status = 'cancelled';
    order.updatedAt = now.toISOString() as any;
    order.timeline.push({
      status: 'cancelled',
      timestamp: now,
      description: `Order cancelled: ${reason || 'Customer request'}`
    });

    // Refund to wallet if payment was made
    if (order.paymentStatus === 'paid') {
      const currentBalance = walletBalances.get(userId) || 0;
      const refundAmount = order.summary.total;
      
      walletBalances.set(userId, currentBalance + refundAmount);
      walletTransactions.push({
        id: generateId('txn'),
        walletId: `wallet_${userId}`,
        userId,
        type: 'refund',
        amount: refundAmount,
        balance: currentBalance + refundAmount,
        description: `Refund for cancelled order ${orderId}`,
        referenceId: orderId,
        createdAt: now
      });

      order.paymentStatus = 'refunded';
    }

    orders[orderIndex] = order;

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        status: order.status,
        paymentStatus: order.paymentStatus,
        refundAmount: order.paymentStatus === 'refunded' ? order.summary.total : 0,
        message: 'Order cancelled successfully'
      }
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
