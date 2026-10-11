import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface UserSkillItem {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface FrameworkRequirement {
  skillName: string;
  importance: "Core" | "Recommended" | "Optional";
  requiredProficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface SkillGapAnalysisResult {
  matchPercentage: number;
  matchingSkills: { name: string; current: string; required: string }[];
  partialSkills: { name: string; current: string; required: string }[];
  missingSkills: { name: string; importance: string; required: string }[];
  priorityToLearn: string[];
  explanation: string;
}

const PROFICIENCY_WEIGHTS: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
};

export function calculateSkillGap(
  userSkills: UserSkillItem[],
  requirements: FrameworkRequirement[]
): SkillGapAnalysisResult {
  if (!requirements || requirements.length === 0) {
    return {
      matchPercentage: 0,
      matchingSkills: [],
      partialSkills: [],
      missingSkills: [],
      priorityToLearn: [],
      explanation: "No framework requirements specified.",
    };
  }

  const userSkillMap = new Map<string, string>();
  userSkills.forEach((s) => {
    userSkillMap.set(s.name.toLowerCase().trim(), s.proficiency);
  });

  const matchingSkills: { name: string; current: string; required: string }[] = [];
  const partialSkills: { name: string; current: string; required: string }[] = [];
  const missingSkills: { name: string; importance: string; required: string }[] = [];

  let totalPointsEarned = 0;
  let maxPossiblePoints = 0;

  requirements.forEach((req) => {
    const skillNameLower = req.skillName.toLowerCase().trim();
    const userProf = userSkillMap.get(skillNameLower);
    const reqWeight = PROFICIENCY_WEIGHTS[req.requiredProficiency] || 2;
    const importanceMultiplier = req.importance === "Core" ? 1.5 : req.importance === "Recommended" ? 1.0 : 0.7;

    const itemMaxPoints = reqWeight * importanceMultiplier;
    maxPossiblePoints += itemMaxPoints;

    if (!userProf) {
      missingSkills.push({
        name: req.skillName,
        importance: req.importance,
        required: req.requiredProficiency,
      });
    } else {
      const userWeight = PROFICIENCY_WEIGHTS[userProf] || 1;
      if (userWeight >= reqWeight) {
        totalPointsEarned += itemMaxPoints;
        matchingSkills.push({
          name: req.skillName,
          current: userProf,
          required: req.requiredProficiency,
        });
      } else {
        const partialCredit = (userWeight / reqWeight) * itemMaxPoints;
        totalPointsEarned += partialCredit;
        partialSkills.push({
          name: req.skillName,
          current: userProf,
          required: req.requiredProficiency,
        });
      }
    }
  });

  const matchPercentage = Math.round(
    maxPossiblePoints > 0 ? (totalPointsEarned / maxPossiblePoints) * 100 : 0
  );

  // Priority to learn: Core missing skills first, then partial Core skills, then missing Recommended skills
  const priorityToLearn = [
    ...missingSkills.filter((s) => s.importance === "Core").map((s) => s.name),
    ...partialSkills.map((s) => s.name),
    ...missingSkills.filter((s) => s.importance !== "Core").map((s) => s.name),
  ].slice(0, 5);

  const explanation = `Score calculated weighted by Core framework requirements (${matchingSkills.length} exact matches, ${partialSkills.length} partial proficiencies, and ${missingSkills.length} missing skills out of ${requirements.length} target skills).`;

  return {
    matchPercentage,
    matchingSkills,
    partialSkills,
    missingSkills,
    priorityToLearn,
    explanation,
  };
}
