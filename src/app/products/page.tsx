"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, SlidersHorizontal, Grid3X3, List, ChevronDown, X } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'

// Sample products data
const allProducts = [
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
    category: 'televisions',
    brand: 'Samsung',
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
    category: 'laptops',
    brand: 'Apple',
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
    category: 'audio',
    brand: 'Sony',
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
    category: 'smartphones',
    brand: 'Apple',
  },
  {
    id: 'prod_005',
    name: 'LG 65" OLED 4K Smart TV',
    price: 129990,
    mrp: 159990,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    rating: 4.8,
    reviews: 650,
    badge: 'Premium',
    inStock: true,
    category: 'televisions',
    brand: 'LG',
  },
  {
    id: 'prod_006',
    name: 'Dell XPS 15 Laptop',
    price: 149990,
    mrp: 169990,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    rating: 4.6,
    reviews: 420,
    badge: null,
    inStock: true,
    category: 'laptops',
    brand: 'Dell',
  },
  {
    id: 'prod_007',
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    mrp: 134999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    rating: 4.7,
    reviews: 1800,
    badge: 'New',
    inStock: true,
    category: 'smartphones',
    brand: 'Samsung',
  },
  {
    id: 'prod_008',
    name: 'PlayStation 5 Console',
    price: 49990,
    mrp: 54990,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400',
    rating: 4.9,
    reviews: 5600,
    badge: 'Bestseller',
    inStock: true,
    category: 'gaming',
    brand: 'Sony',
  },
  {
    id: 'prod_009',
    name: 'Bose QuietComfort 45',
    price: 24990,
    mrp: 32990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.6,
    reviews: 980,
    badge: null,
    inStock: true,
    category: 'audio',
    brand: 'Bose',
  },
  {
    id: 'prod_010',
    name: 'Samsung Front Load Washing Machine 7kg',
    price: 32999,
    mrp: 39999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.4,
    reviews: 340,
    badge: null,
    inStock: true,
    category: 'appliances',
    brand: 'Samsung',
  },
  {
    id: 'prod_011',
    name: 'HP Pavilion Gaming Laptop',
    price: 74990,
    mrp: 89990,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    rating: 4.5,
    reviews: 720,
    badge: null,
    inStock: true,
    category: 'laptops',
    brand: 'HP',
  },
  {
    id: 'prod_012',
    name: 'Xbox Series X',
    price: 49990,
    mrp: 52990,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400',
    rating: 4.8,
    reviews: 2300,
    badge: null,
    inStock: true,
    category: 'gaming',
    brand: 'Microsoft',
  },
]

const categories = ['all', 'televisions', 'laptops', 'smartphones', 'audio', 'gaming', 'appliances']
const brands = ['All Brands', 'Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Bose', 'Microsoft']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹25,000', min: 0, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
  { label: 'Above ₹1,00,000', min: 100000, max: Infinity },
]
const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all')
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  // Filter products
  let filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const brandMatch = selectedBrand === 'All Brands' || product.brand === selectedBrand
    const priceMatch = 
      product.price >= priceRanges[selectedPriceRange].min && 
      product.price <= priceRanges[selectedPriceRange].max
    return categoryMatch && brandMatch && priceMatch
  })

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedBrand('All Brands')
    setSelectedPriceRange(0)
    setSortBy('relevance')
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'All Brands' || selectedPriceRange !== 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            {selectedCategory === 'all' 
              ? 'All Products' 
              : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h1>
          <p className="text-gray-500 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-600 capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === index}
                        onChange={() => setSelectedPriceRange(index)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedBrand !== 'All Brands' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand('All Brands')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {priceRanges[selectedPriceRange].label}
                    <button onClick={() => setSelectedPriceRange(0)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 md:gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category-mobile"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-600 capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand-mobile"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={selectedPriceRange === index}
                      onChange={() => setSelectedPriceRange(index)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-600">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 btn-secondary"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container-custom py-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
              Loading Products...
            </h1>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
