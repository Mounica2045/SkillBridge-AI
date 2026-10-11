"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserSkillItem } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  GraduationCap,
  Target,
  Code2,
  Plus,
  Trash2,
} from "lucide-react";

const EDUCATION_OPTIONS = [
  "High School Student",
  "Undergraduate (B.Tech / B.S.)",
  "Master's Degree",
  "Recent Graduate",
  "Career Switcher / Self-Taught",
];

const TARGET_CAREERS = [
  { slug: "java-full-stack-developer", title: "Java Full Stack Developer", category: "Software Development" },
  { slug: "data-analyst", title: "Data Analyst & BI Specialist", category: "Data & Analytics" },
  { slug: "ui-ux-designer", title: "UI/UX Designer", category: "Product Design" },
  { slug: "ai-ml-engineer", title: "AI / ML Engineer", category: "Artificial Intelligence" },
];

const COMMON_SKILLS = [
  "Java",
  "Object-Oriented Programming (OOP)",
  "SQL & Relational Databases",
  "HTML & CSS",
  "JavaScript (ES6+)",
  "React.js",
  "Spring Boot",
  "Git & GitHub",
  "Python",
  "Figma",
  "Docker",
];

export function OnboardingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { completeOnboarding, user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState(user?.name || "Alex Mercer");
  const [educationLevel, setEducationLevel] = useState(user?.educationLevel || "Undergraduate (B.Tech / B.S.)");
  const [fieldOfStudy, setFieldOfStudy] = useState(user?.fieldOfStudy || "Computer Science & Engineering");
  const [targetCareerSlug, setTargetCareerSlug] = useState("java-full-stack-developer");

  const [skills, setSkills] = useState<UserSkillItem[]>([
    { name: "Java", proficiency: "Intermediate" },
    { name: "Object-Oriented Programming (OOP)", proficiency: "Intermediate" },
    { name: "HTML & CSS", proficiency: "Advanced" },
    { name: "JavaScript (ES6+)", proficiency: "Intermediate" },
  ]);

  const [customSkill, setCustomSkill] = useState("");

  if (!isOpen) return null;

  const handleAddSkill = (skillName: string) => {
    if (!skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      setSkills([...skills, { name: skillName, proficiency: "Intermediate" }]);
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  const handleProficiencyChange = (
    skillName: string,
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  ) => {
    setSkills(
      skills.map((s) => (s.name === skillName ? { ...s, proficiency } : s))
    );
  };

  const handleFinish = () => {
    const selectedTarget = TARGET_CAREERS.find((c) => c.slug === targetCareerSlug);
    completeOnboarding(
      {
        name,
        educationLevel,
        fieldOfStudy,
        targetCareerSlug,
        targetCareerTitle: selectedTarget?.title || "Java Full Stack Developer",
      },
      skills
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-navy-900 border border-purple-500/30 p-8 shadow-2xl text-white overflow-hidden">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-lg">Personalized Onboarding</h3>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/40"
                    : step > s
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: Personal & Academic Background */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                Tell us about your background
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                This helps SkillBridge AI tailor your roadmap and career guidance.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Current Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  {EDUCATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Field of Study / Major
                </label>
                <input
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  placeholder="e.g. Computer Science, Information Technology, Design"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm flex items-center gap-2"
              >
                <span>Next: Select Career Goal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Target Career Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Select Your Desired Career Target
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                We'll benchmark your skills against industry standards for this position.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TARGET_CAREERS.map((c) => {
                const isSelected = targetCareerSlug === c.slug;
                return (
                  <button
                    key={c.slug}
                    onClick={() => setTargetCareerSlug(c.slug)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-500"
                        : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
                      {c.category}
                    </span>
                    <h5 className="font-semibold text-white mt-1">{c.title}</h5>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm flex items-center gap-2"
              >
                <span>Next: Rate Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Current Skills Self-Assessment */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                Enter Your Current Skills
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Add skills you already know and self-rate your proficiency level.
              </p>
            </div>

            {/* Common Skill Quick Badges */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Quick Add Common Skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {COMMON_SKILLS.map((sk) => {
                  const exists = skills.some((s) => s.name === sk);
                  return (
                    <button
                      key={sk}
                      onClick={() => (exists ? handleRemoveSkill(sk) : handleAddSkill(sk))}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                        exists
                          ? "bg-purple-600/30 border-purple-500 text-purple-200"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {exists && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      <span>{sk}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom skill input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Type custom skill name..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none"
              />
              <button
                onClick={() => {
                  if (customSkill.trim()) {
                    handleAddSkill(customSkill.trim());
                    setCustomSkill("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </div>

            {/* Active Selected Skills Table */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {skills.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800"
                >
                  <span className="text-sm font-semibold text-white">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <select
                      value={s.proficiency}
                      onChange={(e) =>
                        handleProficiencyChange(
                          s.name,
                          e.target.value as "Beginner" | "Intermediate" | "Advanced" | "Expert"
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-navy-950 border border-slate-700 text-xs text-purple-300"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button
                      onClick={() => handleRemoveSkill(s.name)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30 hover:opacity-95 flex items-center gap-2"
              >
                <span>Launch My Dashboard</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
