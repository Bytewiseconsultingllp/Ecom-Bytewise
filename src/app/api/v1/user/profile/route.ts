import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import User from '@/models/User';

// GET /api/v1/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);

    return NextResponse.json({
      success: true,
      data: {
        userId: auth.user._id?.toString() || '',
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        role: auth.user.role,
        profileImage: auth.user.profileImage,
        isEmailVerified: auth.user.isEmailVerified,
        isPhoneVerified: auth.user.isPhoneVerified,
        createdAt: auth.user.createdAt,
        updatedAt: auth.user.updatedAt
      }
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      }, { status: 401 });
    }

    console.error('Get profile error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching profile'
      }
    }, { status: 500 });
  }
}

// PUT /api/v1/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const body = await request.json();
    const { name, phone, profileImage } = body;

    // Validate fields
    const updates: any = {};
    if (name !== undefined) {
      if (name.length < 2) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Name must be at least 2 characters'
          }
        }, { status: 400 });
      }
      updates.name = name;
    }

    if (phone !== undefined) {
      updates.phone = phone;
    }

    if (profileImage !== undefined) {
      updates.profileImage = profileImage;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      auth.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found'
        }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        isEmailVerified: updatedUser.isEmailVerified,
        isPhoneVerified: updatedUser.isPhoneVerified,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      }, { status: 401 });
    }

    console.error('Update profile error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while updating profile'
      }
    }, { status: 500 });
  }
}
