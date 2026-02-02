"use client"

import { useState } from "react"
import { 
  Book, 
  Code, 
  Key, 
  ShoppingCart, 
  Package, 
  Wallet, 
  Shield, 
  Zap,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Terminal,
  FileJson,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

type TabId = 'overview' | 'authentication' | 'products' | 'orders' | 'wallet' | 'errors' | 'sdks';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

function CodeBlock({ code, language = "json", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400">{title}</span>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <button
            onClick={copyCode}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-100">{code}</code>
        </pre>
      </div>
    </div>
  )
}

interface EndpointCardProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  children: React.ReactNode;
}

function EndpointCard({ method, path, description, children }: EndpointCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const methodColors = {
    GET: 'bg-green-500',
    POST: 'bg-blue-500',
    PUT: 'bg-yellow-500',
    DELETE: 'bg-red-500',
  }

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className={`${methodColors[method]} text-white text-xs font-bold px-2 py-1 rounded uppercase`}>
          {method}
        </span>
        <code className="flex-1 font-mono text-sm">{path}</code>
        <span className="text-gray-500 text-sm hidden md:block">{description}</span>
        {isOpen ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="border-t p-4 bg-gray-50">
          <p className="text-gray-600 mb-4 md:hidden">{description}</p>
          {children}
        </div>
      )}
    </div>
  )
}

export default function PartnerAPIDocsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Book className="h-4 w-4" /> },
    { id: 'authentication', label: 'Authentication', icon: <Key className="h-4 w-4" /> },
    { id: 'products', label: 'Products API', icon: <Package className="h-4 w-4" /> },
    { id: 'orders', label: 'Orders API', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'wallet', label: 'Wallet API', icon: <Wallet className="h-4 w-4" /> },
    { id: 'errors', label: 'Error Handling', icon: <AlertCircle className="h-4 w-4" /> },
    { id: 'sdks', label: 'SDKs & Libraries', icon: <Code className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SaraMobiles Partner API</h1>
                <p className="text-xs text-gray-500">v1.0.0</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:support@sarastores.com"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                API Support
              </a>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Main Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Documentation</h2>
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#rate-limits" className="text-gray-600 hover:text-blue-600">
                      Rate Limits
                    </a>
                  </li>
                  <li>
                    <a href="#webhooks" className="text-gray-600 hover:text-blue-600">
                      Webhooks
                    </a>
                  </li>
                  <li>
                    <a href="#sandbox" className="text-gray-600 hover:text-blue-600">
                      Sandbox Testing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border p-6 lg:p-8">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SaraMobiles Partner API</h2>
                  <p className="text-gray-600 mb-6">
                    Integrate our product catalog and order management system into your platform. 
                    Sell our products on your website and earn commissions on every sale.
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <Package className="h-8 w-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-gray-900">Product Catalog</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Access our complete product catalog with real-time pricing and stock information.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <ShoppingCart className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-semibold text-gray-900">Order Management</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Create and track orders seamlessly. We handle fulfillment and delivery.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <Wallet className="h-8 w-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-gray-900">Wallet & Payouts</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Track your earnings in real-time and request payouts to your bank account.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <Shield className="h-8 w-8 text-orange-600 mb-2" />
                      <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Enterprise-grade security with API key authentication and rate limiting.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
                  <CodeBlock 
                    code="https://sarastores.com/api/v1/partner" 
                    title="Production API Base URL" 
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Quick Start</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Get Your API Key</h4>
                        <p className="text-sm text-gray-600">
                          Contact us to register as a partner and receive your API credentials.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Test in Sandbox</h4>
                        <p className="text-sm text-gray-600">
                          Use your test API key (sk_test_...) to integrate and test without real transactions.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Go Live</h4>
                        <p className="text-sm text-gray-600">
                          Switch to your live API key (sk_live_...) and start processing real orders.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div id="rate-limits" className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Rate Limits</h3>
                    <p className="text-gray-600 mb-4">
                      Rate limits vary by your partner tier. Exceeding limits returns a 429 status code.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left font-medium text-gray-900">Tier</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-900">Requests/Min</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-900">Requests/Day</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-900">Commission</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-4 py-2">Starter</td>
                            <td className="px-4 py-2">60</td>
                            <td className="px-4 py-2">1,000</td>
                            <td className="px-4 py-2">15%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Growth</td>
                            <td className="px-4 py-2">300</td>
                            <td className="px-4 py-2">10,000</td>
                            <td className="px-4 py-2">12%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Professional</td>
                            <td className="px-4 py-2">1,000</td>
                            <td className="px-4 py-2">100,000</td>
                            <td className="px-4 py-2">10%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Enterprise</td>
                            <td className="px-4 py-2">5,000</td>
                            <td className="px-4 py-2">1,000,000</td>
                            <td className="px-4 py-2">Custom</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication Tab */}
              {activeTab === 'authentication' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
                  <p className="text-gray-600 mb-6">
                    All API requests must include your API key in the Authorization header.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">API Key Format</h3>
                  <p className="text-gray-600 mb-4">
                    API keys follow this format:
                  </p>
                  <CodeBlock 
                    code={`# Test Environment
sk_test_ptnr_{partner_id}_{random_string}

# Production Environment
sk_live_ptnr_{partner_id}_{random_string}`}
                    title="API Key Format"
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Making Authenticated Requests</h3>
                  <p className="text-gray-600 mb-4">
                    Include your API key in the Authorization header as a Bearer token:
                  </p>

                  <CodeBlock 
                    code={`curl -X GET "https://sarastores.com/api/v1/partner/products" \\
  -H "Authorization: Bearer sk_live_ptnr_abc123_..." \\
  -H "Content-Type: application/json"`}
                    title="cURL Example"
                  />

                  <CodeBlock 
                    code={`// JavaScript / Node.js
const response = await fetch('https://sarastores.com/api/v1/partner/products', {
  headers: {
    'Authorization': 'Bearer sk_live_ptnr_abc123_...',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`}
                    title="JavaScript Example"
                  />

                  <CodeBlock 
                    code={`# Python
import requests

headers = {
    'Authorization': 'Bearer sk_live_ptnr_abc123_...',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://sarastores.com/api/v1/partner/products',
    headers=headers
)

data = response.json()
print(data)`}
                    title="Python Example"
                  />

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Security Best Practices</h4>
                        <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                          <li>• Never expose your API key in client-side code</li>
                          <li>• Use environment variables to store keys</li>
                          <li>• Rotate keys periodically</li>
                          <li>• Use test keys for development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Products API Tab */}
              {activeTab === 'products' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Products API</h2>
                  <p className="text-gray-600 mb-6">
                    Access our complete product catalog with real-time pricing and inventory.
                  </p>

                  <EndpointCard method="GET" path="/products" description="List all products">
                    <h4 className="font-medium text-gray-900 mb-2">Query Parameters</h4>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-3 py-2 text-left">Parameter</th>
                            <th className="px-3 py-2 text-left">Type</th>
                            <th className="px-3 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr><td className="px-3 py-2 font-mono text-xs">page</td><td className="px-3 py-2">number</td><td className="px-3 py-2">Page number (default: 1)</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">limit</td><td className="px-3 py-2">number</td><td className="px-3 py-2">Items per page (max: 100)</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">category</td><td className="px-3 py-2">string</td><td className="px-3 py-2">Filter by category</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">search</td><td className="px-3 py-2">string</td><td className="px-3 py-2">Search by name/SKU</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">inStock</td><td className="px-3 py-2">boolean</td><td className="px-3 py-2">Only in-stock items</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <CodeBlock 
                      code={`{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_abc123",
        "sku": "BW-TV-55-4K",
        "name": "55 inch 4K Smart TV",
        "description": "Ultra HD Smart Television",
        "category": "televisions",
        "price": 45999,
        "mrp": 59999,
        "discount": 23,
        "stock": 150,
        "inStock": true,
        "images": ["https://cdn.sarastores.com/products/tv.jpg"],
        "brand": "Samsung"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1250,
      "totalPages": 63
    }
  }
}`}
                      title="Response"
                    />
                  </EndpointCard>

                  <EndpointCard method="GET" path="/products/{productId}" description="Get product details">
                    <h4 className="font-medium text-gray-900 mb-2">Path Parameters</h4>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-3 py-2 text-left">Parameter</th>
                            <th className="px-3 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="px-3 py-2 font-mono text-xs">productId</td><td className="px-3 py-2">Unique product identifier</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <CodeBlock 
                      code={`{
  "success": true,
  "data": {
    "id": "prod_abc123",
    "sku": "BW-TV-55-4K",
    "name": "55 inch 4K Smart TV",
    "description": "Ultra HD Smart Television with HDR support...",
    "category": "televisions",
    "subCategory": "smart-tv",
    "price": 45999,
    "mrp": 59999,
    "discount": 23,
    "stock": 150,
    "inStock": true,
    "images": [
      {
        "url": "https://cdn.sarastores.com/products/tv-1.jpg",
        "alt": "Front view",
        "isPrimary": true
      }
    ],
    "specifications": {
      "screenSize": "55 inches",
      "resolution": "3840 x 2160",
      "refreshRate": "60Hz"
    },
    "brand": "Samsung",
    "warranty": "2 years",
    "deliveryInfo": {
      "estimatedDays": 3,
      "freeDelivery": true
    }
  }
}`}
                      title="Response"
                    />
                  </EndpointCard>

                  <EndpointCard method="POST" path="/products/stock-check" description="Bulk stock check">
                    <h4 className="font-medium text-gray-900 mb-2">Request Body</h4>
                    <CodeBlock 
                      code={`{
  "productIds": ["prod_abc123", "prod_def456", "prod_ghi789"]
}`}
                      title="Request"
                    />
                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Response</h4>
                    <CodeBlock 
                      code={`{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_abc123",
        "sku": "BW-TV-55-4K",
        "price": 45999,
        "mrp": 59999,
        "stock": 150,
        "inStock": true
      },
      {
        "id": "prod_def456",
        "sku": "BW-WM-7KG",
        "price": 32999,
        "mrp": 39999,
        "stock": 0,
        "inStock": false
      }
    ]
  }
}`}
                      title="Response"
                    />
                  </EndpointCard>
                </div>
              )}

              {/* Orders API Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders API</h2>
                  <p className="text-gray-600 mb-6">
                    Create and manage orders. We handle fulfillment, shipping, and delivery tracking.
                  </p>

                  <EndpointCard method="POST" path="/orders" description="Create a new order">
                    <h4 className="font-medium text-gray-900 mb-2">Request Body</h4>
                    <CodeBlock 
                      code={`{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "address": {
      "line1": "123 Main Street",
      "line2": "Apartment 4B",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "country": "India"
    }
  },
  "items": [
    {
      "productId": "prod_abc123",
      "quantity": 1
    },
    {
      "productId": "prod_def456",
      "quantity": 2
    }
  ],
  "paymentMethod": "prepaid",
  "partnerOrderId": "PO-12345",
  "notes": "Gift wrapping requested"
}`}
                      title="Request"
                    />
                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Response</h4>
                    <CodeBlock 
                      code={`{
  "success": true,
  "data": {
    "orderId": "BW-ORD-2026020112345",
    "partnerOrderId": "PO-12345",
    "status": "pending",
    "items": [
      {
        "productId": "prod_abc123",
        "name": "55 inch 4K Smart TV",
        "price": 45999,
        "quantity": 1,
        "subtotal": 45999
      }
    ],
    "summary": {
      "subtotal": 111997,
      "tax": 20159,
      "shipping": 0,
      "total": 132156
    },
    "partnerEarnings": {
      "orderValue": 132156,
      "commissionRate": 12,
      "commissionAmount": 15859,
      "status": "pending"
    },
    "estimatedDelivery": "2026-02-04"
  }
}`}
                      title="Response"
                    />
                  </EndpointCard>

                  <EndpointCard method="GET" path="/orders" description="List all orders">
                    <h4 className="font-medium text-gray-900 mb-2">Query Parameters</h4>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-3 py-2 text-left">Parameter</th>
                            <th className="px-3 py-2 text-left">Type</th>
                            <th className="px-3 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr><td className="px-3 py-2 font-mono text-xs">page</td><td className="px-3 py-2">number</td><td className="px-3 py-2">Page number</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">limit</td><td className="px-3 py-2">number</td><td className="px-3 py-2">Items per page (max: 50)</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">status</td><td className="px-3 py-2">string</td><td className="px-3 py-2">Filter by status</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">fromDate</td><td className="px-3 py-2">string</td><td className="px-3 py-2">Start date (ISO 8601)</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">toDate</td><td className="px-3 py-2">string</td><td className="px-3 py-2">End date (ISO 8601)</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Statuses</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'].map(status => (
                        <span key={status} className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{status}</span>
                      ))}
                    </div>
                  </EndpointCard>

                  <EndpointCard method="GET" path="/orders/{orderId}" description="Get order details">
                    <h4 className="font-medium text-gray-900 mb-2">Response includes</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Order status and history</li>
                      <li>• Item details</li>
                      <li>• Tracking information</li>
                      <li>• Partner earnings breakdown</li>
                    </ul>
                  </EndpointCard>

                  <EndpointCard method="POST" path="/orders/{orderId}/cancel" description="Cancel an order">
                    <h4 className="font-medium text-gray-900 mb-2">Request Body</h4>
                    <CodeBlock 
                      code={`{
  "reason": "customer_request",
  "notes": "Customer changed their mind"
}`}
                      title="Request"
                    />
                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Cancellation Reasons</h4>
                    <div className="flex flex-wrap gap-2">
                      {['customer_request', 'out_of_stock', 'pricing_error', 'duplicate_order', 'other'].map(reason => (
                        <span key={reason} className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{reason}</span>
                      ))}
                    </div>
                  </EndpointCard>
                </div>
              )}

              {/* Wallet API Tab */}
              {activeTab === 'wallet' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Wallet API</h2>
                  <p className="text-gray-600 mb-6">
                    Track your earnings and request payouts to your registered bank account.
                  </p>

                  <EndpointCard method="GET" path="/wallet/balance" description="Get wallet balance">
                    <CodeBlock 
                      code={`{
  "success": true,
  "data": {
    "walletId": "wallet_abc123",
    "balance": {
      "available": 125000,
      "pending": 45000,
      "held": 5000,
      "total": 175000
    },
    "currency": "INR",
    "stats": {
      "lifetimeEarnings": 2500000,
      "lifetimeWithdrawals": 2325000,
      "thisMonthEarnings": 175000
    }
  }
}`}
                      title="Response"
                    />
                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Balance Types</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Available:</strong> Ready for withdrawal</li>
                      <li><strong>Pending:</strong> Earnings from orders not yet delivered</li>
                      <li><strong>Held:</strong> Under review due to disputes/refunds</li>
                    </ul>
                  </EndpointCard>

                  <EndpointCard method="GET" path="/wallet/transactions" description="Get transaction history">
                    <h4 className="font-medium text-gray-900 mb-2">Query Parameters</h4>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-3 py-2 text-left">Parameter</th>
                            <th className="px-3 py-2 text-left">Type</th>
                            <th className="px-3 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr><td className="px-3 py-2 font-mono text-xs">page</td><td className="px-3 py-2">number</td><td className="px-3 py-2">Page number</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">limit</td><td className="px-3 py-2">number</td><td className="px-3 py-2">Items per page</td></tr>
                          <tr><td className="px-3 py-2 font-mono text-xs">type</td><td className="px-3 py-2">string</td><td className="px-3 py-2">credit, debit, hold, release</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </EndpointCard>

                  <EndpointCard method="POST" path="/wallet/payout" description="Request a payout">
                    <h4 className="font-medium text-gray-900 mb-2">Request Body</h4>
                    <CodeBlock 
                      code={`{
  "amount": 100000,
  "bankAccountId": "bank_acc_123",
  "notes": "Monthly payout - January 2026"
}`}
                      title="Request"
                    />
                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Response</h4>
                    <CodeBlock 
                      code={`{
  "success": true,
  "data": {
    "payoutId": "payout_abc123",
    "amount": 100000,
    "status": "pending_approval",
    "bankAccount": {
      "bankName": "HDFC Bank",
      "accountNumber": "****1234",
      "ifsc": "HDFC0001234"
    },
    "estimatedArrival": "2026-02-03"
  },
  "message": "Payout request submitted. Awaiting admin approval."
}`}
                      title="Response"
                    />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Minimum payout amount is ₹1,000. Payouts require admin approval and are processed within 2-3 business days.
                      </p>
                    </div>
                  </EndpointCard>

                  <EndpointCard method="GET" path="/wallet/payouts" description="Get payout history">
                    <p className="text-gray-600 mb-4">
                      Returns a list of all payout requests with their status and transaction details.
                    </p>
                    <h4 className="font-medium text-gray-900 mb-2">Payout Statuses</h4>
                    <div className="flex flex-wrap gap-2">
                      {['pending_approval', 'approved', 'processing', 'completed', 'rejected', 'failed'].map(status => (
                        <span key={status} className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{status}</span>
                      ))}
                    </div>
                  </EndpointCard>
                </div>
              )}

              {/* Error Handling Tab */}
              {activeTab === 'errors' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
                  <p className="text-gray-600 mb-6">
                    All errors follow a consistent format to help you handle them gracefully.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Response Format</h3>
                  <CodeBlock 
                    code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-02-01T12:00:00Z"
  }
}`}
                    title="Error Response"
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">HTTP Status Codes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left font-medium">Code</th>
                          <th className="px-4 py-2 text-left font-medium">Status</th>
                          <th className="px-4 py-2 text-left font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr><td className="px-4 py-2 font-mono">200</td><td className="px-4 py-2">OK</td><td className="px-4 py-2">Request successful</td></tr>
                        <tr><td className="px-4 py-2 font-mono">201</td><td className="px-4 py-2">Created</td><td className="px-4 py-2">Resource created successfully</td></tr>
                        <tr><td className="px-4 py-2 font-mono">400</td><td className="px-4 py-2">Bad Request</td><td className="px-4 py-2">Invalid request parameters</td></tr>
                        <tr><td className="px-4 py-2 font-mono">401</td><td className="px-4 py-2">Unauthorized</td><td className="px-4 py-2">Missing or invalid API key</td></tr>
                        <tr><td className="px-4 py-2 font-mono">403</td><td className="px-4 py-2">Forbidden</td><td className="px-4 py-2">Insufficient permissions</td></tr>
                        <tr><td className="px-4 py-2 font-mono">404</td><td className="px-4 py-2">Not Found</td><td className="px-4 py-2">Resource not found</td></tr>
                        <tr><td className="px-4 py-2 font-mono">429</td><td className="px-4 py-2">Too Many Requests</td><td className="px-4 py-2">Rate limit exceeded</td></tr>
                        <tr><td className="px-4 py-2 font-mono">500</td><td className="px-4 py-2">Server Error</td><td className="px-4 py-2">Internal server error</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Error Codes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left font-medium">Code</th>
                          <th className="px-4 py-2 text-left font-medium">Description</th>
                          <th className="px-4 py-2 text-left font-medium">Resolution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr><td className="px-4 py-2 font-mono text-xs">INVALID_API_KEY</td><td className="px-4 py-2">API key is invalid or revoked</td><td className="px-4 py-2">Check your API key</td></tr>
                        <tr><td className="px-4 py-2 font-mono text-xs">RATE_LIMITED</td><td className="px-4 py-2">Too many requests</td><td className="px-4 py-2">Wait and retry</td></tr>
                        <tr><td className="px-4 py-2 font-mono text-xs">PRODUCT_NOT_FOUND</td><td className="px-4 py-2">Product doesn't exist</td><td className="px-4 py-2">Verify product ID</td></tr>
                        <tr><td className="px-4 py-2 font-mono text-xs">INSUFFICIENT_STOCK</td><td className="px-4 py-2">Not enough inventory</td><td className="px-4 py-2">Reduce quantity or try later</td></tr>
                        <tr><td className="px-4 py-2 font-mono text-xs">INSUFFICIENT_BALANCE</td><td className="px-4 py-2">Wallet balance too low</td><td className="px-4 py-2">Wait for pending earnings</td></tr>
                        <tr><td className="px-4 py-2 font-mono text-xs">ORDER_NOT_CANCELLABLE</td><td className="px-4 py-2">Order already shipped</td><td className="px-4 py-2">Contact support</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Handling Rate Limits</h3>
                  <p className="text-gray-600 mb-4">
                    When you receive a 429 response, check the headers for retry information:
                  </p>
                  <CodeBlock 
                    code={`HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706788845
Retry-After: 45`}
                    title="Rate Limit Headers"
                  />
                </div>
              )}

              {/* SDKs Tab */}
              {activeTab === 'sdks' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">SDKs & Code Examples</h2>
                  <p className="text-gray-600 mb-6">
                    Get started quickly with our code examples and integration patterns.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Node.js / JavaScript</h3>
                  <CodeBlock 
                    code={`// bytewise-partner-sdk.js
class ByteWisePartnerAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://sarastores.com/api/v1/partner';
  }

  async request(endpoint, options = {}) {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      ...options,
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error?.message || 'API request failed');
    }
    
    return data;
  }

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(\`/products?\${query}\`);
  }

  async getProduct(productId) {
    return this.request(\`/products/\${productId}\`);
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId) {
    return this.request(\`/orders/\${orderId}\`);
  }

  async listOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(\`/orders?\${query}\`);
  }

  // Wallet
  async getWalletBalance() {
    return this.request('/wallet/balance');
  }

  async requestPayout(amount, bankAccountId) {
    return this.request('/wallet/payout', {
      method: 'POST',
      body: JSON.stringify({ amount, bankAccountId }),
    });
  }
}

// Usage
const api = new ByteWisePartnerAPI('sk_live_ptnr_...');

// Get products
const products = await api.getProducts({ category: 'televisions' });

// Create order
const order = await api.createOrder({
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+919876543210',
    address: { ... }
  },
  items: [
    { productId: 'prod_abc123', quantity: 1 }
  ],
  paymentMethod: 'prepaid'
});

console.log('Order created:', order.data.orderId);`}
                    title="JavaScript SDK Example"
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-8">Python</h3>
                  <CodeBlock 
                    code={`# bytewise_partner.py
import requests
from typing import Optional, Dict, Any

class ByteWisePartnerAPI:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = 'https://sarastores.com/api/v1/partner'
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        })

    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        response = self.session.request(
            method,
            f'{self.base_url}{endpoint}',
            **kwargs
        )
        data = response.json()
        
        if not data.get('success'):
            raise Exception(data.get('error', {}).get('message', 'API request failed'))
        
        return data

    # Products
    def get_products(self, **params) -> Dict:
        return self._request('GET', '/products', params=params)

    def get_product(self, product_id: str) -> Dict:
        return self._request('GET', f'/products/{product_id}')

    # Orders
    def create_order(self, order_data: Dict) -> Dict:
        return self._request('POST', '/orders', json=order_data)

    def get_order(self, order_id: str) -> Dict:
        return self._request('GET', f'/orders/{order_id}')

    def list_orders(self, **params) -> Dict:
        return self._request('GET', '/orders', params=params)

    # Wallet
    def get_wallet_balance(self) -> Dict:
        return self._request('GET', '/wallet/balance')

    def request_payout(self, amount: int, bank_account_id: str) -> Dict:
        return self._request('POST', '/wallet/payout', json={
            'amount': amount,
            'bankAccountId': bank_account_id
        })


# Usage
api = ByteWisePartnerAPI('sk_live_ptnr_...')

# Get products
products = api.get_products(category='televisions', limit=10)

# Create order
order = api.create_order({
    'customer': {
        'name': 'John Doe',
        'email': 'john@example.com',
        'phone': '+919876543210',
        'address': { ... }
    },
    'items': [
        {'productId': 'prod_abc123', 'quantity': 1}
    ],
    'paymentMethod': 'prepaid'
})

print(f"Order created: {order['data']['orderId']}")`}
                    title="Python SDK Example"
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-8">PHP</h3>
                  <CodeBlock 
                    code={`<?php
// ByteWisePartnerAPI.php

class ByteWisePartnerAPI {
    private $apiKey;
    private $baseUrl = 'https://sarastores.com/api/v1/partner';

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    private function request($method, $endpoint, $data = null) {
        $ch = curl_init();
        
        $url = $this->baseUrl . $endpoint;
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json'
        ]);
        
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }

    // Products
    public function getProducts($params = []) {
        $query = http_build_query($params);
        return $this->request('GET', '/products?' . $query);
    }

    public function getProduct($productId) {
        return $this->request('GET', '/products/' . $productId);
    }

    // Orders
    public function createOrder($orderData) {
        return $this->request('POST', '/orders', $orderData);
    }

    public function getOrder($orderId) {
        return $this->request('GET', '/orders/' . $orderId);
    }

    // Wallet
    public function getWalletBalance() {
        return $this->request('GET', '/wallet/balance');
    }
}

// Usage
$api = new ByteWisePartnerAPI('sk_live_ptnr_...');

$products = $api->getProducts(['category' => 'televisions']);

$order = $api->createOrder([
    'customer' => [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+919876543210',
        'address' => [ ... ]
    ],
    'items' => [
        ['productId' => 'prod_abc123', 'quantity' => 1]
    ],
    'paymentMethod' => 'prepaid'
]);

echo "Order created: " . $order['data']['orderId'];
?>`}
                    title="PHP Example"
                  />

                  <div id="sandbox" className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sandbox Testing</h3>
                    <p className="text-gray-600 mb-4">
                      Use your test API key (sk_test_...) to test integration without processing real orders.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">Test Environment Features</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>✓ Full API access with sandbox data</li>
                        <li>✓ No real payments processed</li>
                        <li>✓ Test order lifecycle simulation</li>
                        <li>✓ Same rate limits as production</li>
                      </ul>
                    </div>
                  </div>

                  <div id="webhooks" className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Webhooks (Coming Soon)</h3>
                    <p className="text-gray-600 mb-4">
                      Receive real-time notifications for order status changes, payout completions, and more.
                    </p>
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        Webhook integration is coming soon. Contact us if you need real-time notifications for your integration.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                © 2026 ByteWise. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="mailto:support@sarastores.com" className="text-gray-600 hover:text-blue-600">
                API Support
              </a>
              <Link href="/terms-and-conditions" className="text-gray-600 hover:text-blue-600">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
