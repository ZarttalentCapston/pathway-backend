import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { validationResult } from "express-validator";
import { sendOtpEmail, sendVerificationEmail } from "../utils/email";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      email,
      password: hashedPassword,
      skills: [],
      progress: { completedResource: [], acquiredSkills: [] },
      assessments: [],
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    //const token = jwt.sign({ userId : user.id }, JWT_SECRET!, { expiresIn : "24h" })

    res.status(201).json({
      userId: user.id,
      email: user.email,
      message: "Registeration successful!. Please verify your email to login",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Check if email is verified
    if (!user.isVerified) {
      res
        .status(403)
        .json({ error: "Please verify your email before logging in" });
      return;
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    console.log("[LOGIN] Comparing:", password, "vs", user.password);
    if (!verifyPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "24h",
    });


    res.status(201).json({
      userId: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // Generate OTP code
    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

    user.otpCode = generateOtp;
    user.otpCodeExpiry = otpCodeExpiry;
    await user.save();

    // send the OTP email
    await sendOtpEmail(user.email, generateOtp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};


export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otpCode } = req.body;

  if (!email || !otpCode) {
     res.status(400).json({ error: "Email and OTP code are required" });
     return
  }

  try {
    const user = await User.findOne({
      where: {
        email,
        otpCode,
        otpCodeExpiry: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
       res.status(400).json({ error: "Invalid or expired OTP code" });
       return
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



export const resetPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { otpCode, newPassword } = req.body;
   console.log("[RESET] newPassword received:", newPassword);

  try {
    const user = await User.findOne({
      where: {
        otpCode,
        otpCodeExpiry: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid or expired OTP code" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otpCode = "";
    user.otpCodeExpiry = undefined;
    await user.save();

    console.log("[RESET] Saving hashed password:", hashedPassword);


    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error)
  }
};



export const verifyEmail = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { token } = req.query;

  try {
    const user = await User.findOne({
      where: {
        verificationToken: token as string,
      },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid verification token" });
      return;
    }

    user.isVerified = true;
    user.verificationToken = "";
    await user.save();

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now login" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};
