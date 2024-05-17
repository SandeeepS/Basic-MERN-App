import {
  authUser,
  resgisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserDetails,resgisterUserFromAdmin
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/", resgisterUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get('/details',getUserDetails)
router.post('/resgisterUserFromAdmin',resgisterUserFromAdmin);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
