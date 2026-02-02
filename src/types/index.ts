// Product Types
export interface Product {
  id: string
  sku: string
  name: string
  slug?: string
  description?: string
  shortDescription?: string
  category: string
  subCategory?: string
  brand: string
  price: number
  mrp: number
  discount?: number
  stock: number
  inStock: boolean
  images: ProductImage[]
  rating?: number
  reviews?: number
  specifications?: Record<string, string>
  highlights?: string[]
  warranty?: string
  deliveryInfo?: DeliveryInfo
  badges?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface ProductImage {
  url: string
  alt?: string
  isPrimary?: boolean
}

export interface DeliveryInfo {
  estimatedDays: number
  freeDelivery: boolean
  installationAvailable?: boolean
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string | null
  productCount?: number
}

// Brand Types
export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: string
  paymentStatus: PaymentStatus
  summary: OrderSummary
  trackingInfo?: TrackingInfo
  notes?: string
  createdAt: string
  updatedAt: string
  deliveredAt?: string
  cancelledAt?: string
}

export interface OrderItem {
  productId: string
  name: string
  sku: string
  price: number
  quantity: number
  image: string
  subtotal: number
}

export interface OrderSummary {
  subtotal: number
  discount: number
  tax: number
  shipping: number
  total: number
}

export interface TrackingInfo {
  trackingNumber: string
  carrier: string
  estimatedDelivery: string
  currentStatus: string
  timeline: TrackingEvent[]
}

export interface TrackingEvent {
  status: string
  timestamp: string
  description: string
  location?: string
}

export type OrderStatus =
  | 'pending_payment'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'

// User Types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  addresses?: Address[]
  createdAt?: string
}

export interface Address {
  id?: string
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  country?: string
  landmark?: string
  isDefault?: boolean
  type?: 'home' | 'work' | 'other'
}

// Wallet Types
export interface Wallet {
  id: string
  userId: string
  balance: WalletBalance
  currency: string
  transactions?: WalletTransaction[]
}

export interface WalletBalance {
  available: number
  pending: number
  held: number
  total: number
}

export interface WalletTransaction {
  id: string
  type: 'credit' | 'debit' | 'hold' | 'release'
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed'
  reference?: string
  createdAt: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  name: string
  sku: string
  price: number
  mrp: number
  quantity: number
  image: string
  addedAt?: Date
}

// Wishlist Types
export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  mrp: number
  image: string
  inStock: boolean
  addedAt: string
}

// Review Types
export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title?: string
  comment: string
  images?: string[]
  isVerifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
}

// Coupon Types
export interface Coupon {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue?: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit?: number
  usedCount: number
  isActive: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ResponseMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface ResponseMeta {
  requestId: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: Pagination
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Filter & Sort Types
export interface ProductFilters {
  category?: string
  brand?: string[]
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  rating?: number
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest'
  | 'popularity'

// Razorpay Types
export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  created_at: number
}

export interface PaymentVerification {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

// Extended User type for authentication
export interface AuthUser extends User {
  password?: string
}

// Session type
export interface Session {
  userId: string
  expiresAt: Date
}
