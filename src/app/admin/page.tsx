"use client"

import { useEffect, useState } from 'react'
import {
  Package,
  ShoppingCart,
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalProducts: number
  totalRevenue: number
  adminCount: number
  userCount: number
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
  inStock: boolean
}

interface Order {
  orderId: string
  total: number
  status: string
  paymentStatus: string
  createdAt: string
}

interface WalletData {
  balance: number
  pending: number
  lifetimeEarnings: number
  transactions: any[]
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [errors, setErrors] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) return

      try {
        // Fetch Dashboard Stats
        const dashboardRes = await fetch('/api/v1/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const dashboardData = await dashboardRes.json()
        if (dashboardData.success) {
          setStats(dashboardData.data.stats)
          setOrders(dashboardData.data.recentOrders || [])
        }

        // Fetch Products
        const productsRes = await fetch('/api/v1/products?limit=10')
        const productsData = await productsRes.json()
        if (productsData.success) {
          setProducts(productsData.data.products || [])
        }

        // Set mock wallet data
        setWallet({
          balance: 125000,
          pending: 45000,
          lifetimeEarnings: 2500000,
          transactions: []
        })

        // Set mock errors
        setErrors([
          { id: 1, type: 'API_ERROR', message: 'Rate limit exceeded', endpoint: '/api/v1/products', timestamp: new Date().toISOString() },
          { id: 2, type: 'PAYMENT_FAILED', message: 'Razorpay timeout', endpoint: '/api/v1/payment/verify', timestamp: new Date(Date.now() - 3600000).toISOString() },
        ])

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl h-32"></div>
            ))}
          </div>
          <div className="bg-white rounded-xl h-96"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of your store performance</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats?.totalRevenue || 0)}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.5% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +8.2% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <Users className="h-3 w-3 mr-1" /> {stats?.adminCount || 0} admins, {stats?.userCount || 0} users
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalProducts || 0}</p>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <Package className="h-3 w-3 mr-1" /> Active in catalog
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Products & Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Table */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Products</h2>
            <a href="/admin/products" className="text-sm text-blue-600 hover:underline flex items-center">
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-[200px] truncate">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm text-blue-600 hover:underline flex items-center">
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="divide-y">
            {orders.length > 0 ? orders.slice(0, 5).map((order) => (
              <div key={order.orderId} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.orderId}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-gray-500">No orders yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Wallet & Errors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet Overview */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Wallet Overview</h2>
            <a href="/admin/wallet" className="text-sm text-blue-600 hover:underline flex items-center">
              Manage <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Wallet className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Available</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(wallet?.balance || 0)}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-lg font-bold text-yellow-600">{formatCurrency(wallet?.pending || 0)}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Lifetime</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(wallet?.lifetimeEarnings || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Logs */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Errors</h2>
            <a href="/admin/errors" className="text-sm text-blue-600 hover:underline flex items-center">
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="divide-y">
            {errors.map((error) => (
              <div key={error.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{error.type}</p>
                    <p className="text-sm text-gray-500 truncate">{error.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{error.endpoint}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(error.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Response Data Section */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-900">API Response Data</h2>
          <p className="text-sm text-gray-500">Raw API responses for debugging</p>
        </div>
        <div className="p-4 space-y-4">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-medium text-gray-900">Dashboard Stats Response</span>
              <span className="text-sm text-gray-500">Click to expand</span>
            </summary>
            <pre className="mt-2 p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify({ success: true, data: { stats, recentOrders: orders } }, null, 2)}
            </pre>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-medium text-gray-900">Products Response</span>
              <span className="text-sm text-gray-500">Click to expand</span>
            </summary>
            <pre className="mt-2 p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify({ success: true, data: { products: products.slice(0, 3) } }, null, 2)}
            </pre>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-medium text-gray-900">Wallet Response</span>
              <span className="text-sm text-gray-500">Click to expand</span>
            </summary>
            <pre className="mt-2 p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify({ success: true, data: wallet }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  )
}
