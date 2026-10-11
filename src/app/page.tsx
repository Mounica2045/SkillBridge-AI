"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { OnboardingModal } from "@/components/OnboardingModal";
import { CircularProgress } from "@/components/CircularProgress";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Radar,
  BookOpen,
  Milestone,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Target,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const faqs = [
    {
      q: "How is the Skill Match Score calculated?",
      a: "Your Skill Match percentage compares your self-reported proficiency levels against a defined career-skill framework. Core framework requirements carry higher weighting than optional skills. Note: Scores are benchmark indicators to guide your learning, not verified industry certificates.",
    },
    {
      q: "How does the AI Career Guidance Assistant work?",
      a: "SkillBridge AI uses LLM technology (Google Gemini API with structured fallback) trained on real software engineering tracks. It reviews your education level, current skills, and target role to generate actionable step-by-step guidance.",
    },
    {
      q: "Are the learning resource recommendations free?",
      a: "Yes! We curate high-quality free and open-access courses, documentation (MDN, React Docs, Baeldung, Spring Initializr), official GitHub projects, and tutorials.",
    },
    {
      q: "Can I switch target careers after onboarding?",
      a: "Absolutely. You can switch your target career role anytime from your Student Dashboard or Settings page. Your skill gap scores and roadmaps will instantly update.",
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Glowing background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-glow pointer-events-none rounded-full blur-3xl opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 via-slate-900 to-cyan-950 border border-purple-500/30 text-xs font-semibold text-cyan-300 shadow-md">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Next-Gen AI Career Guidance & Skill Assessment</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight gradient-heading">
              Bridge Your Skills. <br className="hidden sm:block" /> Build Your Future.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Discover your career path, identify skill gaps, and build the skills employers are looking for with AI-powered personalized guidance.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 font-bold text-base text-white shadow-xl shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-3 group"
                >
                  <span>Go to Student Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => handleOpenAuth("signup")}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 font-bold text-base text-white shadow-xl shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-3 group"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="#features"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700 text-base font-semibold text-slate-200 transition-all text-center"
                  >
                    Explore Features
                  </a>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="pt-6 flex items-center justify-center gap-6 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to get started
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10+ Tech Career Track Frameworks
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-Time Gemini AI Advisor
              </span>
            </div>
          </div>

          {/* Interactive Dashboard Graphic Illustration Showcase */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="rounded-2xl border border-purple-500/30 bg-navy-900/90 shadow-2xl shadow-purple-900/40 p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Mock Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-semibold text-slate-400 ml-2">
                    SkillBridge AI Student Dashboard — Java Full Stack Track
                  </span>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  Live Preview
                </span>
              </div>

              {/* Preview Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                {/* Score Circular Widget */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/20 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Target Skill Match
                  </span>
                  <CircularProgress value={68} size={130} label="Match" sublabel="Java Full Stack" />
                  <p className="text-xs text-slate-400 mt-3">
                    5 Matched • 2 Partial • 3 Missing Skills
                  </p>
                </div>

                {/* AI Assistant Quick Response */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/20 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-cyan-400" />
                      <span className="text-xs font-bold text-white">AI Career Assistant</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                      Online
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-950 text-xs text-slate-300 border border-slate-800 space-y-1">
                    <p className="font-semibold text-cyan-300">"What should I learn next?"</p>
                    <p className="text-[11px] text-slate-400">
                      Focus on **Spring Boot REST APIs**. You have strong Java & React fundamentals!
                    </p>
                  </div>

                  <Link
                    href="/dashboard/ai-guidance"
                    className="w-full py-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold text-center transition-colors"
                  >
                    Open AI Chat Studio
                  </Link>
                </div>

                {/* Next Best Step Widget */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/20 flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-white">Next Best Step</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-white">
                      Spring Boot REST API Development
                    </h4>
                    <p className="text-xs text-slate-400">
                      Step 4 on your Java Full Stack Roadmap. Estimated learning time: 25 hrs.
                    </p>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-20 bg-navy-900/60 border-y border-purple-900/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Built for Modern Learners
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything You Need to Succeed in Tech
            </h2>
            <p className="text-sm text-slate-400">
              Four powerful modules working together to transform uncertainty into structured career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-5 text-purple-400 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Career Guidance</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Interactive real-time career mentor powered by Google Gemini. Ask targeted questions, request career plans, and receive tailored advice.
              </p>
              <Link href="/dashboard/ai-guidance" className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:underline">
                <span>Start AI Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center mb-5 text-cyan-400 group-hover:scale-110 transition-transform">
                <Radar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Skill Gap Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Compare your current skills against industry frameworks. View circular match gauges, skill radar charts, and priority recommendations.
              </p>
              <Link href="/dashboard/skill-gap" className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:underline">
                <span>Analyze Skill Gaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-5 text-violet-400 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Learning Recommendations</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Curated hub of verified courses, tutorials, official docs, and hands-on projects filtered by difficulty and missing skill tags.
              </p>
              <Link href="/dashboard/learning" className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:underline">
                <span>Explore Resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400 group-hover:scale-110 transition-transform">
                <Milestone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visual Career Roadmaps</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Structured 8-step timeline with milestone checklists, tasks, project ideas, resource links, and interactive completion tracking.
              </p>
              <Link href="/dashboard/roadmap" className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:underline">
                <span>View Roadmaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-navy-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How SkillBridge AI Works
            </h2>
            <p className="text-sm text-slate-400">
              Go from career uncertainty to a clear employment-preparation plan in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-navy-900/90 border border-purple-500/20 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-purple-600/30">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Discover Your Career</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your desired target role (e.g. Java Full Stack Developer, Data Analyst) or consult our AI career assistant to match your interests.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-navy-900/90 border border-purple-500/20 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-violet-600/30">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Analyze Your Skills</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Input your current skills and self-assess proficiency. Our engine calculates your match percentage, missing skills, and priority focus areas.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-navy-900/90 border border-purple-500/20 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-cyan-500/30">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Build Your Roadmap</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow visual step-by-step milestones, complete practical project tasks, access verified learning links, and monitor your career readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-purple-950/40 via-navy-900 to-navy-950 border-y border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-4xl font-extrabold text-white tracking-tight">10+</span>
              <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Career Track Frameworks
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-extrabold text-cyan-400 tracking-tight">100%</span>
              <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Personalized Skill Guidance
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-extrabold text-white tracking-tight">50+</span>
              <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Curated Learning Resources
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-extrabold text-cyan-400 tracking-tight">8-Step</span>
              <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Actionable Career Roadmaps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clearly identified sample content) */}
      <section id="about" className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Sample Student Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Loved by Ambitious Learners
            </h2>
            <p className="text-xs text-slate-400">
              *Sample user feedback representing typical student outcomes on SkillBridge AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "SkillBridge AI showed me exactly what I was missing to land a Java Full Stack role. The Spring Boot roadmap and AI chat recommendations gave me clarity!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                  M
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Maya Sharma (Sample User)</h4>
                  <span className="text-[10px] text-slate-400">CS Senior, State University</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The Skill Gap Analysis radar chart was an eye-opener. I went from feeling overwhelmed to completing milestone tasks step-by-step."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center">
                  R
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Rohan Kumar (Sample User)</h4>
                  <span className="text-[10px] text-slate-400">Junior Full Stack Developer</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "I loved having verified course links and hands-on project ideas all organized inside my personal dashboard."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center">
                  S
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sophia Chen (Sample User)</h4>
                  <span className="text-[10px] text-slate-400">Self-Taught Web Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-navy-900/50 border-t border-purple-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Got questions? We've got answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-sm text-white flex items-center justify-between hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />
    </div>
  );
}
