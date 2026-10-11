"use client";

import React from "react";
import Link from "next/link";
import { Compass, Github, Twitter, Linkedin, Heart, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-purple-900/30 bg-navy-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SkillBridge<span className="text-cyan-400 font-extrabold">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering college students, recent graduates, and job seekers with personalized career guidance, skill-gap analysis, visual roadmaps, and AI-driven growth pathways.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Student Dashboard</Link></li>
              <li><Link href="/dashboard/ai-guidance" className="hover:text-cyan-400 transition-colors">AI Career Assistant</Link></li>
              <li><Link href="/dashboard/skill-gap" className="hover:text-cyan-400 transition-colors">Skill Gap Analyzer</Link></li>
              <li><Link href="/dashboard/roadmap" className="hover:text-cyan-400 transition-colors">Visual Career Roadmaps</Link></li>
              <li><Link href="/dashboard/learning" className="hover:text-cyan-400 transition-colors">Curated Learning Hub</Link></li>
            </ul>
          </div>

          {/* Career Paths */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular Roles</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-slate-300">Java Full Stack Developer</span></li>
              <li><span className="text-slate-300">Data Analyst & BI Specialist</span></li>
              <li><span className="text-slate-300">UI/UX Product Designer</span></li>
              <li><span className="text-slate-300">AI / Machine Learning Engineer</span></li>
              <li><span className="text-slate-300">Cloud & DevOps Architect</span></li>
            </ul>
          </div>

          {/* Transparent Notice */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Assessment Integrity</h4>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Skill Calculation Notice</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Skill scores are calculated dynamically from self-reported proficiency compared against curated target skill matrices. Completing roadmaps does not guarantee employment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SkillBridge AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision & care for ambitious career builders</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
