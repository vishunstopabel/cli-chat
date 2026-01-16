import { Request, Response } from "express";
import { userTable } from "../db/schema.js";
import { db } from "../index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { AuthRequest } from "../middleware/auth.js";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        msg: "Invalid email format",
      });
    }

    const existingUser = await db.select().from(userTable);
    if (existingUser.length > 0) {
      return res.status(409).json({
        msg: "User with this email already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    await db.insert(userTable).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
    });

    if (!process.env.JWT_TOKEN) {
      throw new Error("JWT_TOKEN not defined");
    }
    const payload = {
      userId,
      name,
      email,
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      msg: "Registered successfully",
      data: {
        authToken: jwtToken,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        msg: "Invalid email format",
      });
    }

    const users = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (users.length === 0) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    const user = users[0];

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    if (!process.env.JWT_TOKEN) {
      throw new Error("JWT_TOKEN not defined");
    }

    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
    };

    const jwtToken =jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      msg: "Login successful",
      data: {
        authToken: jwtToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const handleGetUserDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };

    if (!userId) {
      return res.status(400).json({
        msg: "User ID is required",
      });
    }

    const userDetails = await db
      .select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
      })
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (userDetails.length === 0) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    return res.status(200).json({
      msg: "User details retrieved successfully",
      data: userDetails[0],
    });
  } catch (error) {
    console.error("Get user details error:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
