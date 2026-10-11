"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  Search,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sparkles,
  Filter,
  Tag,
  GraduationCap,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: "Course" | "Tutorial" | "Documentation" | "Book" | "Project";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  provider: string;
  url: string;
  skillTags: string[];
  estimatedHours: number;
}

const RESOURCES: Resource[] = [
  {
    id: "res-1",
    title: "Java Programming Masterclass (JDK 17+)",
    description: "Comprehensive guide to Core Java, Object Oriented Programming, Lambdas, Streams, and Multithreading.",
    category: "Course",
    difficulty: "Beginner",
    provider: "Coursera / Oracle",
    url: "https://www.coursera.org/learn/java-introduction",
    skillTags: ["Java", "OOP"],
    estimatedHours: 40,
  },
  {
    id: "res-2",
    title: "Spring Boot 3 & Spring Framework Guide",
    description: "Learn Spring Boot, REST API development, Dependency Injection, and Spring Data JPA step-by-step.",
    category: "Tutorial",
    difficulty: "Intermediate",
    provider: "Spring Official Docs",
    url: "https://spring.io/guides/gs/rest-service/",
    skillTags: ["Spring Boot", "RESTful APIs", "Java"],
    estimatedHours: 25,
  },
  {
    id: "res-3",
    title: "React Official Interactive Learning Guide",
    description: "Master modern React 18, Hooks (useState, useEffect), Context API, and component lifecycles.",
    category: "Documentation",
    difficulty: "Intermediate",
    provider: "React Official Docs",
    url: "https://react.dev/learn",
    skillTags: ["React.js", "JavaScript (ES6+)", "HTML & CSS"],
    estimatedHours: 20,
  },
  {
    id: "res-4",
    title: "SQL & Relational Database Design Bootcamp",
    description: "Learn PostgreSQL queries, joins, transactions, indexing, database normalization, and schema design.",
    category: "Course",
    difficulty: "Beginner",
    provider: "FreeCodeCamp",
    url: "https://www.freecodecamp.org/news/sql-and-databases-full-course/",
    skillTags: ["SQL & Relational Databases"],
    estimatedHours: 15,
  },
  {
    id: "res-5",
    title: "Full-Stack E-Commerce App with Spring Boot & React",
    description: "Hands-on real-world project creating a REST API with Spring Boot, JWT auth, and React frontend interface.",
    category: "Project",
    difficulty: "Advanced",
    provider: "GitHub Showcase",
    url: "https://github.com/topics/spring-boot-react",
    skillTags: ["Java", "Spring Boot", "React.js", "RESTful APIs", "SQL & Relational Databases"],
    estimatedHours: 30,
  },
  {
    id: "res-6",
    title: "Modern JavaScript (ES6+) for Web Developers",
    description: "ES6+ syntax, Promises, Async/Await, Fetch API, Modules, and DOM manipulation depth.",
    category: "Tutorial",
    difficulty: "Beginner",
    provider: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    skillTags: ["JavaScript (ES6+)", "HTML & CSS"],
    estimatedHours: 18,
  },
];

export default function LearningPage() {
  const {
    bookmarkedResourceIds,
    completedResourceIds,
    toggleBookmark,
    toggleResourceCompleted,
  } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [filterGapOnly, setFilterGapOnly] = useState(false);

  const categories = ["All", "Course", "Tutorial", "Documentation", "Book", "Project"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredResources = RESOURCES.filter((res) => {
    // Category check
    if (selectedCategory !== "All" && res.category !== selectedCategory) return false;
    // Difficulty check
    if (selectedDifficulty !== "All" && res.difficulty !== selectedDifficulty) return false;
    // Skill gap filter (e.g. Spring Boot, REST APIs, SQL)
    if (filterGapOnly && !res.skillTags.some((tag) => ["Spring Boot", "RESTful APIs", "Docker", "SQL & Relational Databases"].includes(tag))) {
      return false;
    }
    // Search term
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchTag = res.skillTags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 via-navy-900 to-navy-950 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <BookOpen className="w-4 h-4 animate-pulse" />
            <span>Personalized Learning Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated Learning Recommendations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Discover verified courses, official tutorials, documentation, and hands-on projects aligned with your target career.
          </p>
        </div>

        {/* Filter Gap Toggle */}
        <button
          onClick={() => setFilterGapOnly(!filterGapOnly)}
          className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
            filterGapOnly
              ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{filterGapOnly ? "Filtering: My Skill Gaps Only" : "Filter for My Skill Gaps"}</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-navy-900/80 border border-purple-500/20 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, skill tag, or keyword (e.g. Spring Boot, React, Java)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold shrink-0">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-purple-300"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isSaved = bookmarkedResourceIds.includes(res.id);
          const isCompleted = completedResourceIds.includes(res.id);

          return (
            <div
              key={res.id}
              className={`p-6 rounded-2xl bg-navy-900/80 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                isCompleted
                  ? "border-emerald-500/40 bg-emerald-950/10"
                  : "border-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1"
              }`}
            >
              <div className="space-y-3">
                {/* Badges bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                    {res.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                      {res.difficulty}
                    </span>
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? "bg-purple-600 border-purple-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                      title={isSaved ? "Remove Bookmark" : "Save Bookmark"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-2">{res.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {res.description}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.skillTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">{res.provider}</span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    ~{res.estimatedHours} hrs
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => toggleResourceCompleted(res.id)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1 ${
                      isCompleted
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{isCompleted ? "Done" : "Complete"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
