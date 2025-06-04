import { Request, Response } from "express";
import { User, Role } from "../models";

// GET /api/user/summary
export const getSummary = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: "targetRole",
        },
      ],
    });

    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

     res.status(200).json({
      currentRole: user.currentRole,
      targetRole: user.targetRole
        ? { id: user.targetRoleId, name: user.targetRole.name }
        : null,
      skills: user.skills,
    });
  } catch (error) {
    console.error("Summary error:", error);
     res.status(500).json({ error: "Server error" });
  }
};

// POST /api/user/confirm
export const confirmOnboarding = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

    // Update onboarding step
    user.progress.onboardingStep = 4;

    await user.save();

     res.status(200).json({ message: "Onboarding complete", redirect: "/dashboard" });
  } catch (error) {
    console.error("Onboarding confirm error:", error);
     res.status(500).json({ error: "Server error" });
  }
};
