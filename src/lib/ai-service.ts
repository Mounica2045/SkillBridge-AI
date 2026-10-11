import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AIChatContext {
  userName?: string;
  educationLevel?: string;
  fieldOfStudy?: string;
  targetCareer?: string;
  currentSkills?: string[];
  missingSkills?: string[];
}

export async function generateAICareerResponse(
  userMessage: string,
  history: { role: string; content: string }[],
  context: AIChatContext = {}
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0 && apiKey !== "your-api-key-here") {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `You are SkillBridge AI, a world-class personalized career counselor and tech industry mentor for students and job seekers.
User Context:
- Name: ${context.userName || "Student"}
- Education: ${context.educationLevel || "Undergraduate"}
- Field of Study: ${context.fieldOfStudy || "Computer Science / General"}
- Target Career: ${context.targetCareer || "Java Full Stack Developer"}
- Current Skills: ${context.currentSkills?.join(", ") || "Java, OOP, HTML/CSS, JavaScript"}
- Skill Gaps / Missing Skills: ${context.missingSkills?.join(", ") || "Spring Boot, REST APIs, Docker, SQL"}

Provide structured, encouraging, highly actionable advice with formatted Markdown headings, bullet points, numbered step-by-step career roadmaps, skill focus areas, recommended projects, and practical next steps. Keep your tone professional, empowering, and modern.`;

      const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am SkillBridge AI, ready to assist with structured career guidance." }] },
        ...history.map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        })),
        { role: "user", parts: [{ text: userMessage }] },
      ];

      const result = await model.generateContent({ contents });
      const responseText = result.response.text();
      if (responseText && responseText.trim().length > 0) {
        return responseText;
      }
    } catch (err) {
      console.warn("Gemini API call failed or unconfigured, using built-in AI advisor engine:", err);
    }
  }

  // Built-in intelligent context-aware fallback engine
  return generateFallbackResponse(userMessage, context);
}

function generateFallbackResponse(query: string, context: AIChatContext): string {
  const lowerQuery = query.toLowerCase();
  const name = context.userName || "Alex";
  const target = context.targetCareer || "Java Full Stack Developer";

  if (lowerQuery.includes("choose a career") || lowerQuery.includes("help me choose")) {
    return `### 🌟 Career Selection Guide for ${name}

Based on your background in **${context.fieldOfStudy || "Technology"}**, here are top high-growth career tracks tailored for you:

#### 1. 🚀 Java Full Stack Developer
- **Why it fits:** High industry demand, strong backend architecture focus, enterprise software growth.
- **Key Skills:** Java 17+, Spring Boot, REST APIs, PostgreSQL, React.js, Docker.
- **Average Salary:** \$95,000 - \$135,000 / year.

#### 2. 📊 Data Analyst & BI Specialist
- **Why it fits:** Combines business strategy with data insights. Great for analytical thinkers.
- **Key Skills:** SQL, Python (Pandas/NumPy), Tableau/PowerBI, Statistics, Business Communication.
- **Average Salary:** \$75,000 - \$110,000 / year.

#### 3. 🎨 UI/UX Designer & Product Specialist
- **Why it fits:** Perfect if you enjoy building intuitive interfaces and understanding user behavior.
- **Key Skills:** Figma, Wireframing, User Research, Design Systems, Prototyping.
- **Average Salary:** \$80,000 - \$120,000 / year.

#### 🎯 Next Best Action:
Tell me which of these paths excites you most, or ask me for a customized 6-month learning roadmap!`;
  }

  if (lowerQuery.includes("java full stack") || lowerQuery.includes("become a java")) {
    return `### 🛠️ How to Become a Java Full Stack Developer

Hello ${name}! Transitioning into a **Java Full Stack Developer** is one of the most rewarding engineering paths. Here is your personalized action plan:

#### 📌 Phase 1: Core Fundamentals (Weeks 1 - 4)
- **Master Java & OOP:** Classes, Inheritance, Polymorphism, Interfaces, Collections (HashMap, ArrayList).
- **Web Standards:** HTML5, CSS Flexbox/Grid, Modern JavaScript (ES6+ async/await, fetch).

#### 📌 Phase 2: Relational Databases & APIs (Weeks 5 - 8)
- **Database Engineering:** SQL queries, PostgreSQL, database schema normalization, indexing.
- **Backend Services:** Spring Boot 3 framework, Dependency Injection, RESTful API design.

#### 📌 Phase 3: Modern Frontend & Integration (Weeks 9 - 14)
- **Frontend Framework:** React 18 with TypeScript, component props/state, Tailwind CSS.
- **Integration:** Connect React frontend to Spring Boot backend via REST APIs and JSON payload handling.

#### 📌 Phase 4: Production Projects & Interview Prep (Weeks 15 - 20)
- **Projects:** Build a full-stack E-Commerce portal or SkillBridge platform clone.
- **DevOps Basics:** Docker containers, Git branching, GitHub Actions CI/CD.

> 💡 **Skill Gap Focus:** Based on your profile, your primary growth area is **Spring Boot & RESTful APIs**. Check out the Career Roadmap tab to start tracking your milestone progress!`;
  }

  if (lowerQuery.includes("skills should i learn") || lowerQuery.includes("software job")) {
    return `### 💡 Top In-Demand Skills for Software Engineering Jobs

Here is a breakdown of the core competencies tech employers actively search for in 2026:

#### 1. Core Engineering
- **Primary Languages:** Java, JavaScript / TypeScript, or Python.
- **Data Structures & Algorithms:** Arrays, Hash Tables, Trees, Dynamic Programming fundamentals.

#### 2. Backend & System Architecture
- **Frameworks:** Spring Boot (Java), Node.js / Express, or FastAPI (Python).
- **APIs & Protocols:** RESTful API standards, JSON schema, GraphQL, gRPC.
- **Databases:** Relational (PostgreSQL, MySQL) + NoSQL (MongoDB, Redis).

#### 3. Frontend & User Interface
- **Component UIs:** React.js / Next.js, State Management (Zustand, Redux).
- **Styling:** Modern CSS, Tailwind CSS, accessibility standards.

#### 4. Cloud & DevOps Tooling
- **Version Control:** Git & GitHub workflows (pull requests, code reviews).
- **Deployment:** Docker containerization, Vercel / AWS basic deployment.

#### 🎯 Recommended Focus for You:
Start by closing your skill gaps in **${context.missingSkills?.[0] || "Spring Boot"}** and **${context.missingSkills?.[1] || "SQL Databases"}**.`;
  }

  if (lowerQuery.includes("career plan") || lowerQuery.includes("roadmap")) {
    return `### 🗓️ Your Customized 90-Day Skill Accelerator Plan

Target Goal: **${target}**

#### 🔹 Month 1: Foundation & Backend Core
- Days 1-15: Deep dive into Core Java OOP principles and SQL Database querying.
- Days 16-30: Build 2 backend REST microservices with Spring Boot and Spring Data JPA.

#### 🔹 Month 2: Frontend & Full Stack Integration
- Days 31-45: Master React.js components, hooks ('useState', 'useEffect'), and Tailwind CSS.
- Days 46-60: Connect React frontend with Spring Boot backend via REST API calls.

#### 🔹 Month 3: Portfolio & Job Readiness
- Days 61-75: Develop an end-to-end full stack project (e.g. SkillBridge AI portal or E-Commerce app).
- Days 76-90: Resume optimization, GitHub documentation, and LeetCode algorithmic problem solving.

You can track every milestone interactively on the **Career Roadmap** page!`;
  }

  return `### 🤖 SkillBridge AI Guidance for ${name}

Thank you for your question regarding **${query}**!

Here is what I recommend for your target role as a **${target}**:

1. **Assess Your Current Skill Match:** You currently have key foundations in **${context.currentSkills?.join(", ") || "Core Programming"}**.
2. **Bridge High-Impact Gaps:** Prioritize mastering **${context.missingSkills?.join(", ") || "Enterprise Frameworks and REST APIs"}**.
3. **Hands-On Project Practice:** Theory is best reinforced by building real applications. Check out our curated list of projects in **Learning Recommendations**.

How else can I assist your career journey today? You can ask me for interview tips, project ideas, or resume review guidelines!`;
}
