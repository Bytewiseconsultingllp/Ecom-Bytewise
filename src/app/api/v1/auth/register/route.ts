import { NextRequest, NextResponse } from 'next/server';
import { 
  users, 
  generateId, 
  generateToken, 
  findUserByEmail, 
  createSession,
  sessions
} from '@/lib/db';

// Simple password hashing (in production use bcrypt)
function hashPassword(password: string): string {
  // Simple hash for demo - use bcrypt in production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `hashed_${Math.abs(hash).toString(36)}_${password.length}`;
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// POST /api/v1/auth/register
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Name, email, and password are required',
          details: {
            name: !name ? 'Name is required' : undefined,
            email: !email ? 'Email is required' : undefined,
            password: !password ? 'Password is required' : undefined
          }
        }
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid email format'
        }
      }, { status: 400 });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'A user with this email already exists'
        }
      }, { status: 409 });
    }

    // Password strength check
    if (password.length < 8) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'WEAK_PASSWORD',
          message: 'Password must be at least 8 characters long'
        }
      }, { status: 400 });
    }

    // Create new user
    const userId = generateId('user');
    const hashedPassword = hashPassword(password);
    const now = new Date();

    const newUser = {
      id: userId,
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      password: hashedPassword,
      createdAt: now,
      updatedAt: now
    };

    users.push(newUser);

    // Create session token
    const token = createSession(userId);

    return NextResponse.json({
      success: true,
      data: {
        userId,
        name,
        email: email.toLowerCase(),
        phone: phone || '',
        createdAt: now.toISOString()
      },
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during registration'
      }
    }, { status: 500 });
  }
}
