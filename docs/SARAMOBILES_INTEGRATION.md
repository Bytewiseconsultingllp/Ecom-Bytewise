# SaraMobiles Partner API Integration Guide

## Overview

This document describes the integration of the Ecom-Bytewise application with the SaraMobiles Partner API. The integration enables:

1. **Product Fetching** - Display products from SaraMobiles catalog
2. **Order Creation** - Create orders via SaraMobiles API when customers checkout
3. **Razorpay Payment** - Use SaraMobiles Razorpay integration for payments (not custom Razorpay)
4. **Wallet Mode** - Support for partner wallet-based ordering

---

## Table of Contents

- [Architecture](#architecture)
- [Files Modified](#files-modified)
- [Configuration](#configuration)
- [API Service](#api-service)
- [Product Integration](#product-integration)
- [Order & Payment Integration](#order--payment-integration)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Ecom-Bytewise Frontend                       │
├─────────────────────────────────────────────────────────────────┤
│  Products Page   │   Product Detail   │   Checkout Page        │
│    (Listing)     │      (Single)      │   (Payment Flow)       │
└────────┬─────────┴────────┬───────────┴──────────┬─────────────┘
         │                  │                       │
         ▼                  ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              SaraMobiles API Client (saramobiles-api.ts)        │
│  • getProducts()     • getProduct()      • createRazorpayOrder()│
│  • checkStock()      • createOrder()     • verifyRazorpayPayment│
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               SaraMobiles Partner API                           │
│        Base URL: https://sarastores.com/api/v1/partner          │
├─────────────────────────────────────────────────────────────────┤
│  /products           /orders              /wallet               │
│  /products/{id}      /orders/razorpay     /wallet/balance       │
│  /products/stock     /orders/{id}/cancel  /wallet/transactions  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Files Modified

### New Files Created

| File | Purpose |
|------|---------|
| `src/lib/saramobiles-api.ts` | Complete API client for SaraMobiles Partner API |
| `docs/SARAMOBILES_INTEGRATION.md` | This documentation file |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/products/page.tsx` | Added API integration for product listing with fallback |
| `src/app/products/[id]/page.tsx` | Added API integration for product details with fallback |
| `src/app/checkout/page.tsx` | Integrated SaraMobiles Razorpay payment flow |

---

## Configuration

### Environment Variables

Add the following to your `.env.local` or environment configuration:

```bash
# SaraMobiles Partner API Configuration
NEXT_PUBLIC_SARA_API_URL=https://sarastores.com/api/v1/partner
NEXT_PUBLIC_SARA_API_KEY=sk_test_ptnr_your_partner_id_your_key

# For server-side only (more secure)
SARA_API_KEY=sk_live_ptnr_your_partner_id_your_key
```

### API Key Format

- **Test Keys**: `sk_test_ptnr_{partner_id}_{random_string}`
- **Live Keys**: `sk_live_ptnr_{partner_id}_{random_string}`

> ⚠️ **Security**: Never expose live API keys in client-side code. Use test keys for development.

---

## API Service

### Location: `src/lib/saramobiles-api.ts`

The API service provides a complete client for interacting with the SaraMobiles Partner API.

### Products API

```typescript
import saraMobilesAPI from '@/lib/saramobiles-api'

// Get all products
const products = await saraMobilesAPI.getProducts({
  page: 1,
  limit: 20,
  category: 'televisions',
  search: 'samsung',
  brand: 'Samsung',
  inStock: true
})

// Get single product
const product = await saraMobilesAPI.getProduct('prod_abc123')

// Bulk stock check
const stockInfo = await saraMobilesAPI.checkStock(['prod_abc123', 'prod_def456'])
```

### Orders API (Wallet Mode)

```typescript
// Create order with wallet balance
const order = await saraMobilesAPI.createOrder({
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+919876543210',
    address: {
      line1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    }
  },
  items: [
    { productId: 'prod_abc123', quantity: 1 }
  ],
  paymentMethod: 'prepaid', // or 'cod'
  partnerOrderId: 'BW-12345'
})
```

### Razorpay Integration

```typescript
// Step 1: Create Razorpay order
const razorpayOrder = await saraMobilesAPI.createRazorpayOrder({
  customer: { /* customer details */ },
  items: [{ productId: 'prod_abc123', quantity: 1 }]
})

// Step 2: Open Razorpay modal with returned data
const { razorpayOrderId, orderId, amount, key } = razorpayOrder.data

// Step 3: After payment, verify
const verification = await saraMobilesAPI.verifyRazorpayPayment({
  orderId,
  razorpay_payment_id: 'pay_xxx',
  razorpay_order_id: razorpayOrderId,
  razorpay_signature: 'signature'
})
```

### Wallet API

```typescript
// Get wallet balance
const balance = await saraMobilesAPI.getWalletBalance()

// Get transactions
const transactions = await saraMobilesAPI.getWalletTransactions({
  page: 1,
  limit: 20,
  type: 'credit'
})

// Request payout
const payout = await saraMobilesAPI.requestPayout(100000, 'bank_acc_123', 'Monthly payout')
```

---

## Product Integration

### Products Listing Page (`/products`)

The products page fetches from SaraMobiles API with graceful fallback:

```typescript
// Fetch products on mount and when filters change
const fetchProducts = useCallback(async () => {
  setApiState(prev => ({ ...prev, loading: true }))
  
  try {
    const response = await saraMobilesAPI.getProducts({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      search: searchQuery || undefined,
      brand: selectedBrand !== 'All Brands' ? selectedBrand : undefined,
      limit: 50,
      inStock: true,
    })

    if (response.success && response.data.products.length > 0) {
      const localProducts = response.data.products.map(convertSaraProductToLocal)
      setApiState({
        products: localProducts,
        loading: false,
        usingFallback: false,
        // ...
      })
    }
  } catch (error) {
    // Use fallback products when API unavailable
    setApiState({
      products: fallbackProducts,
      usingFallback: true,
      // ...
    })
  }
}, [selectedCategory, searchQuery, selectedBrand])
```

### Product Detail Page (`/products/[id]`)

Single product fetching with fallback:

```typescript
const fetchProduct = async () => {
  try {
    const response = await saraMobilesAPI.getProduct(productId)
    
    if (response.success) {
      const detailedProduct = convertToDetailedProduct(response.data)
      setProductState({
        product: detailedProduct,
        usingFallback: false,
        // ...
      })
    }
  } catch (error) {
    // Fallback to local data
    setProductState({
      product: getFallbackProduct(productId),
      usingFallback: true,
      // ...
    })
  }
}
```

---

## Order & Payment Integration

### Checkout Flow

The checkout page supports two payment modes:

#### 1. Razorpay Integration (Card/UPI)

When customer selects Card or UPI:

```typescript
const processRazorpayOrder = async () => {
  // Step 1: Create order with SaraMobiles
  const razorpayResponse = await saraMobilesAPI.createRazorpayOrder({
    customer: { /* form data */ },
    items: items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }))
  })

  // Step 2: Open Razorpay modal
  const options = {
    key: razorpayResponse.data.key,
    amount: razorpayResponse.data.amount * 100,
    order_id: razorpayResponse.data.razorpayOrderId,
    handler: async function(response) {
      // Step 3: Verify payment
      await saraMobilesAPI.verifyRazorpayPayment({
        orderId: razorpayResponse.data.orderId,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      })
    }
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}
```

#### 2. Cash on Delivery (COD)

```typescript
const processCODOrder = async () => {
  const orderRequest = buildSaraOrderRequest(
    formData,
    items.map(item => ({ productId: item.id, quantity: item.quantity })),
    'cod',
    `BW-${Date.now()}`
  )

  const response = await saraMobilesAPI.createOrder(orderRequest)
  return response.success
}
```

### Payment Flow Diagram

```
Customer Checkout
       │
       ▼
┌──────────────────┐
│ Select Payment   │
│   Method         │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌──────────────┐
│  COD  │  │ Card/UPI     │
└───┬───┘  └──────┬───────┘
    │             │
    ▼             ▼
┌────────────┐  ┌────────────────────┐
│ Create     │  │ Create Razorpay    │
│ COD Order  │  │ Order              │
└─────┬──────┘  └─────────┬──────────┘
      │                   │
      │                   ▼
      │         ┌─────────────────────┐
      │         │ Open Razorpay Modal │
      │         └─────────┬───────────┘
      │                   │
      │                   ▼
      │         ┌─────────────────────┐
      │         │ Customer Pays       │
      │         └─────────┬───────────┘
      │                   │
      │                   ▼
      │         ┌─────────────────────┐
      │         │ Verify Payment      │
      │         └─────────┬───────────┘
      │                   │
      └─────────┬─────────┘
                │
                ▼
       ┌────────────────┐
       │ Order Success  │
       │ Confirmation   │
       └────────────────┘
```

---

## Error Handling

### API Errors

All API errors follow this format:

```typescript
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid request parameters',
    details: { field: 'email', issue: 'Invalid format' }
  }
}
```

### Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `INVALID_API_KEY` | API key is invalid or revoked | Check your API key |
| `RATE_LIMITED` | Too many requests | Wait and retry |
| `PRODUCT_NOT_FOUND` | Product doesn't exist | Verify product ID |
| `INSUFFICIENT_STOCK` | Not enough inventory | Reduce quantity |
| `INSUFFICIENT_BALANCE` | Wallet balance too low | Wait for earnings |
| `ORDER_NOT_CANCELLABLE` | Order already shipped | Contact support |

### Fallback Strategy

The application gracefully falls back to demo data when the API is unavailable:

1. **Products**: Shows fallback sample products
2. **Checkout**: Simulates order processing locally
3. **UI Indicator**: Shows "Demo Mode" badge when using fallback

---

## Testing

### Test Mode

Use test API keys (`sk_test_ptnr_...`) for development:

- No real payments processed
- Test order lifecycle simulation
- Full API access with sandbox data
- Same rate limits as production

### Testing Checkout Flow

1. Add products to cart
2. Proceed to checkout
3. Fill in address details
4. Select payment method
5. For Card/UPI: Razorpay test modal opens
6. Use Razorpay test card numbers
7. Order confirmation displayed

### Razorpay Test Cards

| Card Number | Description |
|-------------|-------------|
| 4111 1111 1111 1111 | Successful payment |
| 5555 5555 5555 5599 | 3D Secure authentication |

---

## Rate Limits

| Tier | Requests/Min | Requests/Day | Commission |
|------|--------------|--------------|------------|
| Starter | 60 | 1,000 | 15% |
| Growth | 300 | 10,000 | 12% |
| Professional | 1,000 | 100,000 | 10% |
| Enterprise | 5,000 | 1,000,000 | Custom |

---

## Future Improvements

### Recommended Enhancements

1. **Stock Sync Caching**
   - Implement Redis/memory caching for product data
   - Sync stock levels periodically (every 5 minutes)
   - Show real-time stock warnings

2. **Webhook Integration**
   - Set up webhook endpoint for order status updates
   - Handle delivery notifications
   - Process refund notifications

3. **Order Tracking**
   - Display tracking information from SaraMobiles
   - Show delivery estimates
   - Send tracking notifications

4. **Admin Dashboard Integration**
   - Partner wallet balance display
   - Commission tracking
   - Payout requests

5. **Error Recovery**
   - Implement retry logic for failed API calls
   - Queue failed orders for retry
   - Admin notification for persistent failures

6. **Performance Optimization**
   - Server-side rendering for product pages
   - ISR (Incremental Static Regeneration) for product catalog
   - Edge caching for API responses

### Code Improvements

```typescript
// TODO: Add caching layer
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// TODO: Add retry logic
const retryRequest = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
}

// TODO: Add webhook handler
// app/api/webhooks/saramobiles/route.ts
export async function POST(request: Request) {
  const payload = await request.json()
  // Verify webhook signature
  // Handle order status updates
}
```

---

## Contact & Support

- **SaraMobiles Partner Support**: support@sarastores.com
- **API Documentation**: https://sarastores.com/partner/docs
- **Status Page**: https://status.sarastores.com

---

## Changelog

### v1.0.0 (Initial Integration)

- ✅ Created SaraMobiles API client
- ✅ Integrated products listing with API
- ✅ Integrated product details with API
- ✅ Added Razorpay payment integration
- ✅ Added COD order support
- ✅ Implemented fallback for API unavailability
- ✅ Added comprehensive documentation

---

*Last updated: February 2025*
