"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@/components/CircularProgress";
import { SkillRadarChart } from "@/components/SkillRadarChart";
import { calculateSkillGap, UserSkillItem, FrameworkRequirement } from "@/lib/utils";
import {
  Radar,
  Target,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Edit3,
} from "lucide-react";

interface FrameworkOption {
  slug: string;
  title: string;
  category: string;
  reqs: FrameworkRequirement[];
}

const FRAMEWORKS: FrameworkOption[] = [
  {
    slug: "java-full-stack-developer",
    title: "Java Full Stack Developer",
    category: "Software Development",
    reqs: [
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
    ],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst & BI Specialist",
    category: "Data & Analytics",
    reqs: [
      { skillName: "SQL & Relational Databases", importance: "Core", requiredProficiency: "Advanced" },
      { skillName: "Python", importance: "Core", requiredProficiency: "Intermediate" },
      { skillName: "Pandas & NumPy", importance: "Core", requiredProficiency: "Intermediate" },
      { skillName: "Data Visualization (Tableau/PowerBI)", importance: "Core", requiredProficiency: "Intermediate" },
      { skillName: "Git & GitHub", importance: "Recommended", requiredProficiency: "Beginner" },
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Product Designer",
    category: "Design",
    reqs: [
      { skillName: "UI/UX Design Fundamentals", importance: "Core", requiredProficiency: "Advanced" },
      { skillName: "Figma", importance: "Core", requiredProficiency: "Advanced" },
      { skillName: "HTML & CSS", importance: "Core", requiredProficiency: "Intermediate" },
      { skillName: "JavaScript (ES6+)", importance: "Recommended", requiredProficiency: "Beginner" },
    ],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    category: "Artificial Intelligence",
    reqs: [
      { skillName: "Python", importance: "Core", requiredProficiency: "Advanced" },
      { skillName: "Machine Learning Concepts", importance: "Core", requiredProficiency: "Advanced" },
      { skillName: "PyTorch / TensorFlow", importance: "Core", requiredProficiency: "Intermediate" },
      { skillName: "SQL & Relational Databases", importance: "Core", requiredProficiency: "Intermediate" },
      { skillName: "Git & GitHub", importance: "Recommended", requiredProficiency: "Intermediate" },
    ],
  },
];

export default function SkillGapPage() {
  const { user, userSkills, updateSkills, setTargetCareer } = useAuth();
  const [selectedSlug, setSelectedSlug] = useState(user?.targetCareerSlug || "java-full-stack-developer");

  const [editableSkills, setEditableSkills] = useState<UserSkillItem[]>(userSkills);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProf, setNewSkillProf] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");

  const currentFramework = FRAMEWORKS.find((f) => f.slug === selectedSlug) || FRAMEWORKS[0];
  const analysis = calculateSkillGap(editableSkills, currentFramework.reqs);

  // Convert to radar chart data
  const PROF_NUMERIC: Record<string, number> = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100 };
  const radarData = currentFramework.reqs.map((req) => {
    const foundUserSkill = editableSkills.find(
      (s) => s.name.toLowerCase().trim() === req.skillName.toLowerCase().trim()
    );
    return {
      skill: req.skillName,
      userLevel: foundUserSkill ? PROF_NUMERIC[foundUserSkill.proficiency] || 25 : 0,
      requiredLevel: PROF_NUMERIC[req.requiredProficiency] || 50,
    };
  });

  const handleSaveSkills = () => {
    updateSkills(editableSkills);
  };

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const updated = [...editableSkills, { name: newSkillName.trim(), proficiency: newSkillProf }];
      setEditableSkills(updated);
      updateSkills(updated);
      setNewSkillName("");
    }
  };

  const handleRemoveSkill = (name: string) => {
    const updated = editableSkills.filter((s) => s.name !== name);
    setEditableSkills(updated);
    updateSkills(updated);
  };

  const handleCareerChange = (slug: string) => {
    setSelectedSlug(slug);
    const targetFw = FRAMEWORKS.find((f) => f.slug === slug);
    if (targetFw) {
      setTargetCareer(slug, targetFw.title);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Selector */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 via-navy-900 to-navy-950 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Radar className="w-4 h-4 animate-pulse" />
            <span>Interactive Competency Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skill Gap Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Compare your self-reported skills against industry target frameworks, identify gaps, and discover priority learning actions.
          </p>
        </div>

        {/* Framework Selector Dropdown */}
        <div className="w-full md:w-80 space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-purple-400" />
            Target Career Framework:
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => handleCareerChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-purple-500/40 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 shadow-md"
          >
            {FRAMEWORKS.map((fw) => (
              <option key={fw.slug} value={fw.slug}>
                {fw.title} ({fw.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Circular Gauge & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match Percentage Card */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
            Overall Skill Match
          </span>
          <CircularProgress value={analysis.matchPercentage} size={150} label="Match Score" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-white">{currentFramework.title}</p>
            <p className="text-slate-400">
              {analysis.matchingSkills.length} Core Matches • {analysis.partialSkills.length} Partial • {analysis.missingSkills.length} Gaps
            </p>
          </div>
        </div>

        {/* Skill Competency Radar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Competency Radar Comparison</h3>
              <p className="text-[11px] text-slate-400">
                Purple = Your Skills | Cyan = Career Target Requirements
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              Live Chart
            </span>
          </div>
          <SkillRadarChart data={radarData} />
        </div>
      </div>

      {/* Priority Skills to Learn First */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Recommended Skills to Learn First</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.priorityToLearn.map((skillName, i) => (
            <div
              key={skillName}
              className="p-4 rounded-xl bg-navy-950/80 border border-purple-500/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-400/40 text-purple-200 font-extrabold text-xs flex items-center justify-center">
                  #{i + 1}
                </span>
                <span className="text-xs font-bold text-white">{skillName}</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                Learn Next
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Breakdown Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Matching Skills */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Matching Skills ({analysis.matchingSkills.length})</h3>
          </div>
          <div className="space-y-2">
            {analysis.matchingSkills.map((s) => (
              <div key={s.name} className="p-2.5 rounded-xl bg-navy-950 border border-emerald-500/20 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{s.name}</span>
                <span className="text-[10px] font-bold text-emerald-400">{s.current}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partial Skills */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Proficiency Gaps ({analysis.partialSkills.length})</h3>
          </div>
          <div className="space-y-2">
            {analysis.partialSkills.map((s) => (
              <div key={s.name} className="p-2.5 rounded-xl bg-navy-950 border border-amber-500/20 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{s.name}</span>
                <span className="text-[10px] text-amber-300">
                  {s.current} → Req: {s.required}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Missing Skills ({analysis.missingSkills.length})</h3>
          </div>
          <div className="space-y-2">
            {analysis.missingSkills.map((s) => (
              <div key={s.name} className="p-2.5 rounded-xl bg-navy-950 border border-rose-500/20 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{s.name}</span>
                <span className="text-[10px] font-bold text-rose-400 uppercase">{s.importance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editable Skills Table Section */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-purple-400" />
              Edit Your Skills & Live Re-assess
            </h3>
            <p className="text-xs text-slate-400">
              Add or adjust your proficiency levels to update your match score instantly.
            </p>
          </div>

          <button
            onClick={handleSaveSkills}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
          >
            Save Skills & Update Profile
          </button>
        </div>

        {/* Add Skill Form */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Skill name (e.g. Spring Boot, Docker)..."
            className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
          />
          <select
            value={newSkillProf}
            onChange={(e) => setNewSkillProf(e.target.value as any)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-purple-300"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </div>

        {/* List of Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {editableSkills.map((sk) => (
            <div
              key={sk.name}
              className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between"
            >
              <span className="text-xs font-semibold text-white">{sk.name}</span>
              <div className="flex items-center gap-2">
                <select
                  value={sk.proficiency}
                  onChange={(e) => {
                    const updated = editableSkills.map((s) =>
                      s.name === sk.name ? { ...s, proficiency: e.target.value as any } : s
                    );
                    setEditableSkills(updated);
                    updateSkills(updated);
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] text-purple-300"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  onClick={() => handleRemoveSkill(sk.name)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Explanation Footer */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <HelpCircle className="w-4 h-4" />
          <span>How Skill Gap Scores are Calculated</span>
        </div>
        <p className="leading-relaxed">
          {analysis.explanation} Core framework skills receive 1.5x weighting compared to recommended skills. Completing roadmap milestones and verified learning courses helps move partial and missing skills into exact matches.
        </p>
      </div>
    </div>
  );
}
