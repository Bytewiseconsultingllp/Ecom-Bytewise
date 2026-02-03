import { NextRequest, NextResponse } from 'next/server'

const SARA_API_URL = process.env.NEXT_PUBLIC_SARA_API_URL
const SARA_API_KEY = process.env.NEXT_PUBLIC_SARA_API_KEY

// Mock data for testing when SARA API is not available
const MOCK_SARA_PRODUCTS = [
  {
    id: 'sara_prod_001',
    sku: 'SAMG-S24U-512-BLK',
    name: 'Samsung Galaxy S24 Ultra 512GB Black',
    description: 'Premium flagship smartphone with S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor. Features 6.8" Dynamic AMOLED display, 5000mAh battery.',
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
  },
  {
    id: 'sara_prod_002',
    sku: 'IPH-15PM-256-NB',
    name: 'iPhone 15 Pro Max 256GB Natural Titanium',
    description: 'Apple iPhone 15 Pro Max with titanium design, A17 Pro chip, and advanced camera system. Features 6.7" Super Retina XDR display.',
    category: 'smartphones',
    subCategory: 'iphone',
    price: 149900,
    mrp: 159900,
    discount: 6.3,
    stock: 30,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1696446702061-cbd0e0121211?w=800',
        alt: 'iPhone 15 Pro Max',
        isPrimary: true
      }
    ],
    brand: 'Apple',
    specifications: {
      'Display': '6.7" Super Retina XDR',
      'Processor': 'A17 Pro',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Battery': 'Up to 29 hours video playback',
      'OS': 'iOS 17'
    },
    warranty: '1 Year Apple Warranty',
    deliveryInfo: {
      estimatedDays: 2,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_003',
    sku: 'SONY-WH1000XM5-BLK',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation with exceptional sound quality. 30-hour battery life, comfortable design.',
    category: 'audio',
    subCategory: 'headphones',
    price: 26990,
    mrp: 34990,
    discount: 22.9,
    stock: 120,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
        alt: 'Sony WH-1000XM5',
        isPrimary: true
      }
    ],
    brand: 'Sony',
    specifications: {
      'Type': 'Over-ear Wireless',
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Industry-leading ANC',
      'Connectivity': 'Bluetooth 5.2',
      'Driver Size': '30mm',
      'Weight': '250g'
    },
    warranty: '1 Year Sony India Warranty',
    deliveryInfo: {
      estimatedDays: 3,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_004',
    sku: 'MAC-AIR-M3-13-SG-256',
    name: 'MacBook Air M3 13" 256GB Space Grey',
    description: 'Incredibly thin and light laptop powered by Apple M3 chip. Features stunning Liquid Retina display and all-day battery life.',
    category: 'laptops',
    subCategory: 'ultrabooks',
    price: 99990,
    mrp: 114900,
    discount: 13.0,
    stock: 25,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        alt: 'MacBook Air M3',
        isPrimary: true
      }
    ],
    brand: 'Apple',
    specifications: {
      'Display': '13.6" Liquid Retina',
      'Processor': 'Apple M3 chip',
      'RAM': '8GB',
      'Storage': '256GB SSD',
      'Graphics': '8-core GPU',
      'Battery': 'Up to 18 hours',
      'Weight': '1.24 kg'
    },
    warranty: '1 Year Apple Warranty',
    deliveryInfo: {
      estimatedDays: 4,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_005',
    sku: 'LG-65C3-OLED',
    name: 'LG 65" C3 OLED 4K Smart TV',
    description: 'Stunning OLED picture quality with self-lit pixels. Features α9 AI Processor Gen6, Dolby Vision IQ, and webOS smart platform.',
    category: 'televisions',
    subCategory: 'oled',
    price: 129990,
    mrp: 159990,
    discount: 18.8,
    stock: 15,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
        alt: 'LG OLED TV',
        isPrimary: true
      }
    ],
    brand: 'LG',
    specifications: {
      'Screen Size': '65 inches',
      'Resolution': '4K UHD (3840 x 2160)',
      'Panel Type': 'OLED Evo',
      'Refresh Rate': '120Hz',
      'Smart TV': 'webOS 23',
      'HDR': 'Dolby Vision IQ, HDR10, HLG',
      'Audio': '40W 2.2ch'
    },
    warranty: '1 Year Comprehensive + 3 Years on Panel',
    deliveryInfo: {
      estimatedDays: 5,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_006',
    sku: 'SAM-55QN90C',
    name: 'Samsung 55" QN90C Neo QLED 4K Smart TV',
    description: 'Mini LED technology with Quantum Matrix and Neural Quantum Processor. Features ultra-thin design and Tizen OS.',
    category: 'televisions',
    subCategory: 'qled',
    price: 89990,
    mrp: 119990,
    discount: 25.0,
    stock: 20,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
        alt: 'Samsung Neo QLED TV',
        isPrimary: true
      }
    ],
    brand: 'Samsung',
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K UHD',
      'Panel Type': 'Neo QLED',
      'Refresh Rate': '120Hz',
      'Smart TV': 'Tizen OS',
      'HDR': 'Quantum HDR 32x',
      'Audio': '60W OTS+'
    },
    warranty: '1 Year Comprehensive Warranty',
    deliveryInfo: {
      estimatedDays: 4,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_007',
    sku: 'DELL-XPS15-I7',
    name: 'Dell XPS 15 (2024) Intel i7 13th Gen',
    description: 'Premium 15.6" laptop with stunning InfinityEdge display, powerful performance, and elegant design.',
    category: 'laptops',
    subCategory: 'performance',
    price: 149990,
    mrp: 169990,
    discount: 11.8,
    stock: 18,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        alt: 'Dell XPS 15',
        isPrimary: true
      }
    ],
    brand: 'Dell',
    specifications: {
      'Display': '15.6" FHD+ InfinityEdge',
      'Processor': 'Intel Core i7-13700H',
      'RAM': '16GB DDR5',
      'Storage': '512GB SSD',
      'Graphics': 'NVIDIA RTX 4050 6GB',
      'Battery': '86Wh',
      'Weight': '1.86 kg'
    },
    warranty: '1 Year Onsite Warranty',
    deliveryInfo: {
      estimatedDays: 3,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_008',
    sku: 'APP-WATCH-ULTRA2',
    name: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    description: 'Rugged titanium design for extreme sports and adventures. Features precision dual-frequency GPS, dive computer, and Action button.',
    category: 'wearables',
    subCategory: 'smartwatch',
    price: 89900,
    mrp: 89900,
    discount: 0,
    stock: 35,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800',
        alt: 'Apple Watch Ultra 2',
        isPrimary: true
      }
    ],
    brand: 'Apple',
    specifications: {
      'Display': '1.92" Always-On Retina',
      'Case Size': '49mm Titanium',
      'Processor': 'S9 SiP',
      'Connectivity': 'GPS + Cellular',
      'Battery': 'Up to 36 hours',
      'Water Resistance': '100m depth',
      'OS': 'watchOS 10'
    },
    warranty: '1 Year Apple Warranty',
    deliveryInfo: {
      estimatedDays: 3,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_009',
    sku: 'CANON-R6-MKII',
    name: 'Canon EOS R6 Mark II Full Frame Mirrorless Camera',
    description: 'Professional 24.2MP full-frame mirrorless camera with advanced autofocus, 40fps burst shooting, and 6K video.',
    category: 'cameras',
    subCategory: 'mirrorless',
    price: 249990,
    mrp: 279990,
    discount: 10.7,
    stock: 8,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1606980395091-a8c0fc5a32e4?w=800',
        alt: 'Canon EOS R6 Mark II',
        isPrimary: true
      }
    ],
    brand: 'Canon',
    specifications: {
      'Sensor': '24.2MP Full-Frame CMOS',
      'Processor': 'DIGIC X',
      'Autofocus': 'Dual Pixel CMOS AF II',
      'Burst Rate': 'Up to 40fps',
      'Video': '6K RAW, 4K60p',
      'Stabilization': '8-stop IBIS',
      'LCD': '3.2" Vari-angle Touch'
    },
    warranty: '2 Year Canon India Warranty',
    deliveryInfo: {
      estimatedDays: 5,
      freeDelivery: true
    }
  },
  {
    id: 'sara_prod_010',
    sku: 'DYSON-V15-DET',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    description: 'Intelligent cordless vacuum with laser dust detection and scientific proof of deep clean. 60 minutes runtime.',
    category: 'home-appliances',
    subCategory: 'vacuum',
    price: 54900,
    mrp: 64900,
    discount: 15.4,
    stock: 40,
    inStock: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
        alt: 'Dyson V15 Detect',
        isPrimary: true
      }
    ],
    brand: 'Dyson',
    specifications: {
      'Type': 'Cordless Stick Vacuum',
      'Runtime': 'Up to 60 minutes',
      'Suction Power': '230 AW',
      'Filtration': 'Advanced whole-machine',
      'Bin Capacity': '0.76L',
      'Weight': '3.1 kg',
      'Special Feature': 'Laser Dust Detection'
    },
    warranty: '2 Year Warranty',
    deliveryInfo: {
      estimatedDays: 4,
      freeDelivery: true
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    // Check if API is configured
    if (!SARA_API_URL || !SARA_API_KEY) {
      console.log('[SARA API Route] API not configured, using mock data')
      return serveMockData(request)
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    // Build API URL
    const apiUrl = queryString 
      ? `${SARA_API_URL}/products?${queryString}`
      : `${SARA_API_URL}/products`

    console.log('[SARA API Route] Fetching:', apiUrl)

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
      return serveMockData(request)
    }

    // Get response data
    const data = await response.json()

    console.log('[SARA API Route] Response:', {
      status: response.status,
      ok: response.ok,
      hasData: !!data
    })

    // Check if request was successful
    if (!response.ok) {
      console.error('[SARA API Route] Error:', data)
      console.log('[SARA API Route] Falling back to mock data')
      return serveMockData(request)
    }

    // Return successful response
    return NextResponse.json(data)

  } catch (error: any) {
    console.error('[SARA API Route] Exception:', error)
    console.log('[SARA API Route] Using mock data due to error')
    return serveMockData(request)
  }
}

function serveMockData(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Parse query parameters
  const limit = parseInt(searchParams.get('limit') || '50')
  const page = parseInt(searchParams.get('page') || '1')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const brand = searchParams.get('brand')
  
  // Filter products
  let filteredProducts = [...MOCK_SARA_PRODUCTS]
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }
  
  if (brand) {
    filteredProducts = filteredProducts.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    )
  }
  
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower)
    )
  }
  
  // Paginate
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  
  return NextResponse.json({
    success: true,
    data: {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    },
    _mock: true,
    _note: 'Using mock data because SARA API is not accessible'
  })
}
