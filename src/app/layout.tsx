import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: "SkillBridge AI – AI-Powered Career Guidance & Skill Gap Platform",
  description:
    "Bridge your skills, identify gaps, discover curated learning resources, and build personalized career roadmaps with AI-powered guidance.",
  keywords: [
    "AI Career Advisor",
    "Skill Gap Analysis",
    "Java Full Stack Roadmap",
    "Learning Recommendations",
    "Student Career Guidance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-navy-950 text-slate-100 min-h-screen antialiased selection:bg-purple-600 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toast />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
