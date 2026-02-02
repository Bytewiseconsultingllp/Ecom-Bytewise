import { NextRequest, NextResponse } from 'next/server';
import { products, findProductById, findCategoryById, findBrandById } from '@/lib/db';

// GET /api/v1/products/[productId] - Get product details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    
    const product = findProductById(productId);
    
    if (!product) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }
      }, { status: 404 });
    }

    const category = findCategoryById(product.categoryId);
    const brand = findBrandById(product.brandId);

    // Get related products (same category, different product)
    const relatedProducts = products
      .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4)
      .map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        discount: p.discount,
        image: p.images.find(i => i.isPrimary)?.url || p.images[0]?.url,
        rating: p.rating,
        inStock: p.inStock
      }));

    return NextResponse.json({
      success: true,
      data: {
        id: product.id,
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        category: category ? {
          id: category.id,
          name: category.name,
          slug: category.slug
        } : null,
        brand: brand ? {
          id: brand.id,
          name: brand.name,
          logo: brand.logo
        } : null,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount,
        stock: product.stock,
        inStock: product.inStock,
        images: product.images,
        specifications: product.specifications,
        highlights: product.highlights,
        warranty: product.warranty,
        rating: product.rating,
        badges: product.badges,
        deliveryInfo: {
          estimatedDays: 3,
          freeDelivery: product.price >= 999,
          expressAvailable: true
        },
        relatedProducts,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString()
      }
    });

  } catch (error) {
    console.error('Product detail error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching product details'
      }
    }, { status: 500 });
  }
}
