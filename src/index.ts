import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import { Role } from "./models";
import Resource from "./models/Resource";
import authRoutes from "./routes/authRoutes";
import careerRoutes from "./routes/careerRoutes";
import skillRoute from "./routes/skillRoute";
import dashboardRoute from "./routes/dashboard.route";
import contactRoute from "./routes/contactRoute";
import summaryRoutes from "./routes/summaryRoutes";
import groqRoute from "./routes/groqRoute"

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", careerRoutes);
app.use("/api/user/skills", skillRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/contact", contactRoute);
app.use("/api/user/summary", summaryRoutes);
app.use("/api/ai", groqRoute)

const port = process.env.PORT || 7000;

// Sequelize connection to database
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true }); // Preserve data in production
    await Role.bulkCreate([
      {
        name: "Frontend Developer",
        requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git", "APIs"],
      },
      {
        name: "Backend Developer",
        requiredSkills: ["Node.js", "Express", "Databases", "Git", "APIs", "Authentication"],
      },
      {
        name: "Data Analyst",
        requiredSkills: ["SQL", "Excel", "Data Visualization", "Python", "Statistics"],
      },
      {
        name: "Product Manager",
        requiredSkills: ["Communication", "Roadmapping", "Market Research", "Agile", "Wireframing"],
      },
      {
        name: "UI/UX Designer",
        requiredSkills: ["Figma", "Wireframing", "Prototyping", "User Research", "Design Systems"],
      },
      {
        name: "Machine Learning Engineer",
        requiredSkills: ["Python", "Pandas", "Numpy", "Scikit-learn", "TensorFlow", "Deep Learning"],
      },
      {
        name: "DevOps Engineer",
        requiredSkills: ["CI/CD", "Docker", "Kubernetes", "AWS", "Monitoring"],
      },
      {
        name: "Cybersecurity Analyst",
        requiredSkills: ["Networking", "Linux", "Firewalls", "Threat Analysis", "Encryption"],
      },
      {
        name: "Technical Writer",
        requiredSkills: ["Writing", "Markdown", "Documentation", "APIs", "Version Control"],
      },
      {
        name: "Digital Marketer",
        requiredSkills: ["SEO", "Content Creation", "Google Analytics", "Email Marketing", "Social Media"],
      }
    ]);

    await Resource.bulkCreate([
      {
        title: "FreeCodeCamp JavaScript",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        roleId: 1,
        skills: ["JavaScript", "Data Structures", "Algorithms"],
        platform: "FreeCodeCamp",
        cost: 0,
        level: "beginner",
      },
      {
        title: "React Documentation",
        url: "https://react.dev/learn",
        roleId: 1,
        skills: ["React", "JavaScript", "Components", "Hooks"],
        platform: "React",
        cost: 0,
        level: "intermediate",
      },
      {
        title: "Node.js Crash Course",
        url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
        roleId: 2,
        skills: ["Node.js", "Express", "APIs"],
        platform: "YouTube",
        cost: 0,
        level: "beginner",
      },
      {
        title: "SQL for Data Analysis",
        url: "https://mode.com/sql-tutorial/",
        roleId: 3,
        skills: ["SQL", "Data Analysis", "Joins", "Aggregations"],
        platform: "Mode",
        cost: 0,
        level: "beginner",
      },
      {
        title: "Google Data Analytics Certificate",
        url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        roleId: 3,
        skills: ["SQL", "Excel", "Data Cleaning", "Visualization"],
        platform: "Coursera",
        cost: 39,
        level: "beginner",
      },
      {
        title: "Agile Product Management",
        url: "https://www.coursera.org/learn/agile-product-management",
        roleId: 4,
        skills: ["Agile", "Product Management", "Scrum"],
        platform: "Coursera",
        cost: 49,
        level: "intermediate",
      },
      {
        title: "Figma Design Course",
        url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
        roleId: 5,
        skills: ["Figma", "Prototyping", "Wireframing"],
        platform: "YouTube",
        cost: 0,
        level: "beginner",
      },
      {
        title: "TensorFlow for Beginners",
        url: "https://www.tensorflow.org/tutorials",
        roleId: 6,
        skills: ["TensorFlow", "Deep Learning", "Neural Networks"],
        platform: "TensorFlow",
        cost: 0,
        level: "intermediate",
      },
      {
        title: "Docker Essentials",
        url: "https://docker-curriculum.com/",
        roleId: 7,
        skills: ["Docker", "Containers", "DevOps"],
        platform: "Docker",
        cost: 0,
        level: "beginner",
      },
      {
        title: "Linux Security Essentials",
        url: "https://www.udemy.com/course/linux-security-and-hardening-the-practical-security-guide/",
        roleId: 8,
        skills: ["Linux", "Security", "Firewalls", "Hardening"],
        platform: "Udemy",
        cost: 99,
        level: "intermediate",
      },
      {
        title: "API Documentation Guide",
        url: "https://idratherbewriting.com/learnapidoc/",
        roleId: 9,
        skills: ["API Documentation", "Markdown", "Technical Writing"],
        platform: "I'd Rather Be Writing",
        cost: 0,
        level: "beginner",
      },
      {
        title: "Digital Marketing Specialization",
        url: "https://www.coursera.org/specializations/digital-marketing",
        roleId: 10,
        skills: ["SEO", "Google Analytics", "Email Marketing"],
        platform: "Coursera",
        cost: 49,
        level: "intermediate",
      }
    ]);

    console.log("Database synced successfully!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();