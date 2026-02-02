"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Check
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

// Sample product data - In production, fetch from API
const getProductById = (id: string) => {
  const products: { [key: string]: any } = {
    'prod_001': {
      id: 'prod_001',
      name: 'Samsung 55" Crystal 4K Smart TV',
      price: 42999,
      mrp: 59999,
      images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
        'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800',
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
      ],
      rating: 4.5,
      reviews: 1250,
      inStock: true,
      brand: 'Samsung',
      sku: 'SM-TV-55-CRY-4K',
      category: 'Televisions',
      description: 'Experience stunning 4K resolution with the Samsung Crystal 4K Smart TV. With Dynamic Crystal Color technology, you\'ll enjoy lifelike colors that bring your content to life. The slim design fits perfectly in any room, while smart features let you access your favorite streaming apps with ease.',
      highlights: [
        '55-inch Crystal UHD Display',
        '4K Resolution (3840 x 2160)',
        'HDR Support',
        'Smart TV with Tizen OS',
        'Multiple HDMI & USB ports',
        'Built-in WiFi',
      ],
      specifications: {
        'Screen Size': '55 inches',
        'Display Type': 'Crystal UHD',
        'Resolution': '3840 x 2160 (4K)',
        'Refresh Rate': '60Hz',
        'HDR': 'HDR10+',
        'Smart TV': 'Yes (Tizen OS)',
        'Connectivity': 'Wi-Fi, Bluetooth, HDMI x3, USB x2',
        'Sound': '20W (2.0 channel)',
        'Dimensions': '123.1 x 70.7 x 5.7 cm',
        'Weight': '13.5 kg',
      },
      deliveryInfo: {
        estimatedDays: 3,
        freeDelivery: true,
        installationAvailable: true,
      },
      warranty: '2 Years Manufacturer Warranty',
    },
  }
  
  return products[id] || products['prod_001']
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        image: product.images[0],
        sku: product.sku,
      })
    }
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        image: product.images[0],
        inStock: product.inStock,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/products?category=${product.category.toLowerCase()}`} className="text-gray-500 hover:text-primary-600">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary-600' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              {/* Brand & Title */}
              <p className="text-primary-600 font-medium mb-2">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
                  <span className="font-medium">{product.rating}</span>
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-gray-500">
                  {product.reviews.toLocaleString()} Reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-lg font-medium text-green-600">
                    {discount}% off
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Highlights</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 border rounded-lg transition-colors ${
                    inWishlist 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-100 transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.deliveryInfo.freeDelivery ? 'Free Delivery' : 'Standard Delivery'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Estimated delivery in {product.deliveryInfo.estimatedDays} days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{product.warranty}</p>
                    <p className="text-sm text-gray-500">Brand warranty included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">7-Day Returns</p>
                    <p className="text-sm text-gray-500">Easy returns if product is defective</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl overflow-hidden">
          <div className="border-b">
            <div className="flex">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">{key}</span>
                      <span className="font-medium text-gray-900">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                <div className="text-center py-8">
                  <p className="text-gray-500">Reviews feature coming soon!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
