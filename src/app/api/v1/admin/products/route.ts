import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/v1/admin/products - Get products accessible to admin
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build query - get products created by this admin
    const query: Record<string, unknown> = {
      createdBy: auth.user._id
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products: products.map((p) => ({
          id: p._id?.toString(),
          sku: p.sku,
          name: p.name,
          slug: p.slug,
          price: p.price,
          mrp: p.mrp,
          stock: p.stock,
          inStock: p.inStock,
          categoryId: p.categoryId,
          brandId: p.brandId,
          images: p.images,
          createdAt: p.createdAt,
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage === 'UNAUTHORIZED' || errorMessage === 'FORBIDDEN') {
      return NextResponse.json(
        {
          success: false,
          error: { code: errorMessage, message: 'Admin access required' },
        },
        { status: errorMessage === 'UNAUTHORIZED' ? 401 : 403 }
      );
    }

    console.error('Admin products error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Failed to fetch products' },
      },
      { status: 500 }
    );
  }
}
