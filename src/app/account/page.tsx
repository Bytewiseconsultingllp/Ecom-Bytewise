"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Wallet, 
  Settings, 
  LogOut,
  ChevronRight,
  Edit,
  Camera
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navItems = [
  { label: 'Profile', href: '/account', icon: User },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Wallet', href: '/account/wallet', icon: Wallet },
  { label: 'Settings', href: '/account/settings', icon: Settings },
]

export default function AccountPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuthStore()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  if (!isAuthenticated) {
    router.push('/auth/login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="font-semibold text-gray-900 mt-4">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-display font-bold text-gray-900">My Profile</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Edit className="h-4 w-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form className="space-y-4 max-w-xl">
                  <div>
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-medium text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium text-gray-900">{user?.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Member Since</p>
                      <p className="font-medium text-gray-900">January 2026</p>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/account/orders" className="flex items-center gap-3 p-4 border rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors">
                        <Package className="h-6 w-6 text-primary-600" />
                        <div>
                          <p className="font-medium text-gray-900">My Orders</p>
                          <p className="text-sm text-gray-500">Track your orders</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </Link>
                      <Link href="/account/wallet" className="flex items-center gap-3 p-4 border rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors">
                        <Wallet className="h-6 w-6 text-primary-600" />
                        <div>
                          <p className="font-medium text-gray-900">Wallet</p>
                          <p className="text-sm text-gray-500">Manage balance</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </Link>
                      <Link href="/account/addresses" className="flex items-center gap-3 p-4 border rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors">
                        <MapPin className="h-6 w-6 text-primary-600" />
                        <div>
                          <p className="font-medium text-gray-900">Addresses</p>
                          <p className="text-sm text-gray-500">Manage addresses</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
