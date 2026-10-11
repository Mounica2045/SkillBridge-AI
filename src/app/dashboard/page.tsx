"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@/components/CircularProgress";
import { calculateSkillGap, UserSkillItem, FrameworkRequirement } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Radar,
  BookOpen,
  Milestone,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Code2,
  ChevronRight,
  Target,
  ExternalLink,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Hardcoded target framework requirements for Java Full Stack Developer benchmark
const JAVA_FRAMEWORK_REQS: FrameworkRequirement[] = [
  { skillName: "Java", importance: "Core", requiredProficiency: "Advanced" },
  { skillName: "Object-Oriented Programming (OOP)", importance: "Core", requiredProficiency: "Advanced" },
  { skillName: "Spring Boot", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "RESTful APIs", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "SQL & Relational Databases", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "JavaScript (ES6+)", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "React.js", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "HTML & CSS", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "Git & GitHub", importance: "Core", requiredProficiency: "Intermediate" },
  { skillName: "Docker", importance: "Recommended", requiredProficiency: "Beginner" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 4 },
];

export default function DashboardHome() {
  const { user, userSkills, completedMilestoneIds, bookmarkedResourceIds } = useAuth();
  const [chatInput, setChatInput] = useState("");

  const skillAnalysis = calculateSkillGap(userSkills, JAVA_FRAMEWORK_REQS);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-purple-900/60 via-violet-900/40 to-navy-900 border border-purple-500/30 p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Career Advisor Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || "Student"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              You are currently on track for <strong className="text-cyan-300 font-semibold">{user?.targetCareerTitle || "Java Full Stack Developer"}</strong>. Your overall skill match is {skillAnalysis.matchPercentage}%.
            </p>
          </div>

          {/* Quick Chat Input Box */}
          <div className="w-full md:w-80 space-y-2">
            <span className="text-[11px] font-semibold text-slate-300 block">
              Ask AI Career Assistant:
            </span>
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="What career are you interested in?"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-navy-950/90 border border-purple-500/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Link
                href={`/dashboard/ai-guidance?q=${encodeURIComponent(chatInput)}`}
                className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Target Career */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Target Role</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white truncate">
              {user?.targetCareerTitle || "Java Full Stack"}
            </h3>
            <span className="text-[11px] font-medium text-cyan-400">
              High Demand • \$95k - \$135k/yr
            </span>
          </div>
          <Link
            href="/dashboard/skill-gap"
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 pt-1"
          >
            <span>Change Target</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Skill Match Percentage */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Skill Match Score</span>
            <Radar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-extrabold text-white">{skillAnalysis.matchPercentage}%</span>
              <p className="text-[11px] text-slate-400">
                {skillAnalysis.matchingSkills.length} of {JAVA_FRAMEWORK_REQS.length} core skills
              </p>
            </div>
            <CircularProgress value={skillAnalysis.matchPercentage} size={54} strokeWidth={6} label="" />
          </div>
          <Link
            href="/dashboard/skill-gap"
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 pt-1"
          >
            <span>View Skill Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Study Activity */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Study Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">{user?.studyHours || 32} hrs</span>
            <p className="text-[11px] text-emerald-400 font-medium">
              +4.5 hrs logged this week
            </p>
          </div>
          <Link
            href="/dashboard/progress"
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 pt-1"
          >
            <span>View Progress Log</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Roadmap Milestones */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Roadmap Progress</span>
            <Milestone className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">
              {completedMilestoneIds.length} / 8
            </span>
            <p className="text-[11px] text-slate-400">Milestones Completed</p>
          </div>
          <Link
            href="/dashboard/roadmap"
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 pt-1"
          >
            <span>Continue Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid: Next Best Step & Current Skills Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Best Step Highlight Card (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-tr from-navy-900 via-navy-900 to-purple-950/50 border border-cyan-500/30 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Recommended Next Best Step
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
              Priority #1
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">
              Learn Spring Boot REST APIs & Dependency Injection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your skill analysis, mastering **Spring Boot** is your single highest-leverage gap to unlock your **Java Full Stack Developer** roadmap.
            </p>
          </div>

          {/* Action pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-purple-900/50 border border-purple-500/30 text-purple-200">
              Core Requirement
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
              Est. 25 Hours
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
              Includes 2 Projects
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/dashboard/roadmap"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Start Spring Boot Milestone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/learning?skill=Spring Boot"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs text-center transition-colors"
            >
              Explore Spring Boot Resources
            </Link>
          </div>
        </div>

        {/* Current Skills Summary Panel (1 Column) */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              Current Skills Summary
            </h3>
            <Link
              href="/dashboard/settings"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Edit Skills
            </Link>
          </div>

          <div className="space-y-2.5">
            {userSkills.map((sk) => (
              <div
                key={sk.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950/80 border border-slate-800/80"
              >
                <span className="text-xs font-medium text-slate-200">{sk.name}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {sk.proficiency}
                </span>
              </div>
            ))}
          </div>

          {skillAnalysis.missingSkills.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-2">
                Top Missing Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillAnalysis.missingSkills.slice(0, 4).map((ms) => (
                  <span
                    key={ms.name}
                    className="text-[10px] px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300"
                  >
                    + {ms.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Learning Activity Chart & Suggested Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Progress Activity Chart (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Weekly Learning Activity
              </h3>
              <span className="text-[11px] text-slate-400">Hours spent studying per day</span>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              28 Hrs Total This Week
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_ACTIVITY}>
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#activityGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Suggested Courses & Projects (1 Column) */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              Suggested Courses
            </h3>
            <Link href="/dashboard/learning" className="text-xs text-cyan-400 font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1 hover:border-purple-500/40 transition-colors">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">Recommended</span>
              <h4 className="text-xs font-bold text-white">Spring Boot 3 & REST API Bootcamp</h4>
              <p className="text-[11px] text-slate-400">Baeldung / Spring Official Guide • 25 hrs</p>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1 hover:border-purple-500/40 transition-colors">
              <span className="text-[10px] font-bold text-purple-400 uppercase">Core Skill</span>
              <h4 className="text-xs font-bold text-white">SQL & Database Normalization</h4>
              <p className="text-[11px] text-slate-400">FreeCodeCamp • 15 hrs</p>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1 hover:border-purple-500/40 transition-colors">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Project Idea</span>
              <h4 className="text-xs font-bold text-white">Full Stack E-Commerce Web App</h4>
              <p className="text-[11px] text-slate-400">React + Spring Boot + PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
