"use client"

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getSavings, getTotal, clearCart } = useCartStore()
  
  const subtotal = getSubtotal()
  const savings = getSavings()
  const shipping = subtotal >= 999 ? 0 : 99
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
        <Link href="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 md:p-6 flex gap-4">
                {/* Product Image */}
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.mrp.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total - Desktop */}
                <div className="hidden md:block text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  {item.mrp > item.price && (
                    <p className="text-sm text-green-600">
                      Save ₹{((item.mrp - item.price) * item.quantity).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-medium">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4 border-b">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">₹{total.toLocaleString()}</span>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-gray-500 mt-4">
                  Add ₹{(999 - subtotal).toLocaleString()} more to get free shipping
                </p>
              )}

              <Link
                href="/checkout"
                className="w-full btn-primary flex items-center justify-center gap-2 mt-6"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/products"
                className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
