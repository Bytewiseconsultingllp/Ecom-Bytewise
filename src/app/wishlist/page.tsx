"use client"

import Link from 'next/link'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      mrp: item.mrp,
      image: item.image,
      sku: item.id,
    })
    removeItem(item.id)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <div className="w-28 h-28 bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Heart className="h-14 w-14 text-red-400" />
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 text-lg">Save items you like for later</p>
        <Link href="/products" className="btn-primary px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
          Explore Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              My Wishlist
            </h1>
            <p className="text-gray-500 mt-2">{items.length} items saved</p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow">
              <Link href={`/products/${item.id}`} className="block">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.mrp > item.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.mrp.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                      item.inStock
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 border-2 border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
