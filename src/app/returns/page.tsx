"use client";

import { Package, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
          <p className="text-lg text-gray-600">
            Easy returns and hassle-free refunds within the specified period
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Return Policy */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Return Policy
            </h2>

            <div className="space-y-6">
              {/* Return Window */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Return Window</h3>
                  <p className="text-gray-600">
                    You can return most items within 30 days of delivery for a full refund.
                  </p>
                </div>
              </div>

              {/* Eligible Items */}
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Eligible Items</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Unopened and unused products</li>
                    <li>Items in original packaging</li>
                    <li>Products with tags and labels intact</li>
                    <li>Non-personalized merchandise</li>
                  </ul>
                </div>
              </div>

              {/* Non-Eligible Items */}
              <div className="flex items-start">
                <XCircle className="w-6 h-6 text-red-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Non-Eligible Items</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Intimate apparel and swimwear</li>
                    <li>Perishable goods</li>
                    <li>Personalized or custom-made items</li>
                    <li>Digital downloads and software</li>
                    <li>Sale or clearance items marked "Final Sale"</li>
                  </ul>
                </div>
              </div>

              {/* Return Process */}
              <div className="flex items-start">
                <RefreshCw className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">How to Return</h3>
                  <ol className="text-gray-600 list-decimal list-inside space-y-1">
                    <li>Log in to your account and go to Orders</li>
                    <li>Select the item you want to return</li>
                    <li>Choose a return reason</li>
                    <li>Print the prepaid return label</li>
                    <li>Pack the item securely</li>
                    <li>Drop off at any courier location</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Refund Policy
            </h2>

            <div className="space-y-6">
              {/* Refund Timeline */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Refund Timeline</h3>
                  <p className="text-gray-600 mb-2">
                    Once we receive your return, we'll process it within:
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>3-5 business days for inspection</li>
                    <li>5-7 business days for refund processing</li>
                    <li>Additional 3-5 days for bank transfer</li>
                  </ul>
                </div>
              </div>

              {/* Refund Methods */}
              <div className="flex items-start">
                <Package className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Refund Methods</h3>
                  <p className="text-gray-600 mb-2">
                    Refunds will be issued to your original payment method:
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Credit/Debit Card: 7-10 business days</li>
                    <li>UPI/Wallet: 3-5 business days</li>
                    <li>Net Banking: 5-7 business days</li>
                    <li>Store Credit: Instant (optional)</li>
                  </ul>
                </div>
              </div>

              {/* Partial Refunds */}
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Partial Refunds</h3>
                  <p className="text-gray-600 mb-2">
                    Partial refunds may be granted for:
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Items with obvious signs of use</li>
                    <li>Missing accessories or parts</li>
                    <li>Damaged packaging (not during shipping)</li>
                    <li>Items returned after 30 days but within 60 days</li>
                  </ul>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-2">
                  For return-related queries, contact our customer support:
                </p>
                <p className="text-blue-600 text-sm">
                  Email: sales@bytewiseconsulting.in
                  <br />
                  Phone: 8332936831
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Exchange Policy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Size Exchange</h3>
              <p className="text-gray-600 text-sm">
                Exchange for a different size within 30 days. Subject to availability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Color Exchange</h3>
              <p className="text-gray-600 text-sm">
                Exchange for a different color of the same product within 15 days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Defective Items</h3>
              <p className="text-gray-600 text-sm">
                Immediate exchange or refund for defective or damaged items.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
