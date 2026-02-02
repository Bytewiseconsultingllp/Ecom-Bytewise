import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'

export default function OrderConfirmationPage() {
  const orderId = `BW-${Date.now().toString(36).toUpperCase()}`
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="max-w-lg mx-auto text-center px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll send you a confirmation email with order details and tracking information.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">Order ID</p>
          <p className="text-xl font-semibold text-gray-900">{orderId}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Confirmation Email</p>
              <p className="text-sm text-gray-500">Sent to your email</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Estimated Delivery</p>
              <p className="text-sm text-gray-500">3-5 business days</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account/orders" className="btn-outline flex items-center justify-center gap-2">
            View Order Status
          </Link>
          <Link href="/products" className="btn-primary flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
