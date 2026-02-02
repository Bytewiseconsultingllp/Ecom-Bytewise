"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  XCircle,
  Info,
  RefreshCw,
  Filter,
  Clock,
  CheckCircle,
} from "lucide-react";

interface ErrorLog {
  id: string;
  level: "error" | "warning" | "info";
  code: string;
  message: string;
  endpoint: string;
  userId?: string;
  timestamp: string;
  resolved: boolean;
}

export default function AdminErrorsPage() {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async () => {
    setLoading(true);
    try {
      // Simulated error logs
      setErrors([
        {
          id: "err_001",
          level: "error",
          code: "PAYMENT_FAILED",
          message: "Razorpay payment verification failed",
          endpoint: "POST /api/v1/payment/verify",
          userId: "user_abc123",
          timestamp: new Date().toISOString(),
          resolved: false,
        },
        {
          id: "err_002",
          level: "warning",
          code: "RATE_LIMITED",
          message: "API rate limit exceeded for partner",
          endpoint: "GET /api/v1/products",
          userId: "partner_xyz789",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          resolved: true,
        },
        {
          id: "err_003",
          level: "error",
          code: "DATABASE_ERROR",
          message: "MongoDB connection timeout",
          endpoint: "GET /api/v1/orders",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          resolved: true,
        },
        {
          id: "err_004",
          level: "warning",
          code: "VALIDATION_ERROR",
          message: "Invalid phone number format",
          endpoint: "POST /api/v1/auth/register",
          userId: "anonymous",
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          resolved: false,
        },
        {
          id: "err_005",
          level: "info",
          code: "STOCK_LOW",
          message: "Product stock below threshold: prod_abc123",
          endpoint: "System Alert",
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          resolved: false,
        },
        {
          id: "err_006",
          level: "error",
          code: "UNAUTHORIZED",
          message: "Invalid API key used",
          endpoint: "GET /api/v1/partner/products",
          userId: "unknown",
          timestamp: new Date(Date.now() - 18000000).toISOString(),
          resolved: true,
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch errors:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "info":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredErrors = errors.filter((err) => {
    if (filter === "all") return true;
    if (filter === "unresolved") return !err.resolved;
    return err.level === filter;
  });

  const errorCount = errors.filter((e) => e.level === "error" && !e.resolved).length;
  const warningCount = errors.filter((e) => e.level === "warning" && !e.resolved).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Error Logs</h1>
          <p className="text-gray-600">Monitor API errors and system issues</p>
        </div>
        <button
          onClick={fetchErrors}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{errors.length}</p>
              <p className="text-sm text-gray-600">Total Logs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{errorCount}</p>
              <p className="text-sm text-gray-600">Active Errors</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {errors.filter((e) => e.resolved).length}
              </p>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error List */}
      <div className="bg-white rounded-xl border">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-gray-900">Error Log Details</h2>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Logs</option>
              <option value="unresolved">Unresolved Only</option>
              <option value="error">Errors Only</option>
              <option value="warning">Warnings Only</option>
              <option value="info">Info Only</option>
            </select>
          </div>
        </div>

        <div className="divide-y">
          {filteredErrors.map((error) => (
            <div key={error.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getLevelIcon(error.level)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getLevelBadge(
                        error.level
                      )}`}
                    >
                      {error.level}
                    </span>
                    <code className="text-sm text-gray-600 font-mono">
                      {error.code}
                    </code>
                    {error.resolved && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                        Resolved
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 font-medium">{error.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="font-mono">{error.endpoint}</span>
                    {error.userId && <span>User: {error.userId}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(error.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                {!error.resolved && (
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
