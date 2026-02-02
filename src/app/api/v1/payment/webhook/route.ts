import { NextRequest, NextResponse } from 'next/server';
import { orders, walletBalances, walletTransactions, generateId } from '@/lib/db';
import crypto from 'crypto';

// POST /api/v1/payment/webhook - Razorpay webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature (if secret is configured)
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('Webhook signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(body);
    const { event: eventType, payload } = event;

    console.log(`Webhook received: ${eventType}`);

    switch (eventType) {
      case 'payment.captured': {
        const payment = payload.payment.entity;
        const orderId = payment.notes?.orderId;
        
        if (orderId) {
          const order = orders.find(o => o.id === orderId);
          if (order && order.paymentStatus !== 'paid') {
            const now = new Date();
            order.paymentStatus = 'paid';
            order.status = 'confirmed';
            order.razorpayPaymentId = payment.id;
            order.updatedAt = now.toISOString() as any;
            order.timeline.push({
              status: 'confirmed',
              timestamp: now,
              description: 'Payment captured via webhook'
            });
          }
        }
        break;
      }

      case 'payment.failed': {
        const payment = payload.payment.entity;
        const orderId = payment.notes?.orderId;
        
        if (orderId) {
          const order = orders.find(o => o.id === orderId);
          if (order) {
            order.paymentStatus = 'failed';
            order.updatedAt = new Date().toISOString() as any;
          }
        }
        break;
      }

      case 'refund.created': {
        const refund = payload.refund.entity;
        const orderId = refund.notes?.orderId;
        const userId = refund.notes?.userId;
        
        if (orderId && userId) {
          const order = orders.find(o => o.id === orderId);
          if (order) {
            const now = new Date();
            const refundAmount = refund.amount / 100; // Convert from paise
            
            // Credit to wallet
            const currentBalance = walletBalances.get(userId) || 0;
            walletBalances.set(userId, currentBalance + refundAmount);
            
            walletTransactions.push({
              id: generateId('txn'),
              walletId: `wallet_${userId}`,
              userId,
              type: 'refund',
              amount: refundAmount,
              balance: currentBalance + refundAmount,
              description: `Refund for order ${orderId}`,
              referenceId: refund.id,
              createdAt: now
            });

            order.paymentStatus = 'refunded';
            order.timeline.push({
              status: 'refunded',
              timestamp: now,
              description: `Refund of ₹${refundAmount} processed`
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
