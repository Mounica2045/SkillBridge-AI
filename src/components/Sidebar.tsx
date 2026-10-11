"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Bot,
  Radar,
  BookOpen,
  Milestone,
  Bookmark,
  BarChart3,
  User,
  Compass,
  LogOut,
  ChevronRight,
} from "lucide-react";

export function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen?: boolean; onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "AI Career Guidance", href: "/dashboard/ai-guidance", icon: Bot, badge: "AI" },
    { label: "Skill Gap Analysis", href: "/dashboard/skill-gap", icon: Radar },
    { label: "Learning Recommendations", href: "/dashboard/learning", icon: BookOpen },
    { label: "Career Roadmap", href: "/dashboard/roadmap", icon: Milestone },
    { label: "Saved Resources", href: "/dashboard/saved", icon: Bookmark },
    { label: "My Progress", href: "/dashboard/progress", icon: BarChart3 },
    { label: "Profile & Settings", href: "/dashboard/settings", icon: User },
  ];

  const content = (
    <aside className="w-64 h-full bg-navy-950 border-r border-purple-900/30 flex flex-col justify-between p-4 select-none">
      <div className="space-y-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 px-3 py-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-cyan-400 p-0.5 shadow-md shadow-purple-600/20">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight">
              SkillBridge<span className="text-cyan-400 font-extrabold">AI</span>
            </span>
            <span className="text-[10px] text-purple-300/70 uppercase tracking-widest font-semibold">
              Student Hub
            </span>
          </div>
        </Link>

        {/* Target Career Badge */}
        <div className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-900/30 to-slate-900 border border-purple-500/20 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Role</span>
          <span className="text-xs font-semibold text-cyan-300 truncate mt-0.5">
            {user?.targetCareerTitle || "Java Full Stack Developer"}
          </span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-violet-600/20 text-white border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-purple-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile summary & logout */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center font-bold text-xs text-purple-200">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-white truncate">{user?.name}</span>
            <span className="text-[10px] text-slate-400 truncate">{user?.email}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 z-30">
        {content}
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-10 w-64 h-full bg-navy-950 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
