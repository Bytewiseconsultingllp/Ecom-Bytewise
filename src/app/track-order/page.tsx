"use client";

import { useState } from "react";
import { Package, Search, CheckCircle, Truck, Home, Clock } from "lucide-react";

interface OrderStatus {
  status: string;
  timestamp: string;
  description: string;
}

interface OrderDetails {
  orderId: string;
  email: string;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  timeline: OrderStatus[];
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/v1/orders/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await response.json();

      if (data.success) {
        setOrderDetails(data.data);
      } else {
        setError(data.message || "Order not found. Please check your Order ID and email.");
        setOrderDetails(null);
      }
    } catch (err) {
      setError("Failed to track order. Please try again later.");
      setOrderDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "processing":
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case "shipped":
      case "in transit":
        return <Truck className="w-6 h-6 text-blue-600" />;
      case "delivered":
        return <Home className="w-6 h-6 text-green-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shipped":
      case "in transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Package className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Track Your Order</h1>
          <p className="text-lg text-primary-100 max-w-xl mx-auto">
            Enter your order details to get real-time tracking information
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">

        {/* Track Order Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover-lift">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., BW-ORD-20260202-ABC123"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5" />
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </form>
          </div>

        {/* Order Details */}
          {orderDetails && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Order {orderDetails.orderId}
                    </h2>
                    <p className="text-gray-500 mt-1">{orderDetails.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(orderDetails.status)}
                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(
                        orderDetails.status
                      )}`}
                    >
                      {orderDetails.status}
                    </span>
                  </div>
                </div>

                {orderDetails.trackingNumber && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Tracking Number:</span>{" "}
                      <span className="font-mono text-primary-700">{orderDetails.trackingNumber}</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-600">{orderDetails.shippingAddress}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-2">Estimated Delivery</h3>
                  <p className="text-gray-600">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <p className="font-semibold text-gray-900">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{orderDetails.total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Timeline</h2>
              <div className="space-y-6">
                {orderDetails.timeline.map((status, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? "bg-blue-600" : "bg-gray-300"
                      }`} />
                      {index < orderDetails.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{status.status}</h3>
                        <span className="text-sm text-gray-500">{status.timestamp}</span>
                      </div>
                      <p className="text-gray-600">{status.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact our support team for any questions about your order
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:sales@bytewiseconsulting.in"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Email Support
                </a>
                <a
                  href="tel:8332936831"
                  className="px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Call: 8332936831
                </a>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
