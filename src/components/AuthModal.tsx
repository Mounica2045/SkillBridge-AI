"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Check,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode !== "forgot" && (!password || password.length < 6)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (mode === "forgot") {
      setForgotSent(true);
      return;
    }

    // Authenticate user
    login(email);
    onClose();
    router.push("/dashboard");
  };

  const handleDemoLogin = () => {
    login("alex@skillbridge.ai");
    onClose();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-navy-900 border border-purple-500/30 p-8 shadow-2xl shadow-purple-900/30 text-white overflow-hidden">
        {/* Glowing aura */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            {mode === "login"
              ? "Welcome Back"
              : mode === "signup"
              ? "Create Your Account"
              : "Reset Password"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Access your AI guidance, roadmaps & skill gaps"
              : mode === "signup"
              ? "Start building the skills employers are looking for"
              : "Enter your registered email to receive reset instructions"}
          </p>
        </div>

        {/* Quick Demo Login Pill */}
        <button
          onClick={handleDemoLogin}
          className="w-full mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-violet-500/10 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all group shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>Quick Demo Access (Alex Mercer - Full Stack Track)</span>
        </button>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {forgotSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">Reset Link Sent</h4>
            <p className="text-xs text-slate-400">
              Check your inbox ({email}) for instructions to reset your password.
            </p>
            <button
              onClick={() => {
                setForgotSent(false);
                setMode("login");
              }}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              Back to Log In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 font-semibold text-sm text-white shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>
                {mode === "login"
                  ? "Log In to Dashboard"
                  : mode === "signup"
                  ? "Create Account"
                  : "Send Password Reset Link"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer toggle */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Sign Up Free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
