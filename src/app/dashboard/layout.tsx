"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
} from "lucide-react";

const sidebarItems = [
  { name: "Profile", href: "/dashboard", icon: User },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user profile
    fetch("/api/v1/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserName(data.data.name);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
            <Store className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">ByteWise</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Header Spacer */}
      <div className="lg:hidden h-14" />

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:left-0 bg-white border-r shadow-sm z-40 overflow-y-auto">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gray-900">ByteWise</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-5 border-b flex-shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-transparent">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{userName || "Loading..."}</p>
                <p className="text-sm text-primary-600">My Account</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t flex-shrink-0 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto">
              {/* User Info */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{userName || "Loading..."}</p>
                    <p className="text-sm text-gray-500">My Account</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="lg:ml-64 flex-1 min-h-screen">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
