import { NextRequest, NextResponse } from 'next/server';
import { products, categories, brands, findCategoryById, findBrandById } from '@/lib/db';

// GET /api/v1/products - List products with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search');
    const inStock = searchParams.get('inStock');

    // Filter products
    let filteredProducts = [...products];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category) {
      const cat = categories.find(c => c.slug === category || c.id === category);
      if (cat) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === cat.id);
      }
    }

    // Brand filter
    if (brand) {
      const br = brands.find(b => b.slug === brand || b.id === brand);
      if (br) {
        filteredProducts = filteredProducts.filter(p => p.brandId === br.id);
      }
    }

    // Price filter
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    // Stock filter
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.inStock && p.stock > 0);
    }

    // Sort products
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.rating.count - a.rating.count);
        break;
    }

    // Pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

    // Transform products for response
    const responseProducts = paginatedProducts.map(p => {
      const cat = findCategoryById(p.categoryId);
      const br = findBrandById(p.brandId);
      
      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        category: cat ? {
          id: cat.id,
          name: cat.name,
          slug: cat.slug
        } : null,
        brand: br ? {
          id: br.id,
          name: br.name,
          logo: br.logo
        } : null,
        price: p.price,
        mrp: p.mrp,
        discount: p.discount,
        stock: p.stock,
        inStock: p.inStock,
        images: p.images,
        rating: p.rating,
        badges: p.badges,
        createdAt: p.createdAt.toISOString()
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        products: responseProducts,
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
    console.error('Products list error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching products'
      }
    }, { status: 500 });
  }
}
