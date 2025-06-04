import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User, Role } from "../models";

export const setCurrentSkills = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const userId = req.user?.userId;
  const { currentSkills } = req.body;

   console.log("Received skills payload:", req.body);
  console.log("Authenticated user id:", req.user?.userId);


  if (!userId || !Array.isArray(currentSkills)) {
    res.status(400).json({ error: "Missing or invalid user/skills" });
    return;
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const targetRole = await Role.findByPk(user.targetRoleId);
    if (!targetRole) {
      res.status(400).json({ error: "Target role not set or not found" });
      return;
    }

    const requiredSkills: string[] = targetRole.requiredSkills || [];

    // Determine missing skills
    const skillsToAcquire = requiredSkills.filter(
      (skill) => !currentSkills.includes(skill)
    );

    // Prepare progress updates
    const updatedProgress = {
      ...user.progress,
      onboardingStep: 3,
      totalSkills: requiredSkills.length,
      acquiredSkills: skillsToAcquire, 
      completedSkills: [], 
    };

    await user.update({
      skills: currentSkills,
      skillsToAcquire,
      progress: updatedProgress,
    });

    res.json({
      message: "Skills updated",
      skillsToAcquire,
      nextStep: "/summary",
    });

  } catch (err) {
    console.error("Error updating skills:", err);
    res.status(500).json({ error: "Server error" });
  }
};
