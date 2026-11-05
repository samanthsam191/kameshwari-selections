"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Camera,
  Star,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "profile" | "orders" | "wishlist" | "addresses";

const SIDEBAR_ITEMS = [
  { id: "profile" as Tab, label: "My Profile", icon: User },
  { id: "orders" as Tab, label: "My Orders", icon: Package },
  { id: "wishlist" as Tab, label: "Wishlist", icon: Heart },
  { id: "addresses" as Tab, label: "Saved Addresses", icon: MapPin },
];

const MOCK_ORDERS = [
  {
    id: "KS-2026110512345",
    date: "Nov 5, 2026",
    status: "Confirmed",
    total: 14998,
    items: [mockProducts[0], mockProducts[4]],
  },
  {
    id: "KS-2026102867890",
    date: "Oct 28, 2026",
    status: "Delivered",
    total: 22999,
    items: [mockProducts[1]],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <nav className="text-xs text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">My Account</span>
      </nav>

      <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          {/* User info card */}
          <div className="border rounded-xl p-4 mb-4 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-600)] flex items-center justify-center text-white font-semibold text-lg">
                P
              </div>
              <div>
                <p className="font-semibold text-sm">Priya Demo</p>
                <p className="text-xs text-[var(--muted-foreground)]">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeTab === item.id
                    ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
                    : "text-[var(--color-warm-600)] hover:bg-[var(--secondary)]"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="border rounded-xl p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-semibold">Personal Information</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Full Name</label>
                  <Input defaultValue="Priya Demo" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Phone</label>
                  <Input defaultValue="+91 98765 43210" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Email</label>
                  <Input defaultValue="priya@example.com" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Date of Birth</label>
                  <Input defaultValue="15 March 1992" readOnly />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-sm mb-4">Preferences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-xs text-[var(--muted-foreground)] mb-1">Preferred Language</label>
                    <Input defaultValue="Telugu / English" readOnly />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--muted-foreground)] mb-1">Notification Preference</label>
                    <Input defaultValue="WhatsApp + SMS" readOnly />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold">My Orders</h2>
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="border rounded-xl p-5 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Order #{order.id}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{order.date}</p>
                    </div>
                    <Badge
                      variant={order.status === "Delivered" ? "success" : "secondary"}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {order.items.map((product) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center shrink-0">
                          <Camera className="h-4 w-4 text-[var(--color-primary-300)] opacity-40" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">{product.fabric}</p>
                        </div>
                        <p className="text-sm font-semibold">
                          {formatPrice(product.salePrice || product.basePrice)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <p className="text-sm font-semibold">Total: {formatPrice(order.total)}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/orders/${order.id}`}>
                        View Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="font-heading text-lg font-semibold mb-4">
                My Wishlist ({mockProducts.slice(0, 3).length})
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="border rounded-xl p-3 bg-white">
                    <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center mb-3">
                      <Camera className="h-8 w-8 text-[var(--color-primary-300)] opacity-40" />
                    </div>
                    <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                    <p className="text-sm font-semibold mt-1">
                      {formatPrice(product.salePrice || product.basePrice)}
                    </p>
                    <Button size="sm" className="w-full mt-2">
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-semibold">Saved Addresses</h2>
                <Button variant="outline" size="sm">+ Add Address</Button>
              </div>
              <div className="space-y-3">
                <div className="border rounded-xl p-5 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Home</Badge>
                    <Badge variant="outline">Default</Badge>
                  </div>
                  <p className="text-sm text-[var(--color-warm-700)]">
                    <strong>Priya Demo</strong><br />
                    123 Sample Street, Begumpet<br />
                    Hyderabad, Telangana — 500001<br />
                    Phone: +91 98765 43210
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>

                <div className="border rounded-xl p-5 bg-white">
                  <Badge variant="secondary" className="mb-2">Office</Badge>
                  <p className="text-sm text-[var(--color-warm-700)]">
                    <strong>Priya Demo</strong><br />
                    456 Tech Park, HITEC City<br />
                    Hyderabad, Telangana — 500081<br />
                    Phone: +91 98765 43210
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
