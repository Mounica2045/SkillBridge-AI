import prisma from "./prisma";

export async function getCareerFrameworks() {
  try {
    const frameworks = await prisma.careerFramework.findMany({
      include: {
        skillRequirements: {
          include: {
            skill: true,
          },
        },
      },
    });
    return frameworks;
  } catch (error) {
    console.error("Error fetching career frameworks:", error);
    return [];
  }
}

export async function getCareerFrameworkBySlug(slug: string) {
  try {
    const framework = await prisma.careerFramework.findUnique({
      where: { slug },
      include: {
        skillRequirements: {
          include: {
            skill: true,
          },
        },
        roadmaps: {
          include: {
            milestones: {
              orderBy: { stepOrder: "asc" },
            },
          },
        },
      },
    });
    return framework;
  } catch (error) {
    console.error("Error fetching framework by slug:", error);
    return null;
  }
}

export async function getLearningResources() {
  try {
    return await prisma.learningResource.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching learning resources:", error);
    return [];
  }
}

export async function getUserProfile(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: {
          include: { skill: true },
        },
        bookmarks: {
          include: { resource: true },
        },
        milestoneProgress: true,
        progress: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function getRoadmapWithMilestones(careerSlug: string = "java-full-stack-developer") {
  try {
    const framework = await prisma.careerFramework.findUnique({
      where: { slug: careerSlug },
      include: {
        roadmaps: {
          include: {
            milestones: {
              orderBy: { stepOrder: "asc" },
            },
          },
        },
      },
    });

    if (framework && framework.roadmaps.length > 0) {
      return framework.roadmaps[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return null;
  }
}
