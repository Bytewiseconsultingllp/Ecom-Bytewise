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
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you like for later</p>
        <Link href="/products" className="btn-primary">
          Explore Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
              My Wishlist
            </h1>
            <p className="text-gray-500 mt-1">{items.length} items saved</p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border">
              <Link href={`/products/${item.id}`} className="block">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                    className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                      item.inStock
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2.5 border rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
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
