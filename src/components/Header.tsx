"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export function Header({ onOpenMobileSidebar }: { onOpenMobileSidebar: () => void }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notifications = [
    { title: "Roadmap Milestone 2 Completed!", time: "2 hours ago", unread: true },
    { title: "New Learning Resource Recommended", time: "1 day ago", unread: true },
    { title: "AI Assistant: Spring Boot Guide Ready", time: "2 days ago", unread: false },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/ai-guidance?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full h-16 border-b border-purple-900/30 bg-navy-950/80 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between">
      {/* Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, careers or ask AI..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-800 bg-navy-900/80 text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl border border-slate-800 bg-navy-900/80 text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-navy-900 border border-purple-500/30 shadow-2xl p-4 text-white z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200">Notifications</span>
                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="py-2.5 space-y-0.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className={n.unread ? "text-cyan-300" : "text-slate-300"}>{n.title}</span>
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-800 bg-navy-900/80 hover:border-purple-500/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs text-white">
              {user?.name?.charAt(0) || "A"}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">
              {user?.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-navy-900 border border-purple-500/30 shadow-2xl p-2 text-white z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-slate-800 space-y-0.5">
                <span className="text-xs font-bold block text-white">{user?.name}</span>
                <span className="text-[10px] text-slate-400 block truncate">{user?.email}</span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    router.push("/dashboard/settings");
                  }}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>Profile & Settings</span>
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                    router.push("/");
                  }}
                  className="w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
