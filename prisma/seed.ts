import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting SkillBridge AI database seed...");

  // Clean existing tables
  await prisma.aIMessage.deleteMany({});
  await prisma.aIChat.deleteMany({});
  await prisma.userMilestoneProgress.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.roadmapMilestone.deleteMany({});
  await prisma.roadmap.deleteMany({});
  await prisma.learningResource.deleteMany({});
  await prisma.careerSkillRequirement.deleteMany({});
  await prisma.careerFramework.deleteMany({});
  await prisma.userSkill.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Core Skills
  const skillsData = [
    { name: "Java", category: "Backend", description: "Core Java programming language and syntax" },
    { name: "Object-Oriented Programming (OOP)", category: "Software Engineering", description: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
    { name: "SQL & Relational Databases", category: "Database", description: "Querying, schema design, indexes, PostgreSQL/MySQL" },
    { name: "HTML & CSS", category: "Frontend", description: "Semantic markup, Flexbox, Grid, responsive styling" },
    { name: "JavaScript (ES6+)", category: "Frontend", description: "Modern JS features, async/await, DOM manipulation" },
    { name: "React.js", category: "Frontend", description: "Component architecture, hooks, state management" },
    { name: "Spring Boot", category: "Backend", description: "Java enterprise framework, Dependency Injection, Spring Data JPA" },
    { name: "RESTful APIs", category: "Backend", description: "API design, HTTP verbs, status codes, JSON format" },
    { name: "Git & GitHub", category: "DevOps", description: "Version control, branching, pull requests, collaboration" },
    { name: "Docker", category: "DevOps", description: "Containerization, Dockerfiles, docker-compose" },
    { name: "Python", category: "Data Science", description: "Python scripting, data manipulation, libraries" },
    { name: "Pandas & NumPy", category: "Data Science", description: "Data wrangling, analysis, array computations" },
    { name: "Data Visualization (Tableau/PowerBI)", category: "Analytics", description: "Dashboard creation, charts, business analytics" },
    { name: "UI/UX Design Fundamentals", category: "Design", description: "User research, wireframing, color theory, typography" },
    { name: "Figma", category: "Design", description: "Prototyping, component libraries, auto-layout, design systems" },
    { name: "Machine Learning Concepts", category: "AI/ML", description: "Supervised & unsupervised learning, regression, classification" },
    { name: "PyTorch / TensorFlow", category: "AI/ML", description: "Deep learning frameworks, neural network training" },
    { name: "SEO & Content Strategy", category: "Marketing", description: "Keyword research, technical SEO, content marketing" },
  ];

  const skillMap: Record<string, string> = {};
  for (const s of skillsData) {
    const created = await prisma.skill.create({ data: s });
    skillMap[s.name] = created.id;
  }

  // 2. Create Career Frameworks
  const javaFullStack = await prisma.careerFramework.create({
    data: {
      title: "Java Full Stack Developer",
      slug: "java-full-stack-developer",
      category: "Software Development",
      description: "Build robust end-to-end enterprise web applications using Java Spring Boot on the backend and React/JS on the frontend.",
      demandLevel: "Very High",
      avgSalary: "$95,000 - $135,000",
    },
  });

  const dataAnalyst = await prisma.careerFramework.create({
    data: {
      title: "Data Analyst",
      slug: "data-analyst",
      category: "Data & Analytics",
      description: "Extract insights from raw datasets using SQL, Python, and BI tools to drive business decision-making.",
      demandLevel: "High",
      avgSalary: "$75,000 - $110,000",
    },
  });

  const uiUxDesigner = await prisma.careerFramework.create({
    data: {
      title: "UI/UX Designer",
      slug: "ui-ux-designer",
      category: "Design",
      description: "Craft intuitive, beautiful user interfaces and seamless digital experiences through research, wireframes, and prototypes.",
      demandLevel: "High",
      avgSalary: "$80,000 - $120,000",
    },
  });

  const mlEngineer = await prisma.careerFramework.create({
    data: {
      title: "AI / ML Engineer",
      slug: "ai-ml-engineer",
      category: "Artificial Intelligence",
      description: "Design, train, and deploy machine learning models and intelligent algorithms into production systems.",
      demandLevel: "Very High",
      avgSalary: "$115,000 - $160,000",
    },
  });

  // Map career requirements
  const javaReqs = [
    { name: "Java", importance: "Core", reqProf: "Advanced" },
    { name: "Object-Oriented Programming (OOP)", importance: "Core", reqProf: "Advanced" },
    { name: "Spring Boot", importance: "Core", reqProf: "Intermediate" },
    { name: "RESTful APIs", importance: "Core", reqProf: "Intermediate" },
    { name: "SQL & Relational Databases", importance: "Core", reqProf: "Intermediate" },
    { name: "JavaScript (ES6+)", importance: "Core", reqProf: "Intermediate" },
    { name: "React.js", importance: "Core", reqProf: "Intermediate" },
    { name: "HTML & CSS", importance: "Core", reqProf: "Intermediate" },
    { name: "Git & GitHub", importance: "Core", reqProf: "Intermediate" },
    { name: "Docker", importance: "Recommended", reqProf: "Beginner" },
  ];

  for (const req of javaReqs) {
    if (skillMap[req.name]) {
      await prisma.careerSkillRequirement.create({
        data: {
          frameworkId: javaFullStack.id,
          skillId: skillMap[req.name],
          importance: req.importance,
          requiredProficiency: req.reqProf,
        },
      });
    }
  }

  // 3. Create Learning Resources with verified links
  const resourcesData = [
    {
      title: "Java Programming Masterclass (JDK 17+)",
      description: "Comprehensive guide to Core Java, Object Oriented Programming, Lambdas, Streams, and Multithreading.",
      category: "Course",
      difficulty: "Beginner",
      provider: "Coursera / Oracle",
      url: "https://www.coursera.org/learn/java-introduction",
      skillTags: "Java,OOP",
      estimatedHours: 40,
      isVerified: true,
    },
    {
      title: "Spring Boot 3 & Spring Framework Tutorial",
      description: "Learn Spring Boot, REST API development, Dependency Injection, and Spring Data JPA step-by-step.",
      category: "Tutorial",
      difficulty: "Intermediate",
      provider: "Baeldung / Official Docs",
      url: "https://spring.io/guides/gs/rest-service/",
      skillTags: "Spring Boot,RESTful APIs,Java",
      estimatedHours: 25,
      isVerified: true,
    },
    {
      title: "React Official Documentation & Interactive Guide",
      description: "Master modern React 18, Hooks (useState, useEffect), Context API, and component lifecycles.",
      category: "Documentation",
      difficulty: "Intermediate",
      provider: "React Official Docs",
      url: "https://react.dev/learn",
      skillTags: "React.js,JavaScript (ES6+),HTML & CSS",
      estimatedHours: 20,
      isVerified: true,
    },
    {
      title: "SQL & Relational Database Design Bootcamp",
      description: "Learn PostgreSQL queries, joins, transactions, indexing, database normalization, and schema design.",
      category: "Course",
      difficulty: "Beginner",
      provider: "FreeCodeCamp",
      url: "https://www.freecodecamp.org/news/sql-and-databases-full-course/",
      skillTags: "SQL & Relational Databases",
      estimatedHours: 15,
      isVerified: true,
    },
    {
      title: "Full-Stack E-Commerce Application with Spring Boot & React",
      description: "Hands-on real-world project creating a REST API with Spring Boot, JWT auth, and React frontend interface.",
      category: "Project",
      difficulty: "Advanced",
      provider: "GitHub Project Guide",
      url: "https://github.com/topics/spring-boot-react",
      skillTags: "Java,Spring Boot,React.js,RESTful APIs,SQL & Relational Databases",
      estimatedHours: 30,
      isVerified: true,
    },
    {
      title: "Modern JavaScript for Web Developers",
      description: "ES6+ syntax, Promises, Async/Await, Fetch API, Modules, and DOM manipulation depth.",
      category: "Tutorial",
      difficulty: "Beginner",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      skillTags: "JavaScript (ES6+),HTML & CSS",
      estimatedHours: 18,
      isVerified: true,
    },
  ];

  const createdResources: Record<string, string> = {};
  for (const r of resourcesData) {
    const res = await prisma.learningResource.create({ data: r });
    createdResources[r.title] = res.id;
  }

  // 4. Create Java Full Stack Career Roadmap
  const javaRoadmap = await prisma.roadmap.create({
    data: {
      careerFrameworkId: javaFullStack.id,
      title: "Java Full Stack Developer Roadmap",
      description: "A complete step-by-step 8-phase guide from Core Java to deploying production-ready full stack web applications.",
    },
  });

  const milestonesData = [
    {
      stepOrder: 1,
      title: "1. Java Fundamentals & Object-Oriented Programming",
      description: "Master Java core syntax, primitive types, control flows, classes, objects, interfaces, inheritance, and exception handling.",
      skillsJson: JSON.stringify(["Java", "Object-Oriented Programming (OOP)"]),
      tasksJson: JSON.stringify([
        "Understand JDK, JRE, and JVM setup",
        "Write basic Java programs applying Encapsulation & Inheritance",
        "Master Java Collections Framework (ArrayList, HashMap, HashSet)",
        "Implement Exception handling with try-catch-finally blocks"
      ]),
      projectsJson: JSON.stringify(["Student Management System CLI Tool", "Bank Account Console Simulator"]),
    },
    {
      stepOrder: 2,
      title: "2. HTML, CSS & Modern JavaScript",
      description: "Build clean, responsive UI layouts and master JavaScript ES6+ features, DOM events, and fetch requests.",
      skillsJson: JSON.stringify(["HTML & CSS", "JavaScript (ES6+)"]),
      tasksJson: JSON.stringify([
        "Build a responsive portfolio page using CSS Flexbox & Grid",
        "Master JavaScript ES6 features (Arrow functions, Destructuring, Promises, Async/Await)",
        "Fetch data from open public REST APIs using JS Fetch API"
      ]),
      projectsJson: JSON.stringify(["Interactive Weather Dashboard", "Interactive Task Tracker App"]),
    },
    {
      stepOrder: 3,
      title: "3. SQL & Database Fundamentals",
      description: "Design relational database schemas, write SQL queries, joins, aggregates, and connect databases with Java.",
      skillsJson: JSON.stringify(["SQL & Relational Databases"]),
      tasksJson: JSON.stringify([
        "Install PostgreSQL / MySQL and GUI client (DBeaver / DataGrip)",
        "Write complex SQL SELECT queries with INNER JOIN, LEFT JOIN, GROUP BY, and HAVING",
        "Design 3-tier database normalization schemas"
      ]),
      projectsJson: JSON.stringify(["E-commerce Store Database Schema", "Library Book Inventory SQL Database"]),
    },
    {
      stepOrder: 4,
      title: "4. Spring Boot & RESTful APIs",
      description: "Develop enterprise backend services, Dependency Injection, REST endpoints, Spring Data JPA, and Hibernate ORM.",
      skillsJson: JSON.stringify(["Spring Boot", "RESTful APIs", "Java"]),
      tasksJson: JSON.stringify([
        "Initialize Spring Boot application using Spring Initializr",
        "Create REST Controllers for CRUD operations",
        "Connect Spring Boot to PostgreSQL using Spring Data JPA Repositories",
        "Implement DTO patterns & Input Validation with `@Valid`"
      ]),
      projectsJson: JSON.stringify(["Employee Management REST API", "Blog Engine Backend API with Swagger Docs"]),
    },
    {
      stepOrder: 5,
      title: "5. Frontend UI Development with React",
      description: "Learn component design, state management, React Hooks, client routing, and REST API integration.",
      skillsJson: JSON.stringify(["React.js", "JavaScript (ES6+)", "RESTful APIs"]),
      tasksJson: JSON.stringify([
        "Create React app with Vite/Next.js and Tailwind CSS",
        "Build reusable UI components with props & state (`useState`, `useEffect`)",
        "Integrate React frontend with Spring Boot backend via Axios / Fetch"
      ]),
      projectsJson: JSON.stringify(["Job Portal UI Dashboard", "Full Stack Task Manager Web Application"]),
    },
    {
      stepOrder: 6,
      title: "6. Full-Stack Integration & Containerization",
      description: "Combine Spring Boot backend with React frontend, handle authentication (JWT), CORS, and Dockerize app.",
      skillsJson: JSON.stringify(["Spring Boot", "React.js", "Docker", "Git & GitHub"]),
      tasksJson: JSON.stringify([
        "Implement Spring Security & JWT Token Authentication",
        "Write Dockerfile for Spring Boot and React services",
        "Create docker-compose.yml to run App + Database containers together"
      ]),
      projectsJson: JSON.stringify(["Complete End-to-End SkillBridge Demo App", "Full Stack E-Commerce Platform"]),
    },
    {
      stepOrder: 7,
      title: "7. Resume, Portfolio & Portfolio Projects",
      description: "Prepare an industry-standard software engineer resume, polish GitHub profile, and showcase live demos.",
      skillsJson: JSON.stringify(["Git & GitHub"]),
      tasksJson: JSON.stringify([
        "Deploy full-stack project live to Vercel / Render / AWS",
        "Write detailed README.md with screenshots and architecture diagrams",
        "Optimize LinkedIn & GitHub profile with project badges"
      ]),
      projectsJson: JSON.stringify(["Live Deployed Personal Portfolio Site"]),
    },
    {
      stepOrder: 8,
      title: "8. Technical Interview Preparation",
      description: "Practice Data Structures & Algorithms, Java coding questions, System Design basics, and mock interviews.",
      skillsJson: JSON.stringify(["Java", "Object-Oriented Programming (OOP)", "SQL & Relational Databases"]),
      tasksJson: JSON.stringify([
        "Solve 50+ LeetCode / HackerRank Java array, string, and list problems",
        "Review OOP design patterns (Factory, Singleton, Observer, Builder)",
        "Practice mock technical interviews and behavioral questions"
      ]),
      projectsJson: JSON.stringify(["Technical Interview Cheat Sheet & System Design Notes"]),
    },
  ];

  const milestoneIds: string[] = [];
  for (const m of milestonesData) {
    const created = await prisma.roadmapMilestone.create({
      data: {
        roadmapId: javaRoadmap.id,
        stepOrder: m.stepOrder,
        title: m.title,
        description: m.description,
        skillsJson: m.skillsJson,
        tasksJson: m.tasksJson,
        projectsJson: m.projectsJson,
      },
    });
    milestoneIds.push(created.id);
  }

  // 5. Create Default Seed Demo User ("Alex Mercer")
  const demoUser = await prisma.user.create({
    data: {
      email: "alex@skillbridge.ai",
      password: "password123", // demo password
      name: "Alex Mercer",
      educationLevel: "Undergraduate (B.Tech CS)",
      fieldOfStudy: "Computer Science & Engineering",
      experienceLevel: "Beginner",
      targetCareerId: javaFullStack.id,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    },
  });

  // Attach User Skills
  const userSkillSet = [
    { name: "Java", prof: "Intermediate" },
    { name: "Object-Oriented Programming (OOP)", prof: "Intermediate" },
    { name: "HTML & CSS", prof: "Advanced" },
    { name: "JavaScript (ES6+)", prof: "Intermediate" },
    { name: "Git & GitHub", prof: "Intermediate" },
  ];

  for (const us of userSkillSet) {
    if (skillMap[us.name]) {
      await prisma.userSkill.create({
        data: {
          userId: demoUser.id,
          skillId: skillMap[us.name],
          proficiency: us.prof,
          verified: true,
        },
      });
    }
  }

  // Attach User Milestone Progress (Milestones 1, 2 completed)
  if (milestoneIds.length >= 2) {
    await prisma.userMilestoneProgress.create({
      data: {
        userId: demoUser.id,
        milestoneId: milestoneIds[0],
        isCompleted: true,
        completedTasks: JSON.stringify([0, 1, 2, 3]),
      },
    });

    await prisma.userMilestoneProgress.create({
      data: {
        userId: demoUser.id,
        milestoneId: milestoneIds[1],
        isCompleted: true,
        completedTasks: JSON.stringify([0, 1, 2]),
      },
    });
  }

  // Attach User Progress metrics
  await prisma.userProgress.create({
    data: {
      userId: demoUser.id,
      studyHours: 32,
      skillsLearnedCount: 5,
      coursesCompletedCount: 3,
      readinessScore: 68,
      weeklyActivityJson: JSON.stringify([
        { day: "Mon", hours: 3 },
        { day: "Tue", hours: 4.5 },
        { day: "Wed", hours: 2 },
        { day: "Thu", hours: 5 },
        { day: "Fri", hours: 3.5 },
        { day: "Sat", hours: 6 },
        { day: "Sun", hours: 4 },
      ]),
    },
  });

  // Add initial AI Chat history
  const chat = await prisma.aIChat.create({
    data: {
      userId: demoUser.id,
      title: "Java Full Stack Developer Guidance",
    },
  });

  await prisma.aIMessage.createMany({
    data: [
      {
        chatId: chat.id,
        role: "user",
        content: "How do I become a Java Full Stack Developer?",
      },
      {
        chatId: chat.id,
        role: "assistant",
        content: `Great career choice! To become a **Java Full Stack Developer**, here is a clear roadmap to follow:

1. **Master Core Java & OOP Concepts**: Learn classes, objects, interfaces, collections framework, and multi-threading.
2. **Web Basics & Modern JavaScript**: Understand HTML5, CSS Flexbox/Grid, and ES6+ JavaScript.
3. **Database Fundamentals**: Practice relational database design and write SQL queries in PostgreSQL/MySQL.
4. **Backend with Spring Boot**: Master Spring Boot, REST API creation, Spring Security, and Spring Data JPA.
5. **Frontend with React.js**: Build responsive component-based UIs and connect them to REST endpoints.
6. **Full-Stack Projects**: Develop 2-3 real-world projects combining React + Spring Boot + PostgreSQL.

You currently have solid foundations in Java, OOP, HTML/CSS, and JavaScript. Your primary focus now should be mastering **Spring Boot & RESTful APIs**!`,
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
