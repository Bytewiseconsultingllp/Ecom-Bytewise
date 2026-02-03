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
        <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <ShoppingBag className="h-14 w-14 text-gray-400" />
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything yet</p>
        <Link href="/products" className="btn-primary px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-500 mb-8">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 md:p-6 flex gap-5 shadow-sm hover:shadow-md transition-shadow">
                {/* Product Image */}
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl hover:scale-105 transition-transform"
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
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2.5 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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
            <div className="bg-white rounded-2xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <button className="px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
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

              <div className="flex justify-between py-5 border-b">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-gray-500 mt-4">
                  Add ₹{(999 - subtotal).toLocaleString()} more to get free shipping
                </p>
              )}

              <Link
                href="/checkout"
                className="w-full btn-primary flex items-center justify-center gap-2 mt-6 py-4 text-lg shadow-lg hover:shadow-xl"
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
