import { NextRequest, NextResponse } from 'next/server';
import { categories } from '@/lib/db';

// GET /api/v1/categories - List all categories
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        categories: categories.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          image: c.image,
          productCount: c.productCount
        }))
      }
    });
  } catch (error) {
    console.error('Categories list error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching categories'
      }
    }, { status: 500 });
  }
}
