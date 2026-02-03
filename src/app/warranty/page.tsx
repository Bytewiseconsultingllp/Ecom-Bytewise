"use client";

import { Shield, CheckCircle, FileText, Clock, Wrench, AlertTriangle } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty Information</h1>
          <p className="text-lg text-gray-600">
            Comprehensive warranty coverage for your peace of mind
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Warranty Coverage */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Warranty Coverage
            </h2>

            <div className="space-y-6">
              {/* Standard Warranty */}
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Standard Warranty</h3>
                  <p className="text-gray-600">
                    All products come with manufacturer's warranty
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm mt-2">
                    <li>Electronics: 1-2 years</li>
                    <li>Appliances: 1 year</li>
                    <li>Fashion & Accessories: 6 months</li>
                    <li>Home & Furniture: 1 year</li>
                  </ul>
                </div>
              </div>

              {/* What's Covered */}
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">What's Covered</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Manufacturing defects</li>
                    <li>Material defects</li>
                    <li>Workmanship issues</li>
                    <li>Functional failures under normal use</li>
                    <li>Parts replacement</li>
                  </ul>
                </div>
              </div>

              {/* What's Not Covered */}
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">What's Not Covered</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Physical damage or abuse</li>
                    <li>Water or liquid damage</li>
                    <li>Unauthorized repairs or modifications</li>
                    <li>Normal wear and tear</li>
                    <li>Cosmetic damage</li>
                    <li>Accessories and consumables</li>
                  </ul>
                </div>
              </div>

              {/* Extended Warranty */}
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Extended Warranty</h3>
                  <p className="text-gray-600">
                    Purchase extended warranty for additional coverage
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available for select products at checkout
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm mt-2">
                    <li>Extended coverage up to 3 years</li>
                    <li>Accidental damage protection</li>
                    <li>Priority service support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Claims */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Warranty Claims
            </h2>

            <div className="space-y-6">
              {/* How to Claim */}
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">How to File a Claim</h3>
                  <ol className="text-gray-600 list-decimal list-inside space-y-1">
                    <li>Contact customer support</li>
                    <li>Provide order details and issue description</li>
                    <li>Submit photos/videos of the defect</li>
                    <li>Receive authorization number</li>
                    <li>Ship product to service center</li>
                    <li>Receive repair or replacement</li>
                  </ol>
                </div>
              </div>

              {/* Claim Processing Time */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Processing Time</h3>
                  <p className="text-gray-600 mb-2">
                    Typical warranty claim timelines:
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li>Claim review: 1-2 business days</li>
                    <li>Product inspection: 3-5 business days</li>
                    <li>Repair/replacement: 7-10 business days</li>
                    <li>Return shipping: 3-5 business days</li>
                  </ul>
                </div>
              </div>

              {/* Service Centers */}
              <div className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Service Centers</h3>
                  <p className="text-gray-600 mb-2">
                    We have authorized service centers across India
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li>Walk-in service available</li>
                    <li>On-site repair for large items</li>
                    <li>Doorstep pickup available</li>
                    <li>Find nearest center on our website</li>
                  </ul>
                </div>
              </div>

              {/* Required Documents */}
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Required Documents</h3>
                  <p className="text-gray-600 mb-2">
                    Keep these documents for warranty claims:
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li>Original invoice or order confirmation</li>
                    <li>Warranty card (if applicable)</li>
                    <li>Product serial number</li>
                    <li>Photos of defect or damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Terms */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Important Terms & Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Warranty Activation</h3>
              <p className="text-gray-600 text-sm">
                Warranty starts from the date of delivery. Some products may require online registration within 30 days of purchase to activate warranty.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Proof of Purchase</h3>
              <p className="text-gray-600 text-sm">
                Valid proof of purchase is mandatory for all warranty claims. Keep your invoice safe as it contains important warranty information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Replacement Policy</h3>
              <p className="text-gray-600 text-sm">
                If the same defect occurs 3 times during warranty period, we'll replace the product with a new one or offer a full refund.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Non-Transferable</h3>
              <p className="text-gray-600 text-sm">
                Warranty is valid only for the original purchaser and cannot be transferred to another person or party.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Need Warranty Support?
          </h2>
          <p className="text-gray-600 mb-4">
            Our warranty support team is here to help you with any questions or concerns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Email Support</p>
              <p className="text-blue-600 text-sm">sales@bytewiseconsulting.in</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Phone Support</p>
              <p className="text-blue-600 text-sm">8332936831</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Support Hours</p>
              <p className="text-gray-600 text-sm">Mon-Sat: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
