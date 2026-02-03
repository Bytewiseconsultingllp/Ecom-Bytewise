"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Globe, Building2, User, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">We're here to help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Get in touch with us for any queries, support, or feedback
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover-lift">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Company Information
              </h2>

              <div className="space-y-6">
                {/* Company Name */}
                <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group">
                  <Building2 className="w-6 h-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Company</h3>
                    <p className="text-gray-600 font-medium">BYTEWISE CONSULTING LLP</p>
                    <p className="text-sm text-gray-500 mt-1">
                      GSTIN: 21ABEFB9294N1Z0
                    </p>
                    <p className="text-sm text-gray-500">PAN: ABEFB9294N</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors group">
                  <Phone className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a
                      href="tel:8332936831"
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                    >
                      8332936831
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a
                      href="mailto:sales@bytewiseconsulting.in"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      sales@bytewiseconsulting.in
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                  <MapPin className="w-6 h-6 text-orange-600 mt-1 mr-4 flex-shrink-0" />
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
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm mt-2 font-medium"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                  <Globe className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Website</h3>
                    <a
                      href="https://www.bytewiseconsulting.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      www.bytewiseconsulting.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Co-Founders */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Co-Founders
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-primary-50 to-transparent">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-4">
                    <span className="text-white font-bold">NP</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      NABA RATAN PATRA
                    </p>
                    <p className="text-sm text-primary-600">Co-Founder</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-primary-50 to-transparent">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-4">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">AMAN IRSHAD</p>
                    <p className="text-sm text-primary-600">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Our Location
              </h2>
              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0123456789!2d85.8123456!3d20.2345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE0JzA0LjQiTiA4NcKwNDgnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/jeX3BgGWjxUpjiyq7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
