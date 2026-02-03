"use client";

import { Building2, Users, Target, Award, Heart, Zap, User, Mail } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Your trusted partner in online shopping excellence
          </p>
        </div>

        {/* Company Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start mb-6">
            <Building2 className="w-8 h-8 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded by BYTEWISE CONSULTING LLP, we embarked on a mission to revolutionize the e-commerce 
                experience in India. What started as a vision to provide quality products with exceptional 
                service has grown into a trusted platform serving thousands of satisfied customers.
              </p>
              <p className="text-gray-600 mb-4">
                Based in Bhubaneswar, Odisha, we combine cutting-edge technology with a deep understanding 
                of customer needs to deliver an unparalleled shopping experience. Our commitment to excellence 
                drives everything we do, from product selection to after-sales support.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>BYTEWISE CONSULTING LLP</strong><br />
              GSTIN: 21ABEFB9294N1Z0 | PAN: ABEFB9294N<br />
              B8 116, Kendriya Vihar, Tamando, Bhubaneswar, Odisha 752054
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To make quality products accessible to everyone through seamless online shopping, 
              backed by outstanding customer service and innovative technology solutions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <Zap className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become India's most trusted e-commerce platform, known for reliability, 
              transparency, and creating value for both customers and partners.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <Heart className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Customer First</li>
              <li>• Integrity & Trust</li>
              <li>• Innovation</li>
              <li>• Excellence</li>
              <li>• Sustainability</li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start mb-6">
            <Award className="w-8 h-8 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Authentic Products</h3>
                  <p className="text-gray-600 text-sm">
                    We guarantee 100% genuine products from authorized brands and manufacturers. 
                    Every item is verified before reaching you.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                  <p className="text-gray-600 text-sm">
                    Get the best deals and discounts without compromising on quality. Our price 
                    match guarantee ensures you always get value for money.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Quick and reliable shipping across India. Track your orders in real-time 
                    and get timely updates at every step.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                  <p className="text-gray-600 text-sm">
                    Hassle-free 30-day return policy. Not satisfied? Return it easily with 
                    free pickup and quick refunds.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
                  <p className="text-gray-600 text-sm">
                    Multiple payment options with bank-level security. Your financial 
                    information is always protected.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">
                    Our dedicated customer support team is always ready to help you with 
                    any questions or concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start mb-6">
            <Users className="w-8 h-8 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Leadership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start p-6 bg-gray-50 rounded-lg">
                  <User className="w-12 h-12 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">NABA RATAN PATRA</h3>
                    <p className="text-blue-600 font-medium mb-2">Co-Founder</p>
                    <p className="text-gray-600 text-sm">
                      Visionary leader with expertise in e-commerce strategy and business 
                      development. Committed to building customer-centric solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-6 bg-gray-50 rounded-lg">
                  <User className="w-12 h-12 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">AMAN IRSHAD</h3>
                    <p className="text-blue-600 font-medium mb-2">Co-Founder</p>
                    <p className="text-gray-600 text-sm">
                      Technology enthusiast driving innovation in platform development and 
                      digital transformation initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
          <p className="mb-4">
            We are dedicated to providing you with the best online shopping experience. From the moment 
            you visit our website to the delivery of your order and beyond, we strive for excellence 
            in every interaction.
          </p>
          <p>
            Your satisfaction is our success. We continuously improve our services, expand our product 
            range, and innovate to meet your evolving needs. Thank you for being part of our journey!
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <a
                href="mailto:sales@bytewiseconsulting.in"
                className="text-blue-600 hover:underline"
              >
                sales@bytewiseconsulting.in
              </a>
            </div>
            <div className="text-center">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <a href="tel:8332936831" className="text-blue-600 hover:underline">
                8332936831
              </a>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Visit Website</h3>
              <a
                href="https://www.bytewiseconsulting.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.bytewiseconsulting.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
