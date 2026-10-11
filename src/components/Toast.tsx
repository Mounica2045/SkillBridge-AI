"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, Sparkles } from "lucide-react";

export function Toast() {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 text-white border border-purple-500/40 shadow-xl shadow-purple-500/10 backdrop-blur-md">
        <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
        <span className="text-sm font-medium">{toastMessage}</span>
        <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-2" />
      </div>
    </div>
  );
}
