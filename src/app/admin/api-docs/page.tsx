"use client";

import { useState } from "react";
import {
  Code,
  Copy,
  Check,
  Book,
  Key,
  Package,
  ShoppingCart,
  Wallet,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

type TabId = "overview" | "authentication" | "products" | "orders" | "wallet" | "errors";

interface CodeBlockProps {
  code: string;
  title?: string;
}

function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-100">{code}</code>
      </pre>
    </div>
  );
}

export default function AdminAPIDocsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Book className="h-4 w-4" /> },
    { id: "authentication", label: "Authentication", icon: <Key className="h-4 w-4" /> },
    { id: "products", label: "Products", icon: <Package className="h-4 w-4" /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { id: "wallet", label: "Wallet", icon: <Wallet className="h-4 w-4" /> },
    { id: "errors", label: "Errors", icon: <AlertCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
        <p className="text-gray-600">Complete API reference for ByteWise E-commerce</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border p-4 sticky top-24">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Endpoints</h3>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">API Overview</h2>
              <p className="text-gray-600 mb-6">
                The ByteWise API is organized around REST. Our API has predictable
                resource-oriented URLs, accepts JSON-encoded request bodies, returns
                JSON-encoded responses, and uses standard HTTP response codes.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
              <CodeBlock code="http://localhost:3000/api/v1" title="Base URL" />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Available Endpoints</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-medium">Endpoint</th>
                      <th className="px-4 py-2 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="px-4 py-2 font-mono text-xs">/auth/*</td><td className="px-4 py-2">Authentication endpoints</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-xs">/products/*</td><td className="px-4 py-2">Product catalog</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-xs">/cart/*</td><td className="px-4 py-2">Shopping cart operations</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-xs">/orders/*</td><td className="px-4 py-2">Order management</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-xs">/wallet/*</td><td className="px-4 py-2">Wallet & transactions</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-xs">/user/*</td><td className="px-4 py-2">User profile</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-xs">/admin/*</td><td className="px-4 py-2">Admin operations</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "authentication" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Authentication</h2>
              <p className="text-gray-600 mb-6">
                All authenticated requests must include a Bearer token in the Authorization header.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Register</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">POST</span>
                <code>/auth/register</code>
              </div>
              <CodeBlock
                code={`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "password": "password123"
}`}
                title="Request Body"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Login</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">POST</span>
                <code>/auth/login</code>
              </div>
              <CodeBlock
                code={`{
  "email": "john@example.com",
  "password": "password123"
}`}
                title="Request Body"
              />
              <CodeBlock
                code={`{
  "success": true,
  "data": {
    "userId": "user_abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}`}
                title="Response"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Using the Token</h3>
              <CodeBlock
                code={`curl -X GET http://localhost:3000/api/v1/user/profile \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"`}
                title="Example Request"
              />
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Products API</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">List Products</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">GET</span>
                <code>/products</code>
              </div>
              <p className="text-gray-600 mb-4">Query Parameters: page, limit, category, brand, search, sort</p>
              <CodeBlock
                code={`{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}`}
                title="Response"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Get Product Details</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">GET</span>
                <code>/products/:productId</code>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Orders API</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Order</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">POST</span>
                <code>/orders</code>
              </div>
              <CodeBlock
                code={`{
  "items": [
    { "productId": "prod_abc", "quantity": 1 }
  ],
  "addressId": "addr_123",
  "paymentMethod": "razorpay",
  "couponCode": "WELCOME10"
}`}
                title="Request Body"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">List Orders</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">GET</span>
                <code>/orders</code>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Order Statuses</h3>
              <div className="flex flex-wrap gap-2">
                {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                  <span key={status} className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{status}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "wallet" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Wallet API</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Get Balance</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">GET</span>
                <code>/wallet/balance</code>
              </div>
              <CodeBlock
                code={`{
  "success": true,
  "data": {
    "balance": 5000,
    "lifetimeEarnings": 15000,
    "lifetimeSpent": 10000
  }
}`}
                title="Response"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Add Money</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">POST</span>
                <code>/wallet/add-money</code>
              </div>
              <CodeBlock
                code={`{
  "amount": 1000
}`}
                title="Request Body"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Transaction History</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">GET</span>
                <code>/wallet/transactions</code>
              </div>
            </div>
          )}

          {activeTab === "errors" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Error Handling</h2>
              <p className="text-gray-600 mb-6">
                All errors return a consistent JSON structure with error code and message.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Response Format</h3>
              <CodeBlock
                code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format"
  }
}`}
                title="Error Response"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">HTTP Status Codes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-medium">Code</th>
                      <th className="px-4 py-2 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="px-4 py-2 font-mono">200</td><td className="px-4 py-2">Success</td></tr>
                    <tr><td className="px-4 py-2 font-mono">201</td><td className="px-4 py-2">Created</td></tr>
                    <tr><td className="px-4 py-2 font-mono">400</td><td className="px-4 py-2">Bad Request</td></tr>
                    <tr><td className="px-4 py-2 font-mono">401</td><td className="px-4 py-2">Unauthorized</td></tr>
                    <tr><td className="px-4 py-2 font-mono">403</td><td className="px-4 py-2">Forbidden</td></tr>
                    <tr><td className="px-4 py-2 font-mono">404</td><td className="px-4 py-2">Not Found</td></tr>
                    <tr><td className="px-4 py-2 font-mono">500</td><td className="px-4 py-2">Server Error</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
