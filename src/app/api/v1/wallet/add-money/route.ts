import { NextRequest, NextResponse } from 'next/server';
import { validateSession, walletBalances, walletTransactions, generateId } from '@/lib/db';

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

// POST /api/v1/wallet/add-money - Add money to wallet
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
    const { amount, paymentMethod = 'upi' } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Valid amount is required'
        }
      }, { status: 400 });
    }

    if (amount < 100) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MINIMUM_AMOUNT',
          message: 'Minimum amount is ₹100'
        }
      }, { status: 400 });
    }

    if (amount > 100000) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MAXIMUM_AMOUNT',
          message: 'Maximum amount per transaction is ₹1,00,000'
        }
      }, { status: 400 });
    }

    const currentBalance = walletBalances.get(userId) || 0;
    const newBalance = currentBalance + amount;
    const now = new Date();

    // Update balance
    walletBalances.set(userId, newBalance);

    // Record transaction
    const transaction = {
      id: generateId('txn'),
      type: 'credit' as const,
      amount,
      description: `Added money via ${paymentMethod.toUpperCase()}`,
      status: 'completed' as const,
      reference: generateId('pay'),
      createdAt: now.toISOString()
    };

    walletTransactions.push(transaction);

    return NextResponse.json({
      success: true,
      data: {
        transactionId: transaction.id,
        amount,
        newBalance,
        message: 'Money added successfully'
      }
    });

  } catch (error) {
    console.error('Add money error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
