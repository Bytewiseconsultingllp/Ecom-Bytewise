"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  AlertCircle,
  Code,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'

interface User {
  userId: string
  name: string
  email: string
  role: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false)
      return
    }

    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      try {
        const res = await fetch('/api/v1/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()

        if (!data.success || data.data.role !== 'admin') {
          router.push('/admin/login')
          return
        }

        setUser(data.data)
      } catch (error) {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, isLoginPage])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/wallet', icon: Wallet, label: 'Wallet' },
    { href: '/admin/errors', icon: AlertCircle, label: 'Error Logs' },
    { href: '/admin/api-docs', icon: Code, label: 'API & SDKs' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  // Show loading only for non-login pages
  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Render login page without admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className="font-bold text-lg">Admin Panel</h1>
        <div className="w-10" />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 bg-white h-full" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h2 className="font-bold text-xl text-blue-600">BYTEWISE Admin</h2>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 w-full"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`hidden lg:block ${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r min-h-screen transition-all duration-300`}>
          <div className="sticky top-0">
            <div className="p-4 border-b flex items-center justify-between">
              {sidebarOpen && <h2 className="font-bold text-xl text-blue-600">BYTEWISE</h2>}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* User Info */}
            {user && sidebarOpen && (
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                  title={item.label}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 w-full transition-colors"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 min-h-screen`}>
          {children}
        </main>
      </div>
    </div>
  )
}
