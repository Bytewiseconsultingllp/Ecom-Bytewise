import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Session from '@/models/Session';
import User, { IUser } from '@/models/User';

export interface AuthUser {
  userId: string;
  user: IUser;
}

export async function authenticate(request: NextRequest): Promise<AuthUser | null> {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    
    // Find session
    const session = await Session.findOne({ token });
    if (!session) {
      return null;
    }

    // Check if session expired
    if (new Date() > session.expiresAt) {
      await Session.deleteOne({ token });
      return null;
    }

    // Get user
    const user = await User.findById(session.userId);
    if (!user) {
      return null;
    }

    return {
      userId: user._id.toString(),
      user
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const auth = await authenticate(request);
  if (!auth) {
    throw new Error('UNAUTHORIZED');
  }
  return auth;
}

export async function requireAdmin(request: NextRequest): Promise<AuthUser> {
  const auth = await requireAuth(request);
  if (auth.user.role !== 'admin') {
    throw new Error('FORBIDDEN');
  }
  return auth;
}
