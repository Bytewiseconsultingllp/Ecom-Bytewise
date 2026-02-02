"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Package, 
  ChevronRight,
  Search,
  Filter,
  ChevronDown,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  Eye
} from 'lucide-react'

// Mock orders data
const orders = [
  {
    id: 'BW-ORD-2026012345',
    date: '2026-01-28',
    status: 'delivered',
    total: 47499,
    items: [
      {
        id: 'prod_001',
        name: 'Samsung 55" Crystal 4K Smart TV',
        price: 42999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
      },
    ],
    deliveryDate: '2026-01-31',
  },
  {
    id: 'BW-ORD-2026012890',
    date: '2026-01-25',
    status: 'shipped',
    total: 26990,
    items: [
      {
        id: 'prod_003',
        name: 'Sony WH-1000XM5 Headphones',
        price: 26990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      },
    ],
    trackingId: 'TRK123456789',
    estimatedDelivery: '2026-02-02',
  },
  {
    id: 'BW-ORD-2026011234',
    date: '2026-01-15',
    status: 'processing',
    total: 99990,
    items: [
      {
        id: 'prod_002',
        name: 'MacBook Air M3 13" Laptop',
        price: 99990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
      },
    ],
  },
  {
    id: 'BW-ORD-2026010567',
    date: '2026-01-10',
    status: 'cancelled',
    total: 32999,
    items: [
      {
        id: 'prod_010',
        name: 'Samsung Front Load Washing Machine 7kg',
        price: 32999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
      },
    ],
    cancelReason: 'Customer request',
  },
]

const statusConfig: { [key: string]: { label: string; color: string; icon: any } } = {
  pending: { label: 'Pending', color: 'text-yellow-600 bg-yellow-100', icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-600 bg-blue-100', icon: Package },
  shipped: { label: 'Shipped', color: 'text-purple-600 bg-purple-100', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-green-600 bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-600 bg-red-100', icon: XCircle },
  returned: { label: 'Returned', color: 'text-gray-600 bg-gray-100', icon: RotateCcw },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/account" className="text-gray-500 hover:text-primary-600">Account</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-display font-bold text-gray-900">My Orders</h1>
          
          {/* Search & Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon
              return (
                <div key={order.id} className="bg-white rounded-2xl border overflow-hidden">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 border-b">
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium text-gray-900">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium text-gray-900">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color}`}>
                        <StatusIcon className="h-4 w-4" />
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                          <p className="font-medium text-gray-900 mt-1">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}

                    {/* Delivery Info */}
                    {order.status === 'shipped' && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 text-purple-700">
                          <Truck className="h-5 w-5" />
                          <span className="font-medium">Your order is on the way!</span>
                        </div>
                        <p className="text-sm text-purple-600 mt-1">
                          Tracking ID: {order.trackingId} • Expected by {new Date(order.estimatedDelivery!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    )}

                    {order.status === 'delivered' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Delivered on {new Date(order.deliveryDate!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    )}

                    {order.status === 'cancelled' && (
                      <div className="mt-4 p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 text-red-700">
                          <XCircle className="h-5 w-5" />
                          <span className="font-medium">Order cancelled</span>
                        </div>
                        <p className="text-sm text-red-600 mt-1">Reason: {order.cancelReason}</p>
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3 p-4 border-t">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="btn-ghost flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Link>
                    {order.status === 'delivered' && (
                      <>
                        <button className="btn-ghost flex items-center gap-2">
                          <RotateCcw className="h-4 w-4" />
                          Return
                        </button>
                        <Link href={`/products/${order.items[0].id}`} className="btn-ghost flex items-center gap-2">
                          Buy Again
                        </Link>
                      </>
                    )}
                    {order.status === 'shipped' && (
                      <button className="btn-ghost flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try adjusting your search' : "You haven't placed any orders yet"}
            </p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
