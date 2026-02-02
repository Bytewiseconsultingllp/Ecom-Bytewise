"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  ChevronDown,
  Zap
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const categories = [
  { name: 'Televisions', href: '/products?category=televisions' },
  { name: 'Laptops', href: '/products?category=laptops' },
  { name: 'Smartphones', href: '/products?category=smartphones' },
  { name: 'Audio', href: '/products?category=audio' },
  { name: 'Gaming', href: '/products?category=gaming' },
  { name: 'Appliances', href: '/products?category=appliances' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cartItems = useCartStore((state) => state.items)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary-900 text-white text-sm py-2">
        <div className="container-custom flex items-center justify-between">
          <p className="hidden sm:block">🚚 Free Delivery on orders above ₹999</p>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <Link href="/track-order" className="hover:text-primary-200 transition-colors">
              Track Order
            </Link>
            <span className="text-primary-400">|</span>
            <Link href="/support" className="hover:text-primary-200 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-xl text-gray-900">BYTEWISE</h1>
              <p className="text-xs text-gray-500 -mt-1">Electronics</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for TVs, Laptops, Phones and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors text-sm font-medium">
                Search
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Heart className="h-5 w-5 text-gray-600" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Account</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Categories Navigation - Desktop */}
      <nav className="hidden md:block border-t border-gray-100 bg-gray-50">
        <div className="container-custom">
          <ul className="flex items-center gap-8 py-3">
            <li>
              <Link
                href="/products"
                className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                All Products
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                href="/deals"
                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                🔥 Hot Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="container-custom py-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-100 font-medium text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="block py-2 px-4 rounded-lg hover:bg-gray-100 text-gray-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="border-t pt-2 mt-2">
                <Link
                  href="/account"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-100 text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-100 text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="block py-2 px-4 rounded-lg hover:bg-red-50 text-red-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🔥 Hot Deals
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
