import { Request, Response, NextFunction } from "express";
import { profileService } from "./profile.service";

// Create Profile
export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, bio, profilePhoto } = req.body;

    const profile = await profileService.createProfile({
      userId,
      bio,
      profilePhoto,
    });
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    next(error); // Handled by global error handler
  }
};

// Update Profile
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { bio, profilePhoto } = req.body;

    const profile = await profileService.updateProfile({
      userId,
      bio,
      profilePhoto,
    });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error); // Handled by global error handler
  }
};

export const profileController = {
  createProfile,
  updateProfile,
};
