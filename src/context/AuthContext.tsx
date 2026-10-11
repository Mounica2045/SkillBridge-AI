"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserSkillItem } from "@/lib/utils";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  educationLevel: string;
  fieldOfStudy: string;
  experienceLevel: string;
  targetCareerSlug: string;
  targetCareerTitle: string;
  studyHours: number;
  readinessScore: number;
}

const DEFAULT_USER: UserProfile = {
  id: "demo-user-1",
  name: "Alex Mercer",
  email: "alex@skillbridge.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  educationLevel: "Undergraduate (B.Tech CS)",
  fieldOfStudy: "Computer Science & Engineering",
  experienceLevel: "Beginner",
  targetCareerSlug: "java-full-stack-developer",
  targetCareerTitle: "Java Full Stack Developer",
  studyHours: 32,
  readinessScore: 68,
};

const DEFAULT_SKILLS: UserSkillItem[] = [
  { name: "Java", proficiency: "Intermediate" },
  { name: "Object-Oriented Programming (OOP)", proficiency: "Intermediate" },
  { name: "HTML & CSS", proficiency: "Advanced" },
  { name: "JavaScript (ES6+)", proficiency: "Intermediate" },
  { name: "Git & GitHub", proficiency: "Intermediate" },
];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  userSkills: UserSkillItem[];
  bookmarkedResourceIds: string[];
  completedMilestoneIds: string[];
  completedResourceIds: string[];
  login: (email: string) => void;
  logout: () => void;
  completeOnboarding: (data: Partial<UserProfile>, skills: UserSkillItem[]) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateSkills: (skills: UserSkillItem[]) => void;
  toggleBookmark: (resourceId: string) => void;
  toggleResourceCompleted: (resourceId: string) => void;
  toggleMilestoneCompleted: (milestoneId: string) => void;
  setTargetCareer: (slug: string, title: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [userSkills, setUserSkills] = useState<UserSkillItem[]>(DEFAULT_SKILLS);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [bookmarkedResourceIds, setBookmarkedResourceIds] = useState<string[]>(["res-1", "res-3"]);
  const [completedResourceIds, setCompletedResourceIds] = useState<string[]>(["res-1"]);
  const [completedMilestoneIds, setCompletedMilestoneIds] = useState<string[]>(["ms-1", "ms-2"]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate from localStorage if available
    const savedUser = localStorage.getItem("skillbridge-user");
    const savedSkills = localStorage.getItem("skillbridge-skills");
    const savedBookmarks = localStorage.getItem("skillbridge-bookmarks");
    const savedMilestones = localStorage.getItem("skillbridge-milestones");
    const savedOnboarding = localStorage.getItem("skillbridge-onboarded");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSkills) setUserSkills(JSON.parse(savedSkills));
    if (savedBookmarks) setBookmarkedResourceIds(JSON.parse(savedBookmarks));
    if (savedMilestones) setCompletedMilestoneIds(JSON.parse(savedMilestones));
    if (savedOnboarding) setIsOnboarded(JSON.parse(savedOnboarding));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const login = (email: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      name: email.split("@")[0] ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1) : "Student",
    };
    setUser(newUser);
    setIsOnboarded(true);
    localStorage.setItem("skillbridge-user", JSON.stringify(newUser));
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillbridge-user");
    showToast("Logged out successfully.");
  };

  const completeOnboarding = (data: Partial<UserProfile>, skills: UserSkillItem[]) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      ...data,
    };
    setUser(updated);
    setUserSkills(skills);
    setIsOnboarded(true);
    localStorage.setItem("skillbridge-user", JSON.stringify(updated));
    localStorage.setItem("skillbridge-skills", JSON.stringify(skills));
    localStorage.setItem("skillbridge-onboarded", JSON.stringify(true));
    showToast("Profile & skills initialized successfully!");
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("skillbridge-user", JSON.stringify(updated));
    showToast("Profile updated!");
  };

  const updateSkills = (skills: UserSkillItem[]) => {
    setUserSkills(skills);
    localStorage.setItem("skillbridge-skills", JSON.stringify(skills));
    showToast("Skills list updated!");
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedResourceIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem("skillbridge-bookmarks", JSON.stringify(next));
      showToast(exists ? "Removed from bookmarks" : "Resource saved to bookmarks!");
      return next;
    });
  };

  const toggleResourceCompleted = (id: string) => {
    setCompletedResourceIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      showToast(exists ? "Marked as incomplete" : "Resource marked as completed!");
      return next;
    });
  };

  const toggleMilestoneCompleted = (id: string) => {
    setCompletedMilestoneIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem("skillbridge-milestones", JSON.stringify(next));
      showToast(exists ? "Milestone status reset" : "🎉 Milestone completed!");
      return next;
    });
  };

  const setTargetCareer = (slug: string, title: string) => {
    if (!user) return;
    const updated = {
      ...user,
      targetCareerSlug: slug,
      targetCareerTitle: title,
    };
    setUser(updated);
    localStorage.setItem("skillbridge-user", JSON.stringify(updated));
    showToast(`Target career changed to ${title}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isOnboarded,
        userSkills,
        bookmarkedResourceIds,
        completedMilestoneIds,
        completedResourceIds,
        login,
        logout,
        completeOnboarding,
        updateProfile,
        updateSkills,
        toggleBookmark,
        toggleResourceCompleted,
        toggleMilestoneCompleted,
        setTargetCareer,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
