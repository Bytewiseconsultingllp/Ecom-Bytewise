"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Building
} from 'lucide-react'

// Mock wallet data
const walletData = {
  balance: {
    available: 12500,
    pending: 3500,
    held: 0,
    total: 16000,
  },
  transactions: [
    {
      id: 'txn_001',
      type: 'credit',
      amount: 5000,
      description: 'Order refund - BW-ORD-2026012345',
      date: '2026-01-28',
      status: 'completed',
    },
    {
      id: 'txn_002',
      type: 'debit',
      amount: 2500,
      description: 'Wallet payment - Order BW-ORD-2026012890',
      date: '2026-01-25',
      status: 'completed',
    },
    {
      id: 'txn_003',
      type: 'credit',
      amount: 10000,
      description: 'Added money via UPI',
      date: '2026-01-20',
      status: 'completed',
    },
    {
      id: 'txn_004',
      type: 'credit',
      amount: 3500,
      description: 'Cashback - New Year Sale',
      date: '2026-01-15',
      status: 'pending',
    },
  ],
}

export default function WalletPage() {
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [addAmount, setAddAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'debit'>('all')

  const filteredTransactions = walletData.transactions.filter((txn) => {
    if (activeTab === 'all') return true
    return txn.type === activeTab
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/account" className="text-gray-500 hover:text-primary-600">Account</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Wallet</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wallet Balance */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-primary-100 text-sm">Total Balance</p>
                  <p className="text-2xl font-bold">₹{walletData.balance.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-primary-200 text-sm">Available</p>
                  <p className="font-semibold">₹{walletData.balance.available.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-primary-200 text-sm">Pending</p>
                  <p className="font-semibold">₹{walletData.balance.pending.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowAddMoney(true)}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Money</span>
              </button>
              <Link
                href="/account/wallet/withdraw"
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Withdraw</span>
              </Link>
            </div>

            {/* Add Money Modal/Section */}
            {showAddMoney && (
              <div className="mt-4 bg-white rounded-xl p-6 border">
                <h3 className="font-semibold text-gray-900 mb-4">Add Money to Wallet</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        className="input pl-8"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[500, 1000, 2000, 5000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setAddAmount(amount.toString())}
                        className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-50"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddMoney(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 btn-primary">
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
                <div className="flex border rounded-lg overflow-hidden">
                  {['all', 'credit', 'debit'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={`px-4 py-2 text-sm font-medium capitalize ${
                        activeTab === tab
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {filteredTransactions.length > 0 ? (
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-sm text-gray-500 capitalize">
                            {transaction.status}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <p className={`font-semibold ${
                        transaction.type === 'credit' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </div>

            {/* Linked Payment Methods */}
            <div className="mt-6 bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Linked Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 border rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">•••• •••• •••• 4532</p>
                    <p className="text-sm text-gray-500">Expires 12/27</p>
                  </div>
                  <span className="badge-success">Default</span>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">HDFC Bank - ****1234</p>
                    <p className="text-sm text-gray-500">UPI linked</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors">
                  <Plus className="h-5 w-5" />
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
