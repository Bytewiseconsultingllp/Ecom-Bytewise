import { NextRequest, NextResponse } from 'next/server';
import { sessions } from '@/lib/db';

// POST /api/v1/auth/logout
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'No valid token provided'
        }
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Remove session
    sessions.delete(token);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Logged out successfully'
      }
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during logout'
      }
    }, { status: 500 });
  }
}
