import { NextRequest, NextResponse } from 'next/server';
import { 
  validateSession, 
  orders, 
  carts, 
  findProductById,
  generateOrderId,
  coupons,
  walletBalances,
  walletTransactions,
  generateId
} from '@/lib/db';
import { Order, OrderStatus } from '@/types';

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

// GET /api/v1/orders - List user orders
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as OrderStatus | null;

    let userOrders = orders.filter(o => o.userId === userId);
    
    if (status) {
      userOrders = userOrders.filter(o => o.status === status);
    }

    // Sort by newest first
    userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = userOrders.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedOrders = userOrders.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      data: {
        orders: paginatedOrders.map(o => ({
          id: o.id,
          status: o.status,
          paymentStatus: o.paymentStatus,
          itemCount: o.items.length,
          summary: o.summary,
          createdAt: o.createdAt,
          items: o.items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            price: item.price
          }))
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Orders list error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}

// POST /api/v1/orders - Create new order
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
      items, 
      shippingAddress, 
      billingAddress, 
      paymentMethod = 'prepaid',
      couponCode,
      notes 
    } = body;

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || 
        !shippingAddress.addressLine1 || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.pincode) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Complete shipping address is required'
        }
      }, { status: 400 });
    }

    // Get items from cart if not provided
    let orderItems = items;
    if (!orderItems || orderItems.length === 0) {
      const cartItems = carts.get(userId) || [];
      if (cartItems.length === 0) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'EMPTY_CART',
            message: 'Cart is empty'
          }
        }, { status: 400 });
      }
      orderItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
    }

    // Validate and build order items
    const validatedItems: any[] = [];
    let subtotal = 0;
    let mrpTotal = 0;

    for (const item of orderItems) {
      const product = findProductById(item.productId);
      if (!product) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'PRODUCT_NOT_FOUND',
            message: `Product ${item.productId} not found`
          }
        }, { status: 400 });
      }

      if (!product.inStock || product.stock < item.quantity) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `${product.name} has insufficient stock`
          }
        }, { status: 400 });
      }

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        productImage: product.images.find(i => i.isPrimary)?.url || product.images[0]?.url,
        quantity: item.quantity,
        price: product.price,
        mrp: product.mrp
      });

      subtotal += product.price * item.quantity;
      mrpTotal += product.mrp * item.quantity;
    }

    // Calculate discount from coupon
    let couponDiscount = 0;
    if (couponCode) {
      const coupon = coupons.find(c => 
        c.code.toUpperCase() === couponCode.toUpperCase() && 
        c.isActive &&
        new Date() >= c.validFrom &&
        new Date() <= c.validTo &&
        subtotal >= c.minOrderValue
      );
      
      if (coupon) {
        if (coupon.type === 'percentage') {
          couponDiscount = Math.min(
            Math.round(subtotal * coupon.value / 100),
            coupon.maxDiscount
          );
        } else {
          couponDiscount = Math.min(coupon.value, coupon.maxDiscount);
        }
      }
    }

    const productDiscount = mrpTotal - subtotal;
    const totalDiscount = productDiscount + couponDiscount;
    const shipping = subtotal >= 999 ? 0 : 49;
    const taxableAmount = subtotal - couponDiscount;
    const tax = Math.round(taxableAmount * 0.18);
    const total = taxableAmount + tax + shipping;

    // Create order
    const orderId = generateOrderId();
    const now = new Date();

    const newOrder: Order = {
      id: orderId,
      userId,
      items: validatedItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod: paymentMethod as 'prepaid' | 'cod' | 'wallet',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      status: 'pending_payment',
      couponCode,
      summary: {
        subtotal,
        discount: totalDiscount,
        tax,
        shipping,
        total
      },
      notes,
      timeline: [
        {
          status: 'order_placed',
          timestamp: now,
          description: 'Order placed successfully'
        }
      ],
      createdAt: now.toISOString() as any,
      updatedAt: now.toISOString() as any
    };

    orders.push(newOrder);

    // Clear cart after order creation
    carts.set(userId, []);

    // For wallet payment, deduct immediately
    if (paymentMethod === 'wallet') {
      const currentBalance = walletBalances.get(userId) || 0;
      if (currentBalance < total) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'INSUFFICIENT_BALANCE',
            message: 'Insufficient wallet balance'
          }
        }, { status: 400 });
      }

      walletBalances.set(userId, currentBalance - total);
      walletTransactions.push({
        id: generateId('txn'),
        walletId: `wallet_${userId}`,
        userId,
        type: 'debit',
        amount: total,
        balance: currentBalance - total,
        description: `Payment for order ${orderId}`,
        referenceId: orderId,
        createdAt: now
      });

      newOrder.paymentStatus = 'paid';
      newOrder.status = 'confirmed';
      newOrder.timeline.push({
        status: 'confirmed',
        timestamp: now,
        description: 'Payment confirmed via wallet'
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        status: newOrder.status,
        paymentStatus: newOrder.paymentStatus,
        items: validatedItems,
        summary: newOrder.summary,
        paymentUrl: paymentMethod === 'prepaid' ? `/api/v1/payment/create?orderId=${orderId}` : null,
        expiresAt: paymentMethod === 'prepaid' 
          ? new Date(now.getTime() + 30 * 60 * 1000).toISOString() 
          : null
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred'
      }
    }, { status: 500 });
  }
}
