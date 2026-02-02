"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  RefreshCw,
  CreditCard,
} from "lucide-react";

interface WalletData {
  balance: number;
  lifetimeEarnings: number;
  lifetimeSpent: number;
}

interface Transaction {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  orderId?: string;
  createdAt: string;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Fetch balance
      const balanceRes = await fetch("/api/v1/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const balanceData = await balanceRes.json();
      if (balanceData.success) {
        setWallet(balanceData.data);
      }

      // Fetch transactions
      const txnRes = await fetch("/api/v1/wallet/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const txnData = await txnRes.json();
      if (txnData.success) {
        setTransactions(txnData.data.transactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setAdding(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/wallet/add-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
      const data = await res.json();
      if (data.success) {
        fetchWalletData();
        setShowAddMoney(false);
        setAmount("");
      }
    } catch (error) {
      console.error("Failed to add money:", error);
    } finally {
      setAdding(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Available Balance</p>
            <p className="text-4xl font-bold mt-1">
              {formatCurrency(wallet?.balance || 0)}
            </p>
          </div>
          <button
            onClick={() => setShowAddMoney(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Money
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-400/30">
          <div>
            <p className="text-blue-100 text-sm">Lifetime Earnings</p>
            <p className="text-xl font-semibold">
              {formatCurrency(wallet?.lifetimeEarnings || 0)}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Lifetime Spent</p>
            <p className="text-xl font-semibold">
              {formatCurrency(wallet?.lifetimeSpent || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Money to Wallet
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {quickAmounts.map((qAmount) => (
                <button
                  key={qAmount}
                  onClick={() => setAmount(qAmount.toString())}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    amount === qAmount.toString()
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  ₹{qAmount}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddMoney}
                disabled={!amount || parseFloat(amount) <= 0 || adding}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {adding ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                Proceed to Pay
              </button>
              <button
                onClick={() => {
                  setShowAddMoney(false);
                  setAmount("");
                }}
                className="px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions */}
      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-900">Transaction History</h2>
        </div>

        {transactions.length === 0 ? (
          <div className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y">
            {transactions.map((txn) => (
              <div
                key={txn._id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {txn.type === "credit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{txn.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    txn.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.type === "credit" ? "+" : "-"}
                  {formatCurrency(txn.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
