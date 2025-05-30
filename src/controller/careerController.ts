import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models";
import { Role } from "../models";
import Resource from "../models/Resource";

export const currentRole = async (req: Request, res: Response) : Promise<void> => {
  const errors = validationResult(req);
  const userId = req.user?.userId;

  if (!errors.isEmpty()) {
     res.status(400).json({ error: errors.array() });
     return
  }

  try {
    const { currentRole } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

    await user.update({
      currentRole,
      progress: {
        ...user.progress,
        onboardingStep: 1,
      },
    });

     res.json({
      message: "Current role updated",
      nextStep: "/onboarding/career-goal",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const setTargetRole = async (req: Request, res: Response) :Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return
  }

  const { targetRole } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
     res.status(401).json({ error: "Unauthorized" });
     return
  }

  try {
    const role = await Role.findOne({ where: { name: targetRole } });
    if (!role) {
       res.status(404).json({ error: "Role not found" });
       return
    }

    const user = await User.findByPk(userId);
    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

    await user.update({
      targetRoleId: role.id,
      progress: {
        ...user.progress,
        onboardingStep: 2,
      },
    });

     res.json({
      message: "Target role updated",
      requiredSkills: role.requiredSkills,
      nextStep: "/onboarding/skills",
    });
  } catch (err) {
    console.error("Error setting target role:", err);
     res.status(500).json({ error: "Server error" });
  }
};



