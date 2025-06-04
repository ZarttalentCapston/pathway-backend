import { Request, Response } from "express";
import { User } from "../models";
import { Role } from "../models";
import Resource from "../models/Resource";

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as { userId: number } | undefined)?.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Role, as: "targetRole" }],
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (!user.targetRole) {
      res.status(400).json({ error: "Target role not set" });
      return;
    }

    const { skills: userSkills = [], targetRole } = user;
    const requiredSkills: string[] = targetRole.requiredSkills || [];

    // Identify missing and matched skills
    const skillGaps = requiredSkills.filter(
      (skill) => !userSkills.includes(skill)
    );
    const matchedSkills = requiredSkills.filter((skill) =>
      userSkills.includes(skill)
    );

    // Calculate progress percentage
    const progress = Math.round((matchedSkills.length / requiredSkills.length) * 100);

    // Fetch all resources related to the target role
    const resources = await Resource.findAll({
      where: { roleId: targetRole.id },
    });

    // Map resources only for missing skills by matching against resource.skills array
    const mappedResources = skillGaps.map((missingSkill) => {
      const matched = resources.find((res) =>
        res.skills.some(
          (skill) => skill.toLowerCase() === missingSkill.toLowerCase()
        )
      );

      return {
        skill: missingSkill,
        resource: matched || null,
      };
    });

    res.json({
      currentRole: user.currentRole,
      targetRole: targetRole.name,
      userSkills,
      requiredSkills,
      skillGaps,
      matchedSkills,
      progress,
      mappedResources,
    });
  } catch (error) {
    console.error("Error in dashboard:", error);
    res.status(500).json({ error: "Server error" });
  }
};
