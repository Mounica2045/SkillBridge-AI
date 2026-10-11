"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  User,
  Settings,
  Sun,
  Moon,
  Bell,
  Trash2,
  Save,
  Check,
  GraduationCap,
  Target,
  Shield,
  LogOut,
} from "lucide-react";

export default function SettingsPage() {
  const { user, userSkills, updateProfile, updateSkills, logout, setTargetCareer } = useAuth();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(user?.name || "Alex Mercer");
  const [educationLevel, setEducationLevel] = useState(user?.educationLevel || "Undergraduate (B.Tech CS)");
  const [fieldOfStudy, setFieldOfStudy] = useState(user?.fieldOfStudy || "Computer Science & Engineering");
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || "Beginner");
  const [targetRole, setTargetRole] = useState(user?.targetCareerTitle || "Java Full Stack Developer");

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [aiTipsNotifs, setAiTipsNotifs] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      educationLevel,
      fieldOfStudy,
      experienceLevel,
      targetCareerTitle: targetRole,
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 via-navy-900 to-navy-950 border border-purple-500/30 p-6 sm:p-8 flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Settings className="w-4 h-4" />
            <span>Account Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Profile & Settings
          </h1>
          <p className="text-xs text-slate-300">
            Manage your personal profile, target career, themes, and notification preferences.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-purple-400" />
          Personal & Academic Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Education Level
            </label>
            <input
              type="text"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Field of Study / Major
            </label>
            <input
              type="text"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Career Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-semibold focus:outline-none"
            >
              <option value="Java Full Stack Developer">Java Full Stack Developer</option>
              <option value="Data Analyst & BI Specialist">Data Analyst & BI Specialist</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="AI / ML Engineer">AI / ML Engineer</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-md shadow-purple-600/30"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>

      {/* Theme & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Theme Switcher */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            Theme Preferences
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                theme === "dark"
                  ? "bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              <Moon className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-xs font-bold block">Dark Mode</span>
                <span className="text-[10px] text-slate-400">Deep Navy & Purple</span>
              </div>
            </button>

            <button
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                theme === "light"
                  ? "bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              <Sun className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-bold block">Light Mode</span>
                <span className="text-[10px] text-slate-400">Clean SaaS Theme</span>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Notification Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-slate-800">
              <span className="font-semibold text-slate-200">Email Milestone Reminders</span>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={() => setEmailNotifs(!emailNotifs)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-slate-800">
              <span className="font-semibold text-slate-200">AI Career Recommendations</span>
              <input
                type="checkbox"
                checked={aiTipsNotifs}
                onChange={() => setAiTipsNotifs(!aiTipsNotifs)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-rose-500/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Sign Out of SkillBridge AI</h3>
          <p className="text-xs text-slate-400">End your active session securely.</p>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs flex items-center gap-2 transition-colors border border-rose-500/30"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
