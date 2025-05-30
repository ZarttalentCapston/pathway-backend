import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { User } from "../models";
import {Role} from "../models";
import Resource from "../models/Resource";


export const getDashboard = async (req: Request, res: Response) : Promise<void> => {
  const userId = (req.user as { userId: number } | undefined)?.userId;
  if (!userId) {
     res.status(401).json({ error: "Unauthorized" });
     return
  }

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Role, as: "targetRole" }],
    });

    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

    if (!user.targetRole) {
      res.status(404).json({ error: "Target role not set" });
      return
    }

    const resources = await Resource.findAll({
      where: { roleId: user.targetRole.id },
    });

    res.json({
      currentRole: user.currentRole,
      targetRole: user.targetRole.name,
      skills: user.skills,
      progress: user.progress,
      resources,
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
     res.status(500).json({ error: "Server error" });
  }
};