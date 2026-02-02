import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import User from '@/models/User';
import Order from '@/models/Order';
import Product from '@/models/Product';

// GET /api/v1/admin/dashboard - Get admin dashboard stats
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    // Get statistics
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders,
      usersByRole
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('userId', 'name email'),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ])
    ]);

    const revenue = totalRevenue[0]?.total || 0;
    const roles = usersByRole.reduce((acc: any, item: any) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalOrders,
          totalProducts,
          totalRevenue: revenue,
          adminCount: roles.admin || 0,
          userCount: roles.user || 0
        },
        recentOrders: recentOrders.map((order: any) => ({
          orderId: order.orderId,
          total: order.total,
          status: order.status,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt
        }))
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

    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Admin access required'
        }
      }, { status: 403 });
    }

    console.error('Get dashboard error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching dashboard data'
      }
    }, { status: 500 });
  }
}
