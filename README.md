# SkillBridge AI 🚀

> **Bridge Your Skills. Build Your Future.**
> An AI-powered full-stack career guidance and skill acceleration platform for students, recent graduates, and tech job seekers.

---

## ✨ Features

- **🤖 AI Career Guidance:** Real-time conversational mentor powered by Gemini API with an intelligent context-aware fallback advisor engine.
- **🎯 Dynamic Skill Gap Analysis:** Compare your self-reported skill proficiencies against industry career frameworks with interactive Recharts radar charts and circular match progress gauges.
- **🗺️ Interactive Career Roadmaps:** Visual 8-step milestone timeline (e.g., Java Full Stack Developer) with checklist tasks, project ideas, and progress tracking.
- **📚 Curated Learning Hub:** Searchable directory of verified courses, tutorials, docs, and hands-on projects filterable by difficulty and missing skill gaps.
- **📈 Progress & Goals Tracking:** Log study hours, track roadmap completion, configure personal goals, and earn achievement badges.
- **🎨 Modern SaaS UI:** Glassmorphism design system built with Tailwind CSS, dark navy & purple palette with cyan accents, and persistent Light/Dark mode toggling.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS, Glassmorphic Design System
- **Icons:** Lucide React
- **Charts:** Recharts
- **Database & ORM:** Prisma ORM with SQLite
- **AI Integration:** Google Gemini API (`@google/generative-ai`) + fallback engine

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Mounica2045/SkillBridge-Ai.git
cd SkillBridge-Ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup database & seed sample data
```bash
npx prisma db push
npm run prisma:seed
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
MIT License
