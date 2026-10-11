"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WEEKLY_DATA = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 4 },
];

export default function ProgressPage() {
  const { user, userSkills, completedMilestoneIds, completedResourceIds } = useAuth();

  const [goals, setGoals] = useState([
    { id: "g1", title: "Complete Spring Boot REST API Milestone", date: "2026-10-25", done: false },
    { id: "g2", title: "Build Full Stack E-Commerce Portfolio App", date: "2026-11-15", done: false },
    { id: "g3", title: "Solve 20 LeetCode Java Questions", date: "2026-10-18", done: true },
  ]);

  const [newGoal, setNewGoal] = useState("");

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        { id: `g-${Date.now()}`, title: newGoal.trim(), date: "2026-11-30", done: false },
      ]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 via-navy-900 to-navy-950 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <BarChart3 className="w-4 h-4 animate-pulse" />
            <span>Learning Analytics & Goals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Learning Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Track your study hours, completed roadmap milestones, readiness score, and personal achievements.
          </p>
        </div>

        {/* Readiness Index Gauge */}
        <div className="p-4 rounded-xl bg-navy-950/90 border border-cyan-500/30 text-center shrink-0 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Career Readiness Index
          </span>
          <span className="text-3xl font-extrabold text-cyan-400 block">68 / 100</span>
          <span className="text-[10px] text-emerald-400 font-semibold block">Intermediate Level</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Skills Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{userSkills.length}</span>
          <p className="text-[11px] text-slate-400">Self-assessed skills in profile</p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Courses Completed</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{completedResourceIds.length + 2}</span>
          <p className="text-[11px] text-slate-400">Verified learning modules</p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Roadmap Milestones</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{completedMilestoneIds.length} / 8</span>
          <p className="text-[11px] text-slate-400">Steps completed</p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Study Hours</span>
            <Clock className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{user?.studyHours || 32} hrs</span>
          <p className="text-[11px] text-emerald-400 font-semibold">+4.5 hrs this week</p>
        </div>
      </div>

      {/* Grid: Study Activity Chart & Personal Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Bar Chart (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Study Hours Log
              </h3>
              <p className="text-xs text-slate-400">Daily breakdown for the current week</p>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">
              28 Hrs Total
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <XAxis dataKey="day" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    color: "#F8FAFC",
                  }}
                />
                <Bar dataKey="hours" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personal Goals Manager (1 Column) */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            Personal Learning Goals
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add personal goal..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
            />
            <button
              onClick={handleAddGoal}
              className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {goals.map((g) => (
              <div
                key={g.id}
                className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 flex-1 truncate">
                  <button onClick={() => toggleGoal(g.id)} className="text-slate-400 hover:text-emerald-400">
                    {g.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-600" />}
                  </button>
                  <span className={`truncate font-medium ${g.done ? "line-through text-slate-500" : "text-white"}`}>
                    {g.title}
                  </span>
                </div>
                <button onClick={() => removeGoal(g.id)} className="text-slate-500 hover:text-rose-400 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Achievement Badges Unlocked
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-navy-950 border border-amber-500/30 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-white">Java Foundation</span>
            <span className="text-[10px] text-slate-400">Completed Core Java</span>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-purple-500/30 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">Roadmap Pioneer</span>
            <span className="text-[10px] text-slate-400">Completed Step 1 & 2</span>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-cyan-500/30 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">AI Career Explorer</span>
            <span className="text-[10px] text-slate-400">Consulted Gemini AI</span>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex flex-col items-center text-center space-y-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400">Full Stack Master</span>
            <span className="text-[10px] text-slate-500">Locked (Step 6)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
