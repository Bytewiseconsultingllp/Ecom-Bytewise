import { NextRequest, NextResponse } from 'next/server';
import { validateSession, addresses } from '@/lib/db';

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

// PUT /api/v1/addresses/[addressId] - Update address
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ addressId: string }> }
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

    const { addressId } = await params;
    const body = await request.json();
    
    const userAddresses = addresses.get(userId) || [];
    const addressIndex = userAddresses.findIndex(a => a.id === addressId);

    if (addressIndex < 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Address not found'
        }
      }, { status: 404 });
    }

    // Update address fields
    const updatedAddress = {
      ...userAddresses[addressIndex],
      ...body,
      id: addressId,
      userId
    };

    // If setting as default, remove default from others
    if (body.isDefault) {
      userAddresses.forEach((addr, idx) => {
        if (idx !== addressIndex) {
          addr.isDefault = false;
        }
      });
    }

    userAddresses[addressIndex] = updatedAddress;
    addresses.set(userId, userAddresses);

    return NextResponse.json({
      success: true,
      data: {
        address: updatedAddress,
        message: 'Address updated successfully'
      }
    });

  } catch (error) {
    console.error('Update address error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}

// DELETE /api/v1/addresses/[addressId] - Delete address
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ addressId: string }> }
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

    const { addressId } = await params;
    let userAddresses = addresses.get(userId) || [];
    const originalLength = userAddresses.length;
    
    const addressToDelete = userAddresses.find(a => a.id === addressId);
    userAddresses = userAddresses.filter(a => a.id !== addressId);

    if (userAddresses.length === originalLength) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Address not found'
        }
      }, { status: 404 });
    }

    // If deleted address was default, make first one default
    if (addressToDelete?.isDefault && userAddresses.length > 0) {
      userAddresses[0].isDefault = true;
    }

    addresses.set(userId, userAddresses);

    return NextResponse.json({
      success: true,
      data: {
        message: 'Address deleted successfully'
      }
    });

  } catch (error) {
    console.error('Delete address error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
