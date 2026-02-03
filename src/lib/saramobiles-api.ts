/**
 * SaraMobiles Partner API Client
 * 
 * This module provides integration with the SaraMobiles Partner API
 * for fetching products, creating orders, and managing wallet.
 * 
 * API Documentation: https://sarastores.com/api/v1/partner
 * Base URL: https://sarastores.com/api/v1/partner
 * 
 * Authentication: Bearer token (API Key)
 * - Test keys start with: sk_test_ptnr_
 * - Live keys start with: sk_live_ptnr_
 */

// ============================================
// TYPES AND INTERFACES
// ============================================

export interface SaraProduct {
  id: string
  sku: string
  name: string
  description: string
  category: string
  subCategory?: string
  price: number
  mrp: number
  discount: number
  stock: number
  inStock: boolean
  images: string[] | SaraProductImage[]
  brand: string
  specifications?: Record<string, string>
  warranty?: string
  deliveryInfo?: {
    estimatedDays: number
    freeDelivery: boolean
  }
}

export interface SaraProductImage {
  url: string
  alt: string
  isPrimary: boolean
}

export interface SaraProductsResponse {
  success: boolean
  data: {
    products: SaraProduct[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

export interface SaraProductResponse {
  success: boolean
  data: SaraProduct
}

export interface SaraStockCheckResponse {
  success: boolean
  data: {
    products: Array<{
      id: string
      sku: string
      price: number
      mrp: number
      stock: number
      inStock: boolean
    }>
  }
}

export interface SaraCustomer {
  name: string
  email: string
  phone: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
    country?: string
  }
}

export interface SaraOrderItem {
  productId: string
  quantity: number
}

export interface SaraOrderRequest {
  customer: SaraCustomer
  items: SaraOrderItem[]
  paymentMethod: 'prepaid' | 'cod'
  partnerOrderId?: string
  notes?: string
}

export interface SaraOrderItemResponse {
  productId: string
  name: string
  price: number
  quantity: number
  subtotal: number
}

export interface SaraOrderResponse {
  success: boolean
  data: {
    orderId: string
    partnerOrderId?: string
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
    items: SaraOrderItemResponse[]
    summary: {
      subtotal: number
      tax: number
      shipping: number
      total: number
    }
    partnerEarnings: {
      orderValue: number
      commissionRate: number
      commissionAmount: number
      status: 'pending' | 'confirmed' | 'paid'
    }
    estimatedDelivery: string
    tracking?: {
      trackingNumber: string
      carrier: string
      url: string
    }
  }
}

// Razorpay Integration Types
export interface SaraRazorpayOrderRequest {
  customer: SaraCustomer
  items: SaraOrderItem[]
  partnerOrderId?: string
  notes?: string
}

export interface SaraRazorpayOrderResponse {
  success: boolean
  data: {
    razorpayOrderId: string
    orderId: string
    amount: number
    currency: string
    key: string // Razorpay public key to use
  }
}

export interface SaraRazorpayVerifyRequest {
  orderId: string
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface SaraRazorpayVerifyResponse {
  success: boolean
  data: {
    orderId: string
    status: string
    paymentId: string
    paymentMethod: string
    paidAt: string
  }
}

// Wallet Types
export interface SaraWalletBalance {
  success: boolean
  data: {
    walletId: string
    balance: {
      available: number
      pending: number
      held: number
      total: number
    }
    currency: string
    stats: {
      lifetimeEarnings: number
      lifetimeWithdrawals: number
      thisMonthEarnings: number
    }
  }
}

export interface SaraWalletTransaction {
  id: string
  type: 'credit' | 'debit' | 'hold' | 'release'
  amount: number
  balance: number
  description: string
  orderId?: string
  createdAt: string
}

export interface SaraWalletTransactionsResponse {
  success: boolean
  data: {
    transactions: SaraWalletTransaction[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

// Error Types
export interface SaraApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string>
  }
  meta?: {
    requestId: string
    timestamp: string
  }
}

// ============================================
// API CLIENT CONFIGURATION
// ============================================

// Environment variables are inlined at build time by Next.js
// We read them directly here to ensure they're available
const SARA_API_BASE_URL = process.env.NEXT_PUBLIC_SARA_API_URL || ''
const SARA_API_KEY = process.env.NEXT_PUBLIC_SARA_API_KEY || ''

// Debug log on load
if (typeof window !== 'undefined') {
  console.log('[SaraMobiles API] Initialized with:', {
    baseUrl: SARA_API_BASE_URL || '(not set)',
    hasApiKey: !!SARA_API_KEY,
    apiKeyPrefix: SARA_API_KEY ? SARA_API_KEY.substring(0, 20) + '...' : '(not set)'
  })
}

// ============================================
// API CLIENT CLASS
// ============================================

class SaraMobilesAPI {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = SARA_API_BASE_URL
    this.apiKey = SARA_API_KEY
  }

  /**
   * Get current configuration (for debugging)
   */
  getConfig() {
    return {
      baseUrl: this.baseUrl || '(not configured)',
      hasApiKey: !!this.apiKey,
      apiKeyPrefix: this.apiKey ? this.apiKey.substring(0, 20) + '...' : '(not set)'
    }
  }

  /**
   * Set API key (useful for runtime configuration)
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Set API URL (useful for runtime configuration)
   */
  setApiUrl(url: string) {
    this.baseUrl = url
  }

  /**
   * Internal request helper - now routes through our API to avoid CORS/security issues
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // For browser requests, use our API proxy
    // For server-side requests, use direct API
    const isServer = typeof window === 'undefined'
    
    let url: string
    let headers: HeadersInit
    
    if (isServer) {
      // Server-side: direct API call
      url = `${this.baseUrl}${endpoint}`
      headers = {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        ...options.headers,
      }
    } else {
      // Client-side: use our API proxy
      // endpoint comes as "/products" or "/products/123", we map to our proxy route
      // Our proxy is at /api/v1/sara-products which handles /products endpoints
      let proxyEndpoint = endpoint
      if (endpoint.startsWith('/products')) {
        // Remove /products prefix since our proxy route already handles products
        proxyEndpoint = endpoint.replace('/products', '')
      }
      url = `/api/v1/sara-products${proxyEndpoint}`
      headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    }
    
    // Debug logging
    console.log('[SaraMobiles API] Request:', { 
      url, 
      method: options.method || 'GET',
      isServer,
      hasApiKey: !!this.apiKey 
    })

    const response = await fetch(url, {
      ...options,
      headers,
    })

    const data = await response.json()

    console.log('[SaraMobiles API] Response:', { 
      status: response.status,
      success: data.success,
      hasData: !!data.data
    })

    if (!response.ok || !data.success) {
      const error = data as SaraApiError
      console.error('[SaraMobiles API] Error:', error)
      throw new Error(error.error?.message || 'API request failed')
    }

    return data as T
  }

  // ============================================
  // PRODUCTS API
  // ============================================

  /**
   * Get list of products with optional filters
   */
  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    inStock?: boolean
    brand?: string
  }): Promise<SaraProductsResponse> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      if (params.page) queryParams.set('page', params.page.toString())
      if (params.limit) queryParams.set('limit', params.limit.toString())
      if (params.category) queryParams.set('category', params.category)
      if (params.search) queryParams.set('search', params.search)
      if (params.inStock !== undefined) queryParams.set('inStock', params.inStock.toString())
      if (params.brand) queryParams.set('brand', params.brand)
    }

    const query = queryParams.toString()
    const endpoint = query ? `/products?${query}` : '/products'
    
    return this.request<SaraProductsResponse>(endpoint)
  }

  /**
   * Get single product details by ID
   */
  async getProduct(productId: string): Promise<SaraProductResponse> {
    return this.request<SaraProductResponse>(`/products/${productId}`)
  }

  /**
   * Bulk stock check for multiple products
   */
  async checkStock(productIds: string[]): Promise<SaraStockCheckResponse> {
    return this.request<SaraStockCheckResponse>('/products/stock-check', {
      method: 'POST',
      body: JSON.stringify({ productIds }),
    })
  }

  // ============================================
  // ORDERS API (Wallet Mode)
  // ============================================

  /**
   * Create a new order (Wallet Mode - requires wallet balance)
   * Use this when you've collected payment from customer
   */
  async createOrder(order: SaraOrderRequest): Promise<SaraOrderResponse> {
    return this.request<SaraOrderResponse>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    })
  }

  /**
   * Get order details by ID
   */
  async getOrder(orderId: string): Promise<SaraOrderResponse> {
    return this.request<SaraOrderResponse>(`/orders/${orderId}`)
  }

  /**
   * Get list of orders with filters
   */
  async getOrders(params?: {
    page?: number
    limit?: number
    status?: string
    fromDate?: string
    toDate?: string
  }): Promise<{ success: boolean; data: { orders: SaraOrderResponse['data'][] } }> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      if (params.page) queryParams.set('page', params.page.toString())
      if (params.limit) queryParams.set('limit', params.limit.toString())
      if (params.status) queryParams.set('status', params.status)
      if (params.fromDate) queryParams.set('fromDate', params.fromDate)
      if (params.toDate) queryParams.set('toDate', params.toDate)
    }

    const query = queryParams.toString()
    const endpoint = query ? `/orders?${query}` : '/orders'
    
    return this.request(endpoint)
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string, reason: string, notes?: string): Promise<SaraOrderResponse> {
    return this.request<SaraOrderResponse>(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason, notes }),
    })
  }

  // ============================================
  // RAZORPAY INTEGRATION (Direct Payment Mode)
  // ============================================

  /**
   * Create order with Razorpay payment (step 1)
   * Returns Razorpay order details for payment modal
   * NOTE: This requires domain whitelisting
   */
  async createRazorpayOrder(order: SaraRazorpayOrderRequest): Promise<SaraRazorpayOrderResponse> {
    return this.request<SaraRazorpayOrderResponse>('/orders/razorpay/create', {
      method: 'POST',
      body: JSON.stringify(order),
    })
  }

  /**
   * Verify Razorpay payment (step 2)
   * Call this after successful payment in Razorpay modal
   */
  async verifyRazorpayPayment(data: SaraRazorpayVerifyRequest): Promise<SaraRazorpayVerifyResponse> {
    return this.request<SaraRazorpayVerifyResponse>('/orders/razorpay/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // ============================================
  // WALLET API
  // ============================================

  /**
   * Get wallet balance and stats
   */
  async getWalletBalance(): Promise<SaraWalletBalance> {
    return this.request<SaraWalletBalance>('/wallet/balance')
  }

  /**
   * Get wallet transaction history
   */
  async getWalletTransactions(params?: {
    page?: number
    limit?: number
    type?: 'credit' | 'debit' | 'hold' | 'release'
  }): Promise<SaraWalletTransactionsResponse> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      if (params.page) queryParams.set('page', params.page.toString())
      if (params.limit) queryParams.set('limit', params.limit.toString())
      if (params.type) queryParams.set('type', params.type)
    }

    const query = queryParams.toString()
    const endpoint = query ? `/wallet/transactions?${query}` : '/wallet/transactions'
    
    return this.request(endpoint)
  }

  /**
   * Request payout to bank account
   */
  async requestPayout(amount: number, bankAccountId: string, notes?: string): Promise<{
    success: boolean
    data: {
      payoutId: string
      amount: number
      status: string
      estimatedArrival: string
    }
  }> {
    return this.request('/wallet/payout', {
      method: 'POST',
      body: JSON.stringify({ amount, bankAccountId, notes }),
    })
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

export const saraMobilesAPI = new SaraMobilesAPI()

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert SaraMobiles product to local product format
 */
export function convertSaraProductToLocal(product: SaraProduct): {
  id: string
  name: string
  price: number
  mrp: number
  image: string
  images: string[]
  rating: number
  reviews: number
  badge: string | null
  inStock: boolean
  category: string
  brand: string
  description: string
  specifications: Record<string, string>
} {
  // Get primary image
  let primaryImage = ''
  const allImages: string[] = []
  
  if (Array.isArray(product.images)) {
    product.images.forEach((img) => {
      if (typeof img === 'string') {
        allImages.push(img)
        if (!primaryImage) primaryImage = img
      } else {
        allImages.push(img.url)
        if (img.isPrimary || !primaryImage) primaryImage = img.url
      }
    })
  }

  // Determine badge based on discount
  let badge: string | null = null
  if (product.discount >= 30) badge = 'Hot Deal'
  else if (product.discount >= 20) badge = 'Bestseller'
  else if (product.stock < 10 && product.inStock) badge = 'Limited Stock'

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    mrp: product.mrp,
    image: primaryImage || '/placeholder-product.jpg',
    images: allImages.length > 0 ? allImages : ['/placeholder-product.jpg'],
    rating: 4.5, // Default rating if not provided
    reviews: 0, // Default reviews if not provided
    badge,
    inStock: product.inStock,
    category: product.category,
    brand: product.brand,
    description: product.description,
    specifications: product.specifications || {},
  }
}

/**
 * Build order request from cart and customer data
 */
export function buildSaraOrderRequest(
  customer: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  },
  items: Array<{ productId: string; quantity: number }>,
  paymentMethod: 'prepaid' | 'cod',
  partnerOrderId?: string
): SaraOrderRequest {
  return {
    customer: {
      name: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: {
        line1: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        country: 'India',
      },
    },
    items: items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    paymentMethod,
    partnerOrderId,
  }
}

// ============================================
// EXPORTS
// ============================================

export default saraMobilesAPI
