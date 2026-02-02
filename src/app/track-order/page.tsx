'use client'

import { useState } from 'react'
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin,
  Clock,
  Phone,
  Calendar,
  ChevronRight,
  Box
} from 'lucide-react'

interface TrackingEvent {
  date: string
  time: string
  status: string
  location: string
  description: string
  isCompleted: boolean
  isCurrent: boolean
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  // Mock tracking data
  const mockOrder = {
    orderId: 'BW-123456789',
    status: 'In Transit',
    estimatedDelivery: '25 Jan 2024',
    carrier: 'BlueDart Express',
    trackingNumber: 'AWB123456789IN',
    product: {
      name: 'iPhone 15 Pro Max 256GB - Natural Titanium',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200',
      quantity: 1,
    },
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
    },
    events: [
      {
        date: '25 Jan 2024',
        time: '10:00 AM',
        status: 'Delivery Expected',
        location: 'Mumbai, MH',
        description: 'Your package is out for delivery',
        isCompleted: false,
        isCurrent: true,
      },
      {
        date: '24 Jan 2024',
        time: '8:45 PM',
        status: 'In Transit',
        location: 'Mumbai Hub',
        description: 'Package arrived at local delivery hub',
        isCompleted: true,
        isCurrent: false,
      },
      {
        date: '24 Jan 2024',
        time: '2:30 PM',
        status: 'In Transit',
        location: 'Pune, MH',
        description: 'Package departed from facility',
        isCompleted: true,
        isCurrent: false,
      },
      {
        date: '23 Jan 2024',
        time: '6:15 PM',
        status: 'In Transit',
        location: 'Pune Sorting Center',
        description: 'Package received at sorting facility',
        isCompleted: true,
        isCurrent: false,
      },
      {
        date: '23 Jan 2024',
        time: '11:30 AM',
        status: 'Shipped',
        location: 'Bangalore, KA',
        description: 'Package picked up by courier',
        isCompleted: true,
        isCurrent: false,
      },
      {
        date: '22 Jan 2024',
        time: '3:00 PM',
        status: 'Processing',
        location: 'Bytewise Warehouse',
        description: 'Package is being prepared',
        isCompleted: true,
        isCurrent: false,
      },
      {
        date: '22 Jan 2024',
        time: '10:15 AM',
        status: 'Order Confirmed',
        location: 'Online',
        description: 'Order placed successfully',
        isCompleted: true,
        isCurrent: false,
      },
    ] as TrackingEvent[],
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsTracking(true)
    // Simulate API call
    setTimeout(() => {
      setOrderDetails(mockOrder)
      setIsTracking(false)
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Order Confirmed':
        return <CheckCircle className="h-5 w-5" />
      case 'Processing':
        return <Box className="h-5 w-5" />
      case 'Shipped':
        return <Package className="h-5 w-5" />
      case 'In Transit':
        return <Truck className="h-5 w-5" />
      case 'Delivery Expected':
        return <MapPin className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Package className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
            <p className="text-lg text-white/90 mb-8">
              Enter your order ID or tracking number to see the latest status.
            </p>

            {/* Search Form */}
            <form onSubmit={handleTrack} className="relative">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., BW-123456789) or Tracking Number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-12 pr-32 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                disabled={isTracking || !orderId}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary disabled:opacity-50"
              >
                {isTracking ? 'Tracking...' : 'Track'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Tracking Results */}
        {orderDetails && (
          <div className="max-w-4xl mx-auto">
            {/* Status Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="text-2xl font-bold">{orderDetails.orderId}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                    <Truck className="h-4 w-4" />
                    {orderDetails.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="flex justify-between mb-2">
                  {['Confirmed', 'Processing', 'Shipped', 'In Transit', 'Delivered'].map((step, index) => (
                    <div key={step} className="text-center flex-1">
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        index < 4 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600'
                      }`}>
                        {index < 4 ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs ${index < 4 ? 'text-primary font-medium' : 'text-gray-500'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600 -z-10" />
                <div className="absolute top-4 left-0 h-1 bg-primary -z-10" style={{ width: '75%' }} />
              </div>

              {/* Delivery Info */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Carrier</p>
                    <p className="font-semibold">{orderDetails.carrier}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-semibold">{orderDetails.trackingNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-bold mb-6">Tracking History</h2>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                    {/* Events */}
                    <div className="space-y-6">
                      {orderDetails.events.map((event: TrackingEvent, index: number) => (
                        <div key={index} className="relative flex gap-4">
                          {/* Icon */}
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                            event.isCurrent 
                              ? 'bg-primary text-white' 
                              : event.isCompleted 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                                : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                          }`}>
                            {getStatusIcon(event.status)}
                          </div>

                          {/* Content */}
                          <div className={`flex-1 pb-6 ${index === orderDetails.events.length - 1 ? 'pb-0' : ''}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className={`font-semibold ${event.isCurrent ? 'text-primary' : ''}`}>
                                  {event.status}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </p>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details Sidebar */}
              <div className="space-y-6">
                {/* Product Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-bold mb-4">Product</h2>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={orderDetails.product.image}
                        alt={orderDetails.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{orderDetails.product.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {orderDetails.product.quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                    <p className="text-gray-600 dark:text-gray-300">{orderDetails.shippingAddress.address}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                    </p>
                    <p className="text-gray-500 flex items-center gap-1 mt-2">
                      <Phone className="h-3 w-3" />
                      {orderDetails.shippingAddress.phone}
                    </p>
                  </div>
                </div>

                {/* Help Section */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Have questions about your delivery?
                  </p>
                  <a
                    href="/contact"
                    className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Contact Support
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!orderDetails && !isTracking && (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Track your order</h2>
            <p className="text-gray-500 mb-8">
              Enter your order ID or tracking number above to see the delivery status.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Real-time updates
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Live location
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
