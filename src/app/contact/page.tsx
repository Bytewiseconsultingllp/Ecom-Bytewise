"use client";

import { Mail, Phone, MapPin, Globe, Building2, User } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any queries or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Company Information
            </h2>

            <div className="space-y-6">
              {/* Company Name */}
              <div className="flex items-start">
                <Building2 className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Company</h3>
                  <p className="text-gray-600">BYTEWISE CONSULTING LLP</p>
                  <p className="text-sm text-gray-500 mt-1">
                    GSTIN: 21ABEFB9294N1Z0
                  </p>
                  <p className="text-sm text-gray-500">PAN: ABEFB9294N</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a
                    href="tel:8332936831"
                    className="text-blue-600 hover:underline"
                  >
                    8332936831
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:sales@bytewiseconsulting.in"
                    className="text-blue-600 hover:underline"
                  >
                    sales@bytewiseconsulting.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    B8 116, Kendriya Vihar, Tamando
                    <br />
                    Bhubaneswar, Patasahanipur
                    <br />
                    Odisha 752054
                  </p>
                  <a
                    href="https://maps.app.goo.gl/jeX3BgGWjxUpjiyq7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Website</h3>
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

          {/* Co-Founders & Map */}
          <div className="space-y-8">
            {/* Co-Founders */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Co-Founders
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      NABA RATAN PATRA
                    </p>
                    <p className="text-sm text-gray-500">Co-Founder</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">AMAN IRSHAD</p>
                    <p className="text-sm text-gray-500">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Location
              </h2>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0123456789!2d85.8123456!3d20.2345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE0JzA0LjQiTiA4NcKwNDgnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/jeX3BgGWjxUpjiyq7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
