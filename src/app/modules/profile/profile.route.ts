import express from "express";
import { profileController } from "./profile.controller";

const router = express.Router();

router.post("/", profileController.createProfile);
router.put("/:id", profileController.updateProfile);

export const profileRoutes = router;
