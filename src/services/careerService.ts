import User from '../models/User';

export const generateCareerPathForUser = async (user: User, targetRole: string) => {
  // Use mock data instead of OpenAI
  const mockCareerPath = [
    {
      step: 1,
      description: `Learn foundational knowledge to become a ${targetRole}.`,
      recommendedResources: [
        "Intro to Programming (freeCodeCamp)",
        "Basic Data Structures and Algorithms"
      ]
    },
    {
      step: 2,
      description: `Build projects and learn intermediate skills.`,
      recommendedResources: [
        "Build a Portfolio Website",
        "JavaScript & TypeScript Deep Dive"
      ]
    },
    {
      step: 3,
      description: `Advance your skills and prepare for real-world work.`,
      recommendedResources: [
        "System Design Basics",
        "Contribute to Open Source Projects",
        "Mock Interviews"
      ]
    }
  ];

  return mockCareerPath;
};
