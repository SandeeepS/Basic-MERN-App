import {
  authUser,
  resgisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post('/', resgisterUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

export default router;
