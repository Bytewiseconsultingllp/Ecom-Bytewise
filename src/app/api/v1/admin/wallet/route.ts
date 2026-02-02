import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Wallet from '@/models/Wallet';
import Order from '@/models/Order';

// GET /api/v1/admin/wallet - Get admin wallet overview
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    await connectDB();

    // Get admin's wallet
    let wallet = await Wallet.findOne({ userId: auth.user._id?.toString() });

    // Create wallet if doesn't exist
    if (!wallet) {
      wallet = await Wallet.create({
        userId: auth.user._id?.toString(),
        balance: 0,
        transactions: [],
        lifetimeEarnings: 0,
        lifetimeSpent: 0,
      });
    }

    // Calculate total revenue from orders (for admin overview)
    const orderStats = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const pendingPayouts = await Order.aggregate([
      { $match: { status: 'delivered', paymentStatus: 'paid' } },
      {
        $group: {
          _id: null,
          amount: { $sum: '$total' },
        },
      },
    ]);

    // Get recent transactions
    const recentTransactions = wallet.transactions
      .slice(-10)
      .reverse()
      .map((txn: { transactionId: string; type: string; amount: number; description: string; orderId?: string; createdAt: Date }) => ({
        id: txn.transactionId,
        type: txn.type,
        amount: txn.amount,
        description: txn.description,
        orderId: txn.orderId,
        createdAt: txn.createdAt,
      }));

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalBalance: wallet.balance,
          totalCredits: wallet.lifetimeEarnings,
          totalDebits: wallet.lifetimeSpent,
          pendingPayouts: pendingPayouts[0]?.amount || 0,
          totalRevenue: orderStats[0]?.totalRevenue || 0,
        },
        transactions: recentTransactions,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage === 'UNAUTHORIZED' || errorMessage === 'FORBIDDEN') {
      return NextResponse.json(
        {
          success: false,
          error: { code: errorMessage, message: 'Admin access required' },
        },
        { status: errorMessage === 'UNAUTHORIZED' ? 401 : 403 }
      );
    }

    console.error('Admin wallet error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Failed to fetch wallet data' },
      },
      { status: 500 }
    );
  }
}
