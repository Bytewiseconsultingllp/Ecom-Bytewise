import { NextRequest, NextResponse } from 'next/server';
import { validateSession, walletBalances, walletTransactions } from '@/lib/db';

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

// GET /api/v1/wallet/balance - Get wallet balance
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

    const balance = walletBalances.get(userId) || 0;
    
    // Calculate stats from transactions
    const userTransactions = walletTransactions.filter(t => t.userId === userId);
    const lifetimeCredits = userTransactions
      .filter(t => t.type === 'credit' || t.type === 'refund' || t.type === 'cashback')
      .reduce((sum, t) => sum + t.amount, 0);
    const lifetimeDebits = userTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // This month's credits
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthCredits = userTransactions
      .filter(t => 
        (t.type === 'credit' || t.type === 'refund' || t.type === 'cashback') &&
        new Date(t.createdAt) >= startOfMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return NextResponse.json({
      success: true,
      data: {
        walletId: `wallet_${userId}`,
        balance: {
          available: balance,
          pending: 0,
          held: 0,
          total: balance
        },
        currency: 'INR',
        stats: {
          lifetimeCredits,
          lifetimeDebits,
          thisMonthCredits
        }
      }
    });

  } catch (error) {
    console.error('Get wallet balance error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
