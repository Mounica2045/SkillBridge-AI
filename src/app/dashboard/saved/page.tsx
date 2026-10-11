"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Bookmark,
  ExternalLink,
  Trash2,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function SavedResourcesPage() {
  const { bookmarkedResourceIds, toggleBookmark, toggleResourceCompleted, completedResourceIds } = useAuth();

  const mockResources = [
    {
      id: "res-1",
      title: "Java Programming Masterclass (JDK 17+)",
      description: "Comprehensive guide to Core Java, Object Oriented Programming, Lambdas, Streams, and Multithreading.",
      category: "Course",
      provider: "Coursera / Oracle",
      url: "https://www.coursera.org/learn/java-introduction",
      skillTags: ["Java", "OOP"],
      estimatedHours: 40,
    },
    {
      id: "res-3",
      title: "React Official Interactive Learning Guide",
      description: "Master modern React 18, Hooks (useState, useEffect), Context API, and component lifecycles.",
      category: "Documentation",
      provider: "React Official Docs",
      url: "https://react.dev/learn",
      skillTags: ["React.js", "JavaScript (ES6+)"],
      estimatedHours: 20,
    },
    {
      id: "res-2",
      title: "Spring Boot 3 & Spring Framework Guide",
      description: "Learn Spring Boot, REST API development, Dependency Injection, and Spring Data JPA step-by-step.",
      category: "Tutorial",
      provider: "Spring Official Docs",
      url: "https://spring.io/guides/gs/rest-service/",
      skillTags: ["Spring Boot", "RESTful APIs"],
      estimatedHours: 25,
    },
  ];

  const savedList = mockResources.filter((r) => bookmarkedResourceIds.includes(r.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 via-navy-900 to-navy-950 border border-purple-500/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Bookmark className="w-4 h-4" />
            <span>Saved Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Saved Learning Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Quick access to your bookmarked courses, tutorials, and docs.
          </p>
        </div>

        <Link
          href="/dashboard/learning"
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs text-center transition-colors shrink-0"
        >
          Explore Learning Hub
        </Link>
      </div>

      {savedList.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-navy-900/50 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Bookmarks Saved Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Browse our Learning Recommendations hub and click the bookmark icon on courses to save them here for offline access!
          </p>
          <Link
            href="/dashboard/learning"
            className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs transition-colors"
          >
            Browse Learning Hub
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((res) => {
            const isCompleted = completedResourceIds.includes(res.id);
            return (
              <div
                key={res.id}
                className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/20 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      {res.category}
                    </span>
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">{res.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{res.provider}</span>
                    <span>~{res.estimatedHours} hrs</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-1"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
