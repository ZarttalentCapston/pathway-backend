import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import { Role } from "./models";
import Resource from "./models/Resource";
import crypto from "crypto";
import authRoutes from "./routes/authRoutes";
import careerRoutes from "./routes/careerRoutes";
import skillRoute from "./routes/skillRoute"
import dashboardRoute from "./routes/dashboard.route"

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173",
  credentials : true
 }));

const secretKey = crypto.randomBytes(32).toString("hex");
console.log(secretKey);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", careerRoutes);
app.use("/api/skills", skillRoute)
app.use("/api/dashboard", dashboardRoute)

const port = process.env.PORT || 5000;

// Sequelize connection to database

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    await Role.bulkCreate([
      {
        name: "Software Engineer",
        requiredSkills: ["JavaScript", "Python", "Git"],
      },

      {
        name: "Senior Software Engineer",
        requiredSkills: ["JavaScript", "Python", "System Design"],
      },

      {
        name: "Engineering Manager",
        requiredSkills: ["Leadership", "Project Management"],
      },
    ]);

    await Resource.bulkCreate([
      {
        title: "Learn JavaScript",
        url: "https://example.com/js",
        roleId: 1,
      },

      {
        title: "Python Course",
        url: "https://example.com/python",
        roleId: 1,
      },

      {
        title: "Leadership Skills",
        url: "https://example.com/leadership",
        roleId: 3,
      },
    ]);
    console.log("Database synced successfully!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server :", error);
  }
};

startServer();
