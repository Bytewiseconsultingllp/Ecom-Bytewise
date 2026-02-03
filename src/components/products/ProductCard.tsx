"use client"

import Link from 'next/link'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

interface Product {
  id: string
  name: string
  price: number
  mrp: number
  image: string
  rating: number
  reviews: number
  badge?: string | null
  inStock: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      sku: product.id,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        inStock: product.inStock,
      })
    }
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="card h-full flex flex-col hover-lift">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          
          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
              product.badge === 'Bestseller' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900' :
              product.badge === 'New' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
              product.badge === 'Hot' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' :
              'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-2.5 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {discount}% OFF
            </span>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5 bg-yellow-50 px-2 py-0.5 rounded-md">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews.toLocaleString()})
            </span>
          </div>
          
          {/* Name */}
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full mt-3 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                product.inStock
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
