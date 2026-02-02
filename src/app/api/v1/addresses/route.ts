import { NextRequest, NextResponse } from 'next/server';
import { validateSession, addresses, generateId } from '@/lib/db';

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

// GET /api/v1/addresses - Get all addresses
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

    const userAddresses = addresses.get(userId) || [];

    return NextResponse.json({
      success: true,
      data: {
        addresses: userAddresses
      }
    });

  } catch (error) {
    console.error('Get addresses error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}

// POST /api/v1/addresses - Add new address
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
    const { 
      fullName, 
      phone, 
      addressLine1, 
      addressLine2, 
      city, 
      state, 
      pincode, 
      landmark,
      isDefault = false 
    } = body;

    // Validation
    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Required fields are missing'
        }
      }, { status: 400 });
    }

    const userAddresses = addresses.get(userId) || [];

    // If setting as default, remove default from others
    if (isDefault) {
      userAddresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // If first address, make it default
    const makeDefault = isDefault || userAddresses.length === 0;

    const newAddress = {
      id: generateId('addr'),
      userId,
      fullName,
      phone,
      addressLine1,
      addressLine2: addressLine2 || '',
      city,
      state,
      pincode,
      landmark: landmark || '',
      isDefault: makeDefault
    };

    userAddresses.push(newAddress);
    addresses.set(userId, userAddresses);

    return NextResponse.json({
      success: true,
      data: {
        address: newAddress,
        message: 'Address added successfully'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Add address error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
