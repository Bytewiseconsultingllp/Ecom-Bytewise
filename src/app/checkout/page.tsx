"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronRight, 
  CreditCard, 
  Wallet, 
  Truck, 
  Check,
  Lock,
  ShieldCheck
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

type Step = 'address' | 'payment' | 'review'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, getSavings, getTotal, clearCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  
  const [currentStep, setCurrentStep] = useState<Step>('address')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
  })

  const subtotal = getSubtotal()
  const savings = getSavings()
  const shipping = subtotal >= 999 ? 0 : 99
  const total = getTotal()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep === 'address') {
      setCurrentStep('payment')
    } else if (currentStep === 'payment') {
      setCurrentStep('review')
    } else {
      // Place order
      setIsProcessing(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and redirect
      clearCart()
      router.push('/order-confirmation')
    }
  }

  const steps = [
    { id: 'address', label: 'Address', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: ShieldCheck },
  ]

  const stepIndex = steps.findIndex(s => s.id === currentStep)

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/cart" className="text-gray-500 hover:text-primary-600">Cart</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= stepIndex 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < stepIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`text-sm mt-2 ${
                    index <= stepIndex ? 'text-primary-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 md:w-32 h-1 mx-2 rounded ${
                    index < stepIndex ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Address Step */}
              {currentStep === 'address' && (
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Address</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="Street address, apartment, etc."
                        required
                      />
                    </div>
                    <div>
                      <label className="label">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="MH">Maharashtra</option>
                        <option value="DL">Delhi</option>
                        <option value="KA">Karnataka</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="GJ">Gujarat</option>
                        <option value="UP">Uttar Pradesh</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="input"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary mt-6">
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600"
                      />
                      <CreditCard className="h-6 w-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Credit / Debit Card</p>
                        <p className="text-sm text-gray-500">Pay securely with your card</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi' ? 'border-primary-600 bg-primary-50' : 'hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600"
                      />
                      <Wallet className="h-6 w-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">UPI</p>
                        <p className="text-sm text-gray-500">Pay using UPI apps</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600"
                      />
                      <Truck className="h-6 w-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('address')}
                      className="flex-1 btn-secondary"
                    >
                      Back
                    </button>
                    <button type="submit" className="flex-1 btn-primary">
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <div className="space-y-6">
                  {/* Delivery Address */}
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep('address')}
                        className="text-primary-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-600">
                      {formData.fullName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} - {formData.pincode}<br />
                      Phone: {formData.phone}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Payment Method</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep('payment')}
                        className="text-primary-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-600 capitalize">
                      {formData.paymentMethod === 'card' && 'Credit / Debit Card'}
                      {formData.paymentMethod === 'upi' && 'UPI'}
                      {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1 btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-5 w-5" />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">₹{total.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                <Lock className="h-4 w-4" />
                <span>Secure checkout powered by BYTEWISE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
