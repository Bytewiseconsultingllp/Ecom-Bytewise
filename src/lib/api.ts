// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.bytewise.store/v1'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  headers?: Record<string, string>
  token?: string
}

interface ApiError {
  code: string
  message: string
  details?: any
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      const authData = localStorage.getItem('bytewise-auth')
      if (authData) {
        const { state } = JSON.parse(authData)
        return state?.token || null
      }
    } catch {
      return null
    }
    return null
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, token } = options

    const authToken = token || this.getToken()
    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...headers,
    }

    if (authToken) {
      requestHeaders['Authorization'] = `Bearer ${authToken}`
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
    }

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config)
      const data = await response.json()

      if (!response.ok) {
        throw {
          code: data.error?.code || 'API_ERROR',
          message: data.error?.message || 'An error occurred',
          details: data.error?.details,
        } as ApiError
      }

      return data
    } catch (error) {
      if ((error as ApiError).code) {
        throw error
      }
      throw {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to server',
      } as ApiError
    }
  }

  // Auth endpoints
  auth = {
    login: (email: string, password: string) =>
      this.request('/auth/login', { method: 'POST', body: { email, password } }),

    register: (data: { name: string; email: string; phone: string; password: string }) =>
      this.request('/auth/register', { method: 'POST', body: data }),

    logout: () =>
      this.request('/auth/logout', { method: 'POST' }),

    refreshToken: (refreshToken: string) =>
      this.request('/auth/refresh-token', { method: 'POST', body: { refreshToken } }),

    forgotPassword: (email: string) =>
      this.request('/auth/forgot-password', { method: 'POST', body: { email } }),

    resetPassword: (token: string, password: string) =>
      this.request('/auth/reset-password', { method: 'POST', body: { token, password } }),
  }

  // Products endpoints
  products = {
    list: (params?: Record<string, any>) => {
      const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
      return this.request(`/products${queryString}`)
    },

    get: (id: string) =>
      this.request(`/products/${id}`),

    search: (query: string, params?: Record<string, any>) => {
      const searchParams = new URLSearchParams({ q: query, ...params })
      return this.request(`/products/search?${searchParams.toString()}`)
    },

    getReviews: (productId: string, params?: { page?: number; limit?: number }) => {
      const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ''
      return this.request(`/products/${productId}/reviews${queryString}`)
    },

    addReview: (productId: string, data: { rating: number; comment: string }) =>
      this.request(`/products/${productId}/reviews`, { method: 'POST', body: data }),

    checkStock: (productIds: string[], pincode?: string) =>
      this.request('/products/stock-check', { method: 'POST', body: { productIds, pincode } }),
  }

  // Categories endpoints
  categories = {
    list: () => this.request('/categories'),
    get: (id: string) => this.request(`/categories/${id}`),
    getProducts: (categoryId: string, params?: Record<string, any>) => {
      const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
      return this.request(`/categories/${categoryId}/products${queryString}`)
    },
  }

  // Brands endpoints
  brands = {
    list: () => this.request('/brands'),
    get: (id: string) => this.request(`/brands/${id}`),
    getProducts: (brandId: string, params?: Record<string, any>) => {
      const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
      return this.request(`/brands/${brandId}/products${queryString}`)
    },
  }

  // Orders endpoints
  orders = {
    create: (data: any) =>
      this.request('/orders', { method: 'POST', body: data }),

    list: (params?: { page?: number; limit?: number; status?: string }) => {
      const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ''
      return this.request(`/orders${queryString}`)
    },

    get: (orderId: string) =>
      this.request(`/orders/${orderId}`),

    cancel: (orderId: string, reason: string) =>
      this.request(`/orders/${orderId}/cancel`, { method: 'POST', body: { reason } }),

    track: (orderId: string) =>
      this.request(`/orders/${orderId}/tracking`),

    return: (orderId: string, data: { reason: string; items?: string[] }) =>
      this.request(`/orders/${orderId}/return`, { method: 'POST', body: data }),
  }

  // Wallet endpoints
  wallet = {
    getBalance: () =>
      this.request('/wallet/balance'),

    addMoney: (amount: number, paymentMethod: string) =>
      this.request('/wallet/add-money', { method: 'POST', body: { amount, paymentMethod } }),

    getTransactions: (params?: { page?: number; limit?: number; type?: string }) => {
      const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ''
      return this.request(`/wallet/transactions${queryString}`)
    },

    pay: (orderId: string, amount: number) =>
      this.request('/wallet/pay', { method: 'POST', body: { orderId, amount } }),
  }

  // Cart endpoints
  cart = {
    get: () => this.request('/cart'),
    add: (productId: string, quantity: number = 1) =>
      this.request('/cart/add', { method: 'POST', body: { productId, quantity } }),
    update: (itemId: string, quantity: number) =>
      this.request('/cart/update', { method: 'PUT', body: { itemId, quantity } }),
    remove: (itemId: string) =>
      this.request(`/cart/remove/${itemId}`, { method: 'DELETE' }),
    clear: () =>
      this.request('/cart/clear', { method: 'POST' }),
  }

  // Wishlist endpoints
  wishlist = {
    get: () => this.request('/wishlist'),
    add: (productId: string) =>
      this.request('/wishlist/add', { method: 'POST', body: { productId } }),
    remove: (productId: string) =>
      this.request(`/wishlist/remove/${productId}`, { method: 'DELETE' }),
  }

  // Address endpoints
  addresses = {
    list: () => this.request('/addresses'),
    create: (data: any) =>
      this.request('/addresses', { method: 'POST', body: data }),
    update: (addressId: string, data: any) =>
      this.request(`/addresses/${addressId}`, { method: 'PUT', body: data }),
    delete: (addressId: string) =>
      this.request(`/addresses/${addressId}`, { method: 'DELETE' }),
    setDefault: (addressId: string) =>
      this.request(`/addresses/${addressId}/set-default`, { method: 'POST' }),
  }

  // Coupon endpoints
  coupons = {
    validate: (code: string, cartTotal: number) =>
      this.request('/coupons/validate', { method: 'POST', body: { code, cartTotal } }),
  }

  // User endpoints
  user = {
    getProfile: () => this.request('/user/profile'),
    updateProfile: (data: any) =>
      this.request('/user/profile', { method: 'PUT', body: data }),
    changePassword: (currentPassword: string, newPassword: string) =>
      this.request('/user/change-password', { method: 'POST', body: { currentPassword, newPassword } }),
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL)

// Export types
export type { ApiError, RequestOptions }
