import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight, PartyPopper } from 'lucide-react'

export default function OrderConfirmationPage() {
  const orderId = `BW-${Date.now().toString(36).toUpperCase()}`
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-lg mx-auto text-center px-4">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200 animate-pulse">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-8 text-4xl animate-bounce">🎉</div>
        </div>
        
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Thank you for your order. We'll send you a confirmation email with order details and tracking information.
        </p>

        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Order ID</p>
          <p className="text-2xl font-display font-bold text-primary-600">{orderId}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:border-primary-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Confirmation Email</p>
              <p className="text-sm text-gray-500">Sent to your email</p>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:border-primary-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Estimated Delivery</p>
              <p className="text-sm text-gray-500">3-5 business days</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account/orders" className="btn-outline flex items-center justify-center gap-2 px-6 py-3.5">
            View Order Status
          </Link>
          <Link href="/products" className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 shadow-lg">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
