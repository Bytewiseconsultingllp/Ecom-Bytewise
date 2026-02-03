"use client";

import { Truck, Package, MapPin, Clock, DollarSign, Globe } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600">
            Fast, reliable, and secure delivery to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Options */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Shipping Options
            </h2>

            <div className="space-y-6">
              {/* Standard Shipping */}
              <div className="flex items-start">
                <Package className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Standard Shipping</h3>
                  <p className="text-gray-600">
                    Delivery within 5-7 business days
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Free on orders above ₹999
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    ₹49 for orders below ₹999
                  </p>
                </div>
              </div>

              {/* Express Shipping */}
              <div className="flex items-start">
                <Truck className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Express Shipping</h3>
                  <p className="text-gray-600">
                    Delivery within 2-3 business days
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available for select locations
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    ₹149 per order
                  </p>
                </div>
              </div>

              {/* Same-Day Delivery */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Same-Day Delivery</h3>
                  <p className="text-gray-600">
                    Order before 12 PM for same-day delivery
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available in metro cities only
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    ₹249 per order
                  </p>
                </div>
              </div>

              {/* International Shipping */}
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-orange-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">International Shipping</h3>
                  <p className="text-gray-600">
                    Delivery within 10-15 business days
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Customs duties and taxes may apply
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    Calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Delivery Information
            </h2>

            <div className="space-y-6">
              {/* Processing Time */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Processing Time</h3>
                  <p className="text-gray-600">
                    Orders are processed within 1-2 business days
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Orders placed on weekends/holidays are processed the next business day
                  </p>
                </div>
              </div>

              {/* Tracking */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Order Tracking</h3>
                  <p className="text-gray-600">
                    Track your order in real-time with our tracking system
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    You'll receive a tracking number via email once your order ships
                  </p>
                </div>
              </div>

              {/* Delivery Areas */}
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Delivery Coverage</h3>
                  <p className="text-gray-600 mb-2">
                    We deliver across India and select international locations
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li>All major cities and metro areas</li>
                    <li>Tier 2 and Tier 3 cities</li>
                    <li>Remote areas (additional 2-3 days)</li>
                    <li>International shipping to 50+ countries</li>
                  </ul>
                </div>
              </div>

              {/* Shipping Partners */}
              <div className="flex items-start">
                <Truck className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Shipping Partners</h3>
                  <p className="text-gray-600 mb-2">
                    We work with trusted courier services:
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li>Blue Dart</li>
                    <li>Delhivery</li>
                    <li>FedEx (International)</li>
                    <li>India Post</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Policies */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Shipping Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Address Accuracy</h3>
              <p className="text-gray-600 text-sm">
                Please ensure your shipping address is correct. We are not responsible for orders delivered to incorrect addresses provided by customers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Attempts</h3>
              <p className="text-gray-600 text-sm">
                Our courier partners make 3 delivery attempts. If unsuccessful, the order will be returned to us and refunded.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Damaged Packages</h3>
              <p className="text-gray-600 text-sm">
                If your package arrives damaged, please refuse delivery and contact us immediately at sales@bytewiseconsulting.in
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Shipping FAQs
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Can I change my shipping address after placing an order?</h3>
              <p className="text-gray-600 text-sm">
                Yes, but only before the order is dispatched. Contact us immediately at 8332936831 or sales@bytewiseconsulting.in
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Do you ship to P.O. Boxes?</h3>
              <p className="text-gray-600 text-sm">
                Currently, we only ship to physical addresses. P.O. Box deliveries are not available.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">What if my order is delayed?</h3>
              <p className="text-gray-600 text-sm">
                While rare, delays may occur due to unforeseen circumstances. Track your order and contact us if it's delayed beyond the estimated delivery date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
