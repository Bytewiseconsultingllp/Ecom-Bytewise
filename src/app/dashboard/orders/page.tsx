"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  ChevronRight,
  RefreshCw,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data.orders || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return styles[status.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">
            When you place orders, they will appear here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-200 hover:from-primary-700 hover:to-primary-800 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
                    <p className="font-mono text-sm font-bold text-gray-900">{order.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="p-5">
                {order.items.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-sm text-gray-500 mt-3 font-medium">
                    +{order.items.length - 2} more item(s)
                  </p>
                )}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/orders/${order.orderId}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all text-sm font-semibold shadow-lg shadow-primary-200"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
