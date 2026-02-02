'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Package, 
  CreditCard, 
  Truck, 
  RotateCcw,
  Shield,
  Headphones,
  Gift,
  Wallet,
  MapPin
} from 'lucide-react'

const faqCategories = [
  { id: 'orders', name: 'Orders & Shipping', icon: Package },
  { id: 'payment', name: 'Payment & Pricing', icon: CreditCard },
  { id: 'delivery', name: 'Delivery', icon: Truck },
  { id: 'returns', name: 'Returns & Refunds', icon: RotateCcw },
  { id: 'warranty', name: 'Warranty & Support', icon: Shield },
  { id: 'wallet', name: 'Wallet', icon: Wallet },
]

const faqs = [
  {
    category: 'orders',
    question: 'How do I track my order?',
    answer: 'You can track your order by logging into your account and visiting the "My Orders" section. Click on the specific order to view real-time tracking information. You\'ll also receive email and SMS updates at every stage of delivery.'
  },
  {
    category: 'orders',
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'You can modify or cancel your order within 2 hours of placing it, provided it hasn\'t been shipped. Go to My Orders, select the order, and click "Cancel Order" or "Modify Order". Once shipped, cancellation is not possible, but you can reject delivery or initiate a return.'
  },
  {
    category: 'orders',
    question: 'How do I place a bulk order?',
    answer: 'For bulk orders (10+ units of the same product), please contact our business sales team at business@bytewise.store or call 1800-123-4567. We offer special discounts and dedicated support for bulk purchases.'
  },
  {
    category: 'orders',
    question: 'What happens if my order is out of stock?',
    answer: 'If a product becomes unavailable after order placement, we\'ll notify you immediately via email and SMS. You can choose to wait for restock, select an alternative product, or get a full refund to your original payment method or Bytewise Wallet.'
  },
  {
    category: 'payment',
    question: 'What payment methods are accepted?',
    answer: 'We accept Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), UPI, Net Banking, EMI (0% interest available on select products), Cash on Delivery (for orders under ₹50,000), and Bytewise Wallet. All transactions are secured with 256-bit SSL encryption.'
  },
  {
    category: 'payment',
    question: 'Is Cash on Delivery (COD) available?',
    answer: 'Yes, COD is available for orders up to ₹50,000 in most serviceable locations. Some remote areas may not have COD available. You can check COD availability by entering your pincode on the product page.'
  },
  {
    category: 'payment',
    question: 'How does the EMI option work?',
    answer: 'We offer EMI on Credit Cards (3, 6, 9, 12 months), Debit Cards (select banks), and Bajaj Finserv EMI. 0% interest EMI is available on select products. The EMI option will appear at checkout if your cart value and card are eligible.'
  },
  {
    category: 'payment',
    question: 'My payment failed but money was deducted. What should I do?',
    answer: 'Don\'t worry! Failed transaction amounts are automatically refunded within 5-7 business days. If you don\'t receive the refund within this period, please contact our support with your order ID and transaction reference number.'
  },
  {
    category: 'delivery',
    question: 'What are the delivery charges?',
    answer: 'Delivery is FREE for orders above ₹999. For orders below ₹999, a flat delivery charge of ₹49 applies. Express delivery (within 24 hours in select cities) costs ₹99. Same-day delivery (order before 12 PM) costs ₹149.'
  },
  {
    category: 'delivery',
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days for metro cities and 5-7 days for other areas. Express delivery (available in select cities) delivers within 24 hours. Remote areas may take up to 10 business days.'
  },
  {
    category: 'delivery',
    question: 'Do you deliver to my location?',
    answer: 'We deliver to 25,000+ pin codes across India. Enter your pin code on the product page to check delivery availability and estimated delivery date. If your location is not serviceable, you can request service extension.'
  },
  {
    category: 'delivery',
    question: 'Can I schedule a specific delivery date and time?',
    answer: 'Yes! During checkout, you can select your preferred delivery slot. Time slots are available in 4-hour windows: 9 AM - 1 PM, 1 PM - 5 PM, and 5 PM - 9 PM. Scheduled delivery is available in most metro cities.'
  },
  {
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer a 10-day return policy for most products. Mobile phones, laptops, and electronics have a 7-day replacement policy. Items must be unused, in original packaging, with all accessories and tags intact. Consumables and personalized items are non-returnable.'
  },
  {
    category: 'returns',
    question: 'How do I initiate a return?',
    answer: 'Go to My Orders, select the order, click "Return", choose the reason, and schedule a pickup. Our delivery partner will pick up the item from your doorstep. Make sure the product is in its original packaging with all accessories.'
  },
  {
    category: 'returns',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 3-5 business days of receiving the returned item. Credit/Debit Card refunds take 5-7 days, UPI refunds 2-3 days, and Wallet refunds are instant. You\'ll receive confirmation via email.'
  },
  {
    category: 'returns',
    question: 'Can I exchange a product for a different size/color?',
    answer: 'Yes! During the return process, select "Exchange" instead of "Return". Choose the variant you want, and we\'ll ship it once we receive the original. If the new item costs more, you\'ll need to pay the difference.'
  },
  {
    category: 'warranty',
    question: 'How do I claim warranty for my product?',
    answer: 'For warranty claims, contact the brand\'s authorized service center with your invoice and warranty card. For Bytewise Extended Warranty, raise a request through My Account > Warranty Claims. We\'ll guide you through the process.'
  },
  {
    category: 'warranty',
    question: 'What is Bytewise Extended Warranty?',
    answer: 'Bytewise Extended Warranty extends your product protection beyond manufacturer warranty. It covers mechanical/electrical breakdowns, free repairs, and sometimes accidental damage. Available at checkout for eligible products.'
  },
  {
    category: 'warranty',
    question: 'Does the warranty cover accidental damage?',
    answer: 'Standard manufacturer warranty typically doesn\'t cover accidental damage. However, Bytewise Complete Protection Plan (available separately) covers drops, spills, and accidental damage for up to 2 years.'
  },
  {
    category: 'wallet',
    question: 'How do I add money to Bytewise Wallet?',
    answer: 'Go to My Account > Wallet > Add Money. Enter the amount and pay via UPI, Credit/Debit Card, or Net Banking. Wallet balance has no expiry and can be used for all purchases on Bytewise.'
  },
  {
    category: 'wallet',
    question: 'Can I transfer Wallet balance to my bank account?',
    answer: 'Promotional wallet credits cannot be withdrawn. However, refunds added to your wallet (from order returns/cancellations) can be withdrawn to your linked bank account within 7 business days of request.'
  },
  {
    category: 'wallet',
    question: 'What are Bytewise Coins?',
    answer: 'Bytewise Coins are reward points earned on purchases. 1 Coin = ₹1. Earn coins on every order, during special promotions, and by referring friends. Coins can be used for payment at checkout (up to 10% of order value).'
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('orders')
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-lg text-white/90 mb-8">
              Find answers to common questions about orders, shipping, payments, and more.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Categories</h2>
              <nav className="space-y-2">
                {faqCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* FAQ List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-500">
                    Try searching with different keywords or browse categories.
                  </p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.question)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      {openQuestions.includes(faq.question) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openQuestions.includes(faq.question) && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="text-gray-400">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="btn btn-primary flex items-center gap-2"
              >
                <Headphones className="h-5 w-5" />
                Contact Support
              </a>
              <a
                href="tel:1800-123-4567"
                className="btn bg-white text-gray-900 hover:bg-gray-100"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Quick Links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Package className="h-6 w-6" />,
              title: 'Track Your Order',
              description: 'Check real-time status of your shipment',
              link: '/account/orders',
            },
            {
              icon: <RotateCcw className="h-6 w-6" />,
              title: 'Return a Product',
              description: 'Easy returns within 10 days',
              link: '/account/orders',
            },
            {
              icon: <Gift className="h-6 w-6" />,
              title: 'Gift Cards',
              description: 'Send and redeem gift cards',
              link: '/gift-cards',
            },
            {
              icon: <MapPin className="h-6 w-6" />,
              title: 'Store Locator',
              description: 'Find Bytewise stores near you',
              link: '/stores',
            },
          ].map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {link.icon}
              </div>
              <h3 className="font-semibold mb-1">{link.title}</h3>
              <p className="text-sm text-gray-500">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
