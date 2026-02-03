"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Camera,
  Check,
  X,
  Loader2,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setFormData({ name: data.data.name, phone: data.data.phone || "" });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setEditing(false);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error?.message || "Failed to update profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-primary-600 animate-spin mx-auto" />
          <p className="mt-3 text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">My Profile</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <Check className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-8">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-display font-bold">{profile?.name}</h2>
              <p className="text-primary-100 mt-1">
                Member since {profile?.createdAt && new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-gray-900">Personal Information</h3>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900 font-medium">{profile?.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900 font-medium">{profile?.email}</span>
                {profile?.isEmailVerified && (
                  <span className="ml-auto px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-lg font-semibold flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                  placeholder="+91 9876543210"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900 font-medium">{profile?.phone || "Not provided"}</span>
                  {profile?.phone && profile?.isPhoneVerified && (
                    <span className="ml-auto px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-lg font-semibold flex items-center gap-1">
                      <Check className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Edit Actions */}
          {editing && (
            <div className="flex items-center gap-3 mt-8 pt-6 border-t">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition-all font-semibold shadow-lg"
              >
                {saving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Check className="h-5 w-5" />
                )}
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({ name: profile?.name || "", phone: profile?.phone || "" });
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
