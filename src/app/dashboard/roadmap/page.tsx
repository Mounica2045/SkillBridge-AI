"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Milestone,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
} from "lucide-react";

interface RoadmapStep {
  id: string;
  order: number;
  title: string;
  description: string;
  skills: string[];
  tasks: string[];
  projects: string[];
  resourceLink?: string;
}

const JAVA_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "ms-1",
    order: 1,
    title: "1. Java Fundamentals & Object-Oriented Programming",
    description: "Master Java core syntax, primitive types, control flows, classes, objects, interfaces, inheritance, and exception handling.",
    skills: ["Java", "Object-Oriented Programming (OOP)"],
    tasks: [
      "Understand JDK, JRE, and JVM setup",
      "Write basic Java programs applying Encapsulation & Inheritance",
      "Master Java Collections Framework (ArrayList, HashMap, HashSet)",
      "Implement Exception handling with try-catch-finally blocks",
    ],
    projects: ["Student Management System CLI Tool", "Bank Account Console Simulator"],
    resourceLink: "https://www.coursera.org/learn/java-introduction",
  },
  {
    id: "ms-2",
    order: 2,
    title: "2. HTML, CSS & Modern JavaScript",
    description: "Build clean, responsive UI layouts and master JavaScript ES6+ features, DOM events, and fetch requests.",
    skills: ["HTML & CSS", "JavaScript (ES6+)"],
    tasks: [
      "Build a responsive portfolio page using CSS Flexbox & Grid",
      "Master JavaScript ES6 features (Arrow functions, Destructuring, Promises, Async/Await)",
      "Fetch data from open public REST APIs using JS Fetch API",
    ],
    projects: ["Interactive Weather Dashboard", "Interactive Task Tracker App"],
    resourceLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
  {
    id: "ms-3",
    order: 3,
    title: "3. SQL & Database Fundamentals",
    description: "Design relational database schemas, write SQL queries, joins, aggregates, and connect databases with Java.",
    skills: ["SQL & Relational Databases"],
    tasks: [
      "Install PostgreSQL / MySQL and GUI client (DBeaver / DataGrip)",
      "Write complex SQL SELECT queries with INNER JOIN, LEFT JOIN, GROUP BY, and HAVING",
      "Design 3-tier database normalization schemas",
    ],
    projects: ["E-commerce Store Database Schema", "Library Book Inventory SQL Database"],
    resourceLink: "https://www.freecodecamp.org/news/sql-and-databases-full-course/",
  },
  {
    id: "ms-4",
    order: 4,
    title: "4. Spring Boot & RESTful APIs",
    description: "Develop enterprise backend services, Dependency Injection, REST endpoints, Spring Data JPA, and Hibernate ORM.",
    skills: ["Spring Boot", "RESTful APIs", "Java"],
    tasks: [
      "Initialize Spring Boot application using Spring Initializr",
      "Create REST Controllers for CRUD operations",
      "Connect Spring Boot to PostgreSQL using Spring Data JPA Repositories",
      "Implement DTO patterns & Input Validation with `@Valid`",
    ],
    projects: ["Employee Management REST API", "Blog Engine Backend API with Swagger Docs"],
    resourceLink: "https://spring.io/guides/gs/rest-service/",
  },
  {
    id: "ms-5",
    order: 5,
    title: "5. Frontend UI Development with React",
    description: "Learn component design, state management, React Hooks, client routing, and REST API integration.",
    skills: ["React.js", "JavaScript (ES6+)", "RESTful APIs"],
    tasks: [
      "Create React app with Vite/Next.js and Tailwind CSS",
      "Build reusable UI components with props & state (`useState`, `useEffect`)",
      "Integrate React frontend with Spring Boot backend via Axios / Fetch",
    ],
    projects: ["Job Portal UI Dashboard", "Full Stack Task Manager Web Application"],
    resourceLink: "https://react.dev/learn",
  },
  {
    id: "ms-6",
    order: 6,
    title: "6. Full-Stack Integration & Containerization",
    description: "Combine Spring Boot backend with React frontend, handle authentication (JWT), CORS, and Dockerize app.",
    skills: ["Spring Boot", "React.js", "Docker", "Git & GitHub"],
    tasks: [
      "Implement Spring Security & JWT Token Authentication",
      "Write Dockerfile for Spring Boot and React services",
      "Create docker-compose.yml to run App + Database containers together",
    ],
    projects: ["Complete End-to-End SkillBridge Demo App", "Full Stack E-Commerce Platform"],
    resourceLink: "https://github.com/topics/spring-boot-react",
  },
  {
    id: "ms-7",
    order: 7,
    title: "7. Resume, Portfolio & Portfolio Projects",
    description: "Prepare an industry-standard software engineer resume, polish GitHub profile, and showcase live demos.",
    skills: ["Git & GitHub"],
    tasks: [
      "Deploy full-stack project live to Vercel / Render / AWS",
      "Write detailed README.md with screenshots and architecture diagrams",
      "Optimize LinkedIn & GitHub profile with project badges",
    ],
    projects: ["Live Deployed Personal Portfolio Site"],
  },
  {
    id: "ms-8",
    order: 8,
    title: "8. Technical Interview Preparation",
    description: "Practice Data Structures & Algorithms, Java coding questions, System Design basics, and mock interviews.",
    skills: ["Java", "Object-Oriented Programming (OOP)", "SQL & Relational Databases"],
    tasks: [
      "Solve 50+ LeetCode / HackerRank Java array, string, and list problems",
      "Review OOP design patterns (Factory, Singleton, Observer, Builder)",
      "Practice mock technical interviews and behavioral questions",
    ],
    projects: ["Technical Interview Cheat Sheet & System Design Notes"],
  },
];

export default function RoadmapPage() {
  const { user, completedMilestoneIds, toggleMilestoneCompleted } = useAuth();
  const [expandedStep, setExpandedStep] = useState<string>("ms-4"); // Step 4 default expanded

  const totalSteps = JAVA_ROADMAP_STEPS.length;
  const completedCount = completedMilestoneIds.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 via-navy-900 to-navy-950 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Milestone className="w-4 h-4 animate-pulse" />
            <span>Interactive Visual Milestone Timeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {user?.targetCareerTitle || "Java Full Stack Developer"} Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Follow our 8-step structured milestone path to transform from foundations to job-ready employment preparation.
          </p>
        </div>

        {/* Progress gauge card */}
        <div className="p-4 rounded-xl bg-navy-950/90 border border-purple-500/30 flex items-center gap-4 shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Roadmap Progress</span>
            <div className="text-2xl font-extrabold text-white">{progressPercent}%</div>
            <span className="text-xs text-cyan-400 font-semibold">{completedCount} of {totalSteps} Done</span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-purple-500 border-r-cyan-400 flex items-center justify-center font-bold text-xs text-white">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Roadmap Timeline List */}
      <div className="relative space-y-6 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
        {JAVA_ROADMAP_STEPS.map((step) => {
          const isDone = completedMilestoneIds.includes(step.id);
          const isExpanded = expandedStep === step.id;

          return (
            <div
              key={step.id}
              className={`relative pl-14 transition-all ${
                isDone ? "opacity-90" : "opacity-100"
              }`}
            >
              {/* Timeline Icon Bubble */}
              <button
                onClick={() => toggleMilestoneCompleted(step.id)}
                className={`absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-all border shadow-lg ${
                  isDone
                    ? "bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/30"
                    : "bg-navy-900 border-purple-500/40 text-purple-300 hover:border-cyan-400 shadow-purple-900/20"
                }`}
                title={isDone ? "Mark Incomplete" : "Mark Step Completed"}
              >
                {isDone ? <CheckCircle2 className="w-6 h-6" /> : step.order}
              </button>

              {/* Milestone Card */}
              <div
                className={`rounded-2xl bg-navy-900/80 border transition-all ${
                  isDone
                    ? "border-emerald-500/30"
                    : isExpanded
                    ? "border-purple-500/50 shadow-xl shadow-purple-900/20"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Milestone Header */}
                <div
                  onClick={() => setExpandedStep(isExpanded ? "" : step.id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1">{step.description}</p>
                  </div>

                  <button className="p-2 text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Milestone Expanded Body */}
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-800/80 space-y-5 animate-in fade-in duration-150">
                    <p className="text-xs text-slate-300 leading-relaxed pt-3">
                      {step.description}
                    </p>

                    {/* Skill Badges */}
                    <div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-2">
                        Skills Addressed:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((sk) => (
                          <span
                            key={sk}
                            className="text-xs px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tasks Checklist */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Actionable Milestone Tasks:
                      </span>
                      <div className="space-y-1.5">
                        {step.tasks.map((task, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 text-xs text-slate-300 p-2 rounded-lg bg-navy-950/80 border border-slate-800/60"
                          >
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Ideas */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        Hands-on Sample Projects:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {step.projects.map((proj) => (
                          <span
                            key={proj}
                            className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-semibold flex items-center gap-1.5"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestone Actions Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                      {step.resourceLink ? (
                        <a
                          href={step.resourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>View Milestone Learning Resource</span>
                        </a>
                      ) : (
                        <div />
                      )}

                      <button
                        onClick={() => toggleMilestoneCompleted(step.id)}
                        className={`w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                          isDone
                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            : "bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-md shadow-emerald-500/20"
                        }`}
                      >
                        {isDone ? "Reset Completion" : "Mark Milestone Complete ✓"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
