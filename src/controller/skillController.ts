import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { User } from "../models";
import {Role} from "../models";



export const setSkills = async (req: Request, res: Response) : Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
     return
  }

  const userId = req.user?.userId;
  if (!userId) {
     res.status(401).json({ error: "Unauthorized" });
     return
  }

  const { skills } = req.body;

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Role, as: "targetRole" }],
    });

    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

    if (!user.targetRole) {
      res.status(404).json({ error: "Target role not found" });
      return
    }

    const progress = {
      completedSkills: skills.length,
      totalSkills: user.targetRole.requiredSkills.length,
      onboardingStep: 3,
    };

    await User.update({ skills, progress }, { where: { id: userId } });

     res.json({
      message: "Skills updated",
      progress,
      nextStep: "/dashboard",
    });
  } catch (error) {
    console.error("Error updating skills:", error);
     res.status(500).json({ error: "Server error" });
  }
};