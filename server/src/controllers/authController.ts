import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { UserDTO } from "../types/index";
import { findUserByEmail, createUser } from "../config/database";

// register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData: UserDTO = {
      ...req.body,
      id: uuidv4(),
    };

    // check if user exists
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser: UserDTO = {
      ...userData,
      password: hashedPassword,
    };

    await createUser(newUser);

    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );

    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};
