import { NextRequest, NextResponse } from 'next/server'

const SARA_API_URL = process.env.NEXT_PUBLIC_SARA_API_URL
const SARA_API_KEY = process.env.NEXT_PUBLIC_SARA_API_KEY

// Import mock products from the list endpoint (we'll keep data in sync)
// For now, duplicating here for simplicity
const MOCK_SARA_PRODUCT = {
  id: 'sara_prod_001',
  sku: 'SAMG-S24U-512-BLK',
  name: 'Samsung Galaxy S24 Ultra 512GB Black',
  description: 'Premium flagship smartphone with S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor. Features 6.8" Dynamic AMOLED display, 5000mAh battery with advanced cooling system.',
  category: 'smartphones',
  subCategory: 'android',
  price: 124999,
  mrp: 139999,
  discount: 10.7,
  stock: 45,
  inStock: true,
  images: [
    {
      url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
      alt: 'Samsung Galaxy S24 Ultra Front',
      isPrimary: true
    },
    {
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
      alt: 'Samsung Galaxy S24 Ultra Side',
      isPrimary: false
    }
  ],
  brand: 'Samsung',
  specifications: {
    'Display': '6.8" Dynamic AMOLED 2X, 120Hz',
    'Processor': 'Snapdragon 8 Gen 3',
    'RAM': '12GB',
    'Storage': '512GB',
    'Camera': '200MP + 12MP + 10MP + 10MP',
    'Battery': '5000mAh',
    'OS': 'Android 14'
  },
  warranty: '1 Year Manufacturer Warranty',
  deliveryInfo: {
    estimatedDays: 3,
    freeDelivery: true
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    // Check if API is configured
    if (!SARA_API_URL || !SARA_API_KEY) {
      console.log('[SARA API Route] API not configured, using mock data')
      return serveMockProduct(params.productId)
    }

    const { productId } = params

    // Build API URL
    const apiUrl = `${SARA_API_URL}/products/${productId}`

    console.log('[SARA API Route] Fetching product:', apiUrl)

    // Make request to SARA API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SARA_API_KEY}`,
        'User-Agent': 'Bytewise-Ecommerce/1.0',
      },
      cache: 'no-store', // Disable caching for real-time data
    })

    // Check if we got HTML (security checkpoint)
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('text/html')) {
      console.warn('[SARA API Route] Received HTML instead of JSON, using mock data')
      return serveMockProduct(productId)
    }

    // Get response data
    const data = await response.json()

    console.log('[SARA API Route] Product Response:', {
      status: response.status,
      ok: response.ok,
      hasData: !!data
    })

    // Check if request was successful
    if (!response.ok) {
      console.error('[SARA API Route] Error:', data)
      console.log('[SARA API Route] Falling back to mock data')
      return serveMockProduct(productId)
    }

    // Return successful response
    return NextResponse.json(data)

  } catch (error: any) {
    console.error('[SARA API Route] Exception:', error)
    console.log('[SARA API Route] Using mock data due to error')
    return serveMockProduct(params.productId)
  }
}

function serveMockProduct(productId: string) {
  // Return a mock product with the requested ID
  const product = { ...MOCK_SARA_PRODUCT, id: productId }
  
  return NextResponse.json({
    success: true,
    data: product,
    _mock: true,
    _note: 'Using mock data because SARA API is not accessible'
  })
}
