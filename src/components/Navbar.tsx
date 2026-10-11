"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Compass,
  Sparkles,
  Sun,
  Moon,
  User,
  ArrowRight,
  Menu,
  X,
  Layers,
  Award,
} from "lucide-react";

interface NavbarProps {
  onOpenAuth: (mode: "login" | "signup") => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-navy-950/80 backdrop-blur-xl transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
              SkillBridge<span className="text-cyan-400 font-extrabold ml-0.5">AI</span>
            </span>
            <span className="text-[10px] text-purple-300/70 font-medium tracking-widest uppercase">
              Career Guidance Platform
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            About
          </a>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-4 h-4" />
              Student Dashboard
            </Link>
          )}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-800 bg-navy-900/80 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all duration-200"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white hover:border-purple-500/60 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </Link>
              <button
                onClick={logout}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors px-2 py-1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth("login")}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth("signup")}
                className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all duration-200 flex items-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-navy-950 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <Link href="/" className="text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <a href="#features" className="text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>
            Features
          </a>
          <a href="#how-it-works" className="text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>
          <a href="#about" className="text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>
            About
          </a>
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="py-2.5 px-4 rounded-xl bg-purple-600 text-white font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Go to Student Dashboard
            </Link>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth("login");
                }}
                className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-200 text-center font-medium"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth("signup");
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-center"
              >
                Get Started Free
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
