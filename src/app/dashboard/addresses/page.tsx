"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Building,
  Check,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface Address {
  _id: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<{
    type: "home" | "work" | "other";
    name: string;
    phone: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>({
    type: "home",
    name: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAddresses(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "home",
      name: "",
      phone: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      type: address.type,
      name: address.name,
      phone: address.phone,
      street: address.street,
      landmark: address.landmark || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });
    setEditingId(address._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/v1/addresses/${editingId}`
        : "/api/v1/addresses";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        fetchAddresses();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save address:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "work":
        return <Building className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">My Addresses</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-200"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Address Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Type
              </label>
              <div className="flex gap-3">
                {(["home", "work", "other"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, type })}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all capitalize font-medium ${
                      formData.type === type
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {getTypeIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                placeholder="+91 9876543210"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <textarea
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                rows={2}
                placeholder="House No, Building, Street, Area"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                placeholder="Near..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                placeholder="Enter state"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                placeholder="Enter pincode"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData({ ...formData, isDefault: e.target.checked })
                  }
                  className="w-5 h-5 text-primary-600 rounded-md border-2 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Set as default address</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition-all shadow-lg shadow-primary-200"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {editingId ? "Update Address" : "Save Address"}
            </button>
            <button
              onClick={resetForm}
              className="flex-1 px-5 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 && !showForm ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
            No saved addresses
          </h3>
          <p className="text-gray-500 mb-6">
            Add your delivery addresses for faster checkout.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-200"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(address.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 capitalize">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-gray-800 mt-1.5">{address.name}</p>
                      <p className="text-gray-600 text-sm">{address.phone}</p>
                      <p className="text-gray-600 text-sm mt-2">
                        {address.street}
                        {address.landmark && `, ${address.landmark}`}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
