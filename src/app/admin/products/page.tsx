"use client"

import { useEffect, useState, useCallback } from 'react'
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, RefreshCw, AlertCircle, Settings } from 'lucide-react'
import saraMobilesAPI, { SaraProduct } from '@/lib/saramobiles-api'

interface Product {
  id: string
  sku: string
  name: string
  price: number
  mrp: number
  stock: number
  inStock: boolean
  category: string
  brand: string
  images?: string[]
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 })
  const [apiConfig, setApiConfig] = useState<any>(null)

  useEffect(() => {
    // Get API config on mount
    setApiConfig(saraMobilesAPI.getConfig())
  }, [])

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)
    setErrorDetails(null)
    
    const config = saraMobilesAPI.getConfig()
    setApiConfig(config)
    
    if (!config.baseUrl || config.baseUrl === '(not configured)') {
      setError('API URL not configured')
      setErrorDetails('NEXT_PUBLIC_SARA_API_URL environment variable is not set')
      setLoading(false)
      return
    }
    
    if (!config.hasApiKey) {
      setError('API Key not configured')
      setErrorDetails('NEXT_PUBLIC_SARA_API_KEY environment variable is not set')
      setLoading(false)
      return
    }
    
    try {
      // Fetch from SaraMobiles Partner API
      console.log('[Admin Products] Fetching from:', config.baseUrl)
      const response = await saraMobilesAPI.getProducts({
        page,
        limit: 20,
        search: searchQuery || undefined
      })
      
      console.log('[Admin Products] Response:', response)
      
      // Safely access products with null checks
      const products = response?.data?.products || []
      const pagination = response?.data?.pagination || { page: 1, total: 0, totalPages: 0 }
      
      if (response?.success && products.length > 0) {
        // Convert SaraMobiles products to local format
        const localProducts: Product[] = products.map((p: SaraProduct) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          price: p.price,
          mrp: p.mrp,
          stock: p.stock,
          inStock: p.inStock,
          category: p.category,
          brand: p.brand,
          images: Array.isArray(p.images) 
            ? p.images.map(img => typeof img === 'string' ? img : img.url)
            : []
        }))
        
        setProducts(localProducts)
        setPagination({
          page: pagination.page || 1,
          total: pagination.total || products.length,
          pages: pagination.totalPages || 1
        })
        setUsingFallback(false)
        setError(null)
      } else {
        setProducts([])
        setPagination({ page: 1, total: 0, pages: 0 })
        setError('No products returned from API')
      }
    } catch (err: any) {
      console.error('Failed to fetch products from SaraMobiles API:', err)
      setError('Failed to fetch products')
      setErrorDetails(err?.message || 'Unknown error occurred')
      setProducts([])
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">
            Manage your product catalog from SaraMobiles API
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchProducts(pagination.page)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* API Configuration Info */}
      {apiConfig && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-blue-800">SaraMobiles API Configuration</p>
              <div className="text-sm text-blue-600 mt-1 space-y-1">
                <p><strong>Base URL:</strong> {apiConfig.baseUrl}</p>
                <p><strong>API Key:</strong> {apiConfig.hasApiKey ? apiConfig.apiKeyPrefix : '❌ Not configured'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">{error}</p>
            {errorDetails && <p className="text-sm text-red-600 mt-1">{errorDetails}</p>}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchProducts(1)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button 
          onClick={() => fetchProducts(1)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Search className="h-5 w-5" />
          Search
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MRP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {!products || products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No products found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {error ? 'Check your API configuration and refresh the page' : 'Products from SaraMobiles will appear here'}
                    </p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <span className="font-medium text-gray-900 max-w-[250px] truncate">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 font-mono">{product.sku}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 line-through">{formatCurrency(product.mrp)}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                          <Edit className="h-4 w-4 text-blue-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {products?.length || 0} of {pagination.total} products
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => fetchProducts(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">Page {pagination.page} of {pagination.pages || 1}</span>
            <button 
              onClick={() => fetchProducts(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages || loading}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* API Response */}
      <details className="bg-white rounded-xl border shadow-sm">
        <summary className="p-4 cursor-pointer font-medium text-gray-900">
          📊 SaraMobiles API Response (Debug)
        </summary>
        <pre className="p-4 bg-gray-900 text-green-400 overflow-x-auto text-sm max-h-96">
          {JSON.stringify({ 
            source: 'SaraMobiles Partner API',
            config: saraMobilesAPI.getConfig(),
            success: !error, 
            productCount: products?.length || 0,
            error: error || null,
            errorDetails: errorDetails || null,
            data: { products: products || [], pagination } 
          }, null, 2)}
        </pre>
      </details>
    </div>
  )
}
