import { Response } from "express";
import { findUserById } from "../config/database";
import { AuthenticatedRequest } from "../types";

// get user controller
export const getUserController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
