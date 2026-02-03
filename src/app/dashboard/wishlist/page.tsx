"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface WishlistItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  addedAt: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data.items || []);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/v1/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      // Optionally remove from wishlist after adding to cart
      removeFromWishlist(productId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
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
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-red-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mb-6">
            Save items you like by clicking the heart icon on products.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-200 hover:from-primary-700 hover:to-primary-800 transition-all"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-5 p-5">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Heart className="h-8 w-8 text-gray-400" />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(item.price)}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {formatCurrency(item.originalPrice)}
                        </span>
                        <span className="text-sm text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                          {Math.round(
                            ((item.originalPrice - item.price) / item.originalPrice) * 100
                          )}% off
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Added on {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                  {!item.inStock && (
                    <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => addToCart(item.productId)}
                    disabled={!item.inStock}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all text-sm shadow-lg shadow-primary-200 disabled:shadow-none"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
