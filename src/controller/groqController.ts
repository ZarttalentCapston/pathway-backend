import { Request, Response } from "express";
import { getCareerRecommendation } from "../services/Groq";

export const recommendWithGroq = async (req: Request, res: Response) => {
  const { currentRole, targetRole, currentSkills } = req.body;

  try {
    const groqResponse = await getCareerRecommendation(
      currentRole,
      targetRole,
      currentSkills
    );
    res.status(200).json(groqResponse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch AI recommendations", errors: error });
  }
};
