import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Truck, 
  HeadphonesIcon,
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import CategoryCard from '@/components/home/CategoryCard'
import TestimonialCard from '@/components/home/TestimonialCard'

// Sample data - In production, this would come from API
const featuredProducts = [
  {
    id: 'prod_001',
    name: 'Samsung 55" Crystal 4K Smart TV',
    price: 42999,
    mrp: 59999,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    rating: 4.5,
    reviews: 1250,
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: 'prod_002',
    name: 'MacBook Air M3 13" Laptop',
    price: 99990,
    mrp: 114900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 4.8,
    reviews: 890,
    badge: 'New',
    inStock: true,
  },
  {
    id: 'prod_003',
    name: 'Sony WH-1000XM5 Headphones',
    price: 26990,
    mrp: 34990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.7,
    reviews: 2100,
    badge: null,
    inStock: true,
  },
  {
    id: 'prod_004',
    name: 'iPhone 15 Pro Max 256GB',
    price: 149900,
    mrp: 159900,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    rating: 4.9,
    reviews: 3200,
    badge: 'Hot',
    inStock: true,
  },
]

const categories = [
  {
    name: 'Televisions',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300',
    count: 250,
    href: '/products?category=televisions',
  },
  {
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
    count: 180,
    href: '/products?category=laptops',
  },
  {
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    count: 320,
    href: '/products?category=smartphones',
  },
  {
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    count: 150,
    href: '/products?category=audio',
  },
  {
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300',
    count: 95,
    href: '/products?category=gaming',
  },
  {
    name: 'Appliances',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
    count: 200,
    href: '/products?category=appliances',
  },
]

const testimonials = [
  {
    name: 'Rahul Sharma',
    avatar: 'RS',
    rating: 5,
    comment: 'Amazing experience! Fast delivery and genuine products. The TV I ordered was perfectly packed and delivered on time.',
    product: 'Samsung 55" Smart TV',
  },
  {
    name: 'Priya Patel',
    avatar: 'PP',
    rating: 5,
    comment: 'Best prices I found anywhere. The customer support team was very helpful in answering all my queries.',
    product: 'MacBook Pro',
  },
  {
    name: 'Amit Kumar',
    avatar: 'AK',
    rating: 4,
    comment: 'Good quality products and hassle-free returns. Will definitely shop again!',
    product: 'Sony Headphones',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/30 to-transparent"></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">New Year Sale - Up to 40% Off!</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Premium Electronics
                <span className="block text-primary-300">at Unbeatable Prices</span>
              </h1>
              
              <p className="text-lg text-primary-100 mb-8 max-w-xl">
                Discover the latest TVs, laptops, smartphones, and more. 
                Shop with confidence with our genuine product guarantee and 
                hassle-free returns.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="btn-primary bg-white text-primary-900 hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/deals"
                  className="btn-outline border-white text-white hover:bg-white hover:text-primary-900 flex items-center justify-center"
                >
                  View Deals
                </Link>
              </div>
              
              <div className="flex items-center gap-8 mt-10 pt-10 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-sm text-primary-200">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1000+</p>
                  <p className="text-sm text-primary-200">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.8★</p>
                  <p className="text-sm text-primary-200">Rating</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600"
                  alt="Featured TV"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Free Delivery</p>
                      <p className="text-sm text-gray-500">Orders above ₹999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-500">On orders ₹999+</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Genuine Products</h3>
                <p className="text-sm text-gray-500">100% authentic</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-500">7-day returns</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-500">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                Shop by Category
              </h2>
              <p className="text-gray-500 mt-1">Find what you're looking for</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-gray-500 mt-1">Handpicked for you</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                New Year Special Offer! 🎉
              </h2>
              <p className="text-primary-100">
                Get up to 40% off on selected electronics. Limited time only!
              </p>
            </div>
            <Link
              href="/deals"
              className="btn bg-white text-primary-700 hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
            >
              Shop Deals <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
              What Our Customers Say
            </h2>
            <p className="text-gray-500">Trusted by thousands of happy customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and tech updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
