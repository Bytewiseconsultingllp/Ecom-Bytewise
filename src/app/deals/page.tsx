'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Clock, 
  Zap, 
  Tag, 
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
  Flame
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

// Mock deal products
const dealProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    originalPrice: 159900,
    discountedPrice: 139900,
    discount: 13,
    rating: 4.8,
    reviews: 1250,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    stock: 15,
    sold: 85,
    dealType: 'lightning',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    originalPrice: 134999,
    discountedPrice: 109999,
    discount: 19,
    rating: 4.7,
    reviews: 890,
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    stock: 8,
    sold: 92,
    dealType: 'lightning',
  },
  {
    id: '3',
    name: 'MacBook Pro 14" M3',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    originalPrice: 199900,
    discountedPrice: 179900,
    discount: 10,
    rating: 4.9,
    reviews: 456,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    stock: 20,
    sold: 60,
    dealType: 'daily',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    originalPrice: 34990,
    discountedPrice: 24990,
    discount: 29,
    rating: 4.8,
    reviews: 2340,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    stock: 25,
    sold: 75,
    dealType: 'lightning',
  },
  {
    id: '5',
    name: 'iPad Pro 12.9" M2',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    originalPrice: 112900,
    discountedPrice: 94900,
    discount: 16,
    rating: 4.9,
    reviews: 678,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    stock: 30,
    sold: 45,
    dealType: 'daily',
  },
  {
    id: '6',
    name: 'Dell XPS 15',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    originalPrice: 189000,
    discountedPrice: 149000,
    discount: 21,
    rating: 4.6,
    reviews: 345,
    endTime: new Date(Date.now() + 10 * 60 * 60 * 1000),
    stock: 12,
    sold: 78,
    dealType: 'lightning',
  },
]

const bannerDeals = [
  {
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 70% OFF on all categories',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800',
    link: '/products?sale=true',
    color: 'from-purple-600 to-blue-600',
  },
  {
    title: 'Brand Week',
    subtitle: 'Extra 20% OFF on Apple, Samsung & More',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800',
    link: '/products?brand=apple',
    color: 'from-orange-500 to-red-600',
  },
]

function formatTime(endTime: Date): string {
  const now = new Date()
  const diff = endTime.getTime() - now.getTime()
  
  if (diff <= 0) return 'Ended'
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const categories = [
    { id: 'all', name: 'All Deals' },
    { id: 'lightning', name: 'Lightning Deals' },
    { id: 'daily', name: 'Daily Deals' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? dealProducts 
    : dealProducts.filter(p => p.dealType === selectedCategory)

  const handleAddToCart = (product: typeof dealProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      sku: product.id,
      price: product.discountedPrice,
      mrp: product.originalPrice,
      image: product.image,
    })
  }

  const toggleWishlist = (product: typeof dealProducts[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
        mrp: product.originalPrice,
        image: product.image,
        inStock: true,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="container">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <Flame className="h-5 w-5" />
              <span className="font-semibold">Hot Deals Today</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mega Sale Event
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Don't miss out on incredible savings! Limited time offers on premium electronics.
            </p>
          </div>
        </div>
      </div>

      {/* Banner Deals */}
      <div className="container py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {bannerDeals.map((banner, index) => (
            <Link
              key={index}
              href={banner.link}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banner.color} p-8 text-white group`}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                <p className="text-white/90 mb-4">{banner.subtitle}</p>
                <span className="inline-flex items-center gap-1 font-semibold group-hover:gap-2 transition-all">
                  Shop Now <ChevronRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Deals Section */}
      <div className="container py-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.id === 'lightning' && <Zap className="h-4 w-4 inline mr-2" />}
              {category.id === 'daily' && <Tag className="h-4 w-4 inline mr-2" />}
              {category.name}
            </button>
          ))}
        </div>

        {/* Deal Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              {/* Deal Badge */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  {product.dealType === 'lightning' && (
                    <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Lightning Deal
                    </span>
                  )}
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                </div>
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Product Image */}
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square relative bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
              </div>

              <div className="p-4">
                {/* Timer */}
                <div className="flex items-center gap-2 text-orange-600 mb-3">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Ends in: {formatTime(product.endTime)}
                  </span>
                </div>

                {/* Product Info */}
                <Link href={`/products/${product.id}`}>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Stock Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{product.stock} left</span>
                    <span className="text-gray-500">{product.sold}% claimed</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      style={{ width: `${product.sold}%` }}
                    />
                  </div>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Tips */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Pro Tips for Best Deals</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock className="h-8 w-8" />,
                title: 'Set Reminders',
                description: 'Lightning deals are limited time offers. Set alerts to never miss out.',
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Act Fast',
                description: 'Popular deals sell out quickly. Add to cart immediately when you find what you want.',
              },
              {
                icon: <Tag className="h-8 w-8" />,
                title: 'Compare Prices',
                description: 'Check original prices and compare discounts across similar products.',
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: 'Save Favorites',
                description: 'Add products to your wishlist to track price drops and deals.',
              },
            ].map((tip, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full text-primary mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
