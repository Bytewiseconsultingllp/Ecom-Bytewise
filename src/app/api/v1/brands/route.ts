import { NextRequest, NextResponse } from 'next/server';
import { brands } from '@/lib/db';

// GET /api/v1/brands - List all brands
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        brands: brands.map(b => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          logo: b.logo
        }))
      }
    });
  } catch (error) {
    console.error('Brands list error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching brands'
      }
    }, { status: 500 });
  }
}
