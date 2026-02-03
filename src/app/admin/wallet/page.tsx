"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Download,
  Filter,
} from "lucide-react";

interface WalletStats {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  pendingPayouts: number;
}

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  orderId?: string;
  createdAt: string;
}

export default function AdminWalletPage() {
  const [stats, setStats] = useState<WalletStats>({
    totalBalance: 0,
    totalCredits: 0,
    totalDebits: 0,
    pendingPayouts: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // This partner uses Razorpay integration, not wallet mode
  // Wallet functionality is disabled

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (filter === "all") return true;
    return txn.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Integration</h1>
          <p className="text-gray-600">Razorpay payment gateway configuration</p>
        </div>
      </div>

      {/* Razorpay Integration Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Razorpay Integration Active</h2>
            <p className="text-gray-700 mb-4">
              This partner account uses <strong>Razorpay Payment Gateway</strong> for processing payments directly.
              Wallet mode is not applicable for this configuration.
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Configuration</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">Razorpay Gateway</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Integration Type:</span>
                  <span className="font-medium text-gray-900">Direct Payment</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium text-gray-900">Prepaid & COD</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>Customers pay directly through Razorpay on checkout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>Orders are automatically created in SaraMobiles API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>Partner earns commission on confirmed orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>No wallet balance management required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Environment Variables */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Razorpay Configuration</h2>
          <p className="text-sm text-gray-600 mt-1">Your Razorpay API keys from environment variables</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Key ID (Public):</span>
              <span className="text-gray-900 font-semibold">{process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'Not configured'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Key Secret:</span>
              <span className="text-gray-900 font-semibold">••••••••••••••••</span>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Configure your Razorpay keys in the <code className="bg-yellow-100 px-2 py-0.5 rounded">.env</code> file.
              Get your keys from <a href="https://dashboard.razorpay.com/app/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Razorpay Dashboard</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Flow Documentation */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Payment Flow</h2>
          <p className="text-sm text-gray-600 mt-1">How payments are processed with Razorpay</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Customer Checkout</h3>
                <p className="text-sm text-gray-600 mt-1">Customer selects products and proceeds to checkout</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">Razorpay Payment</h3>
                <p className="text-sm text-gray-600 mt-1">Razorpay payment gateway opens, customer pays securely</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">Order Creation</h3>
                <p className="text-sm text-gray-600 mt-1">Order is created in SaraMobiles API with payment confirmation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-gray-900">Commission Earned</h3>
                <p className="text-sm text-gray-600 mt-1">Partner commission is calculated and tracked by SaraMobiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
