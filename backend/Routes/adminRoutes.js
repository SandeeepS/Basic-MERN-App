import {
  adminLogin,
  logoutAdmin,
  resgisterAdmin,
} from "../controllers/adminControllers.js";
import "../controllers/adminControllers.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.post("/register", resgisterAdmin);

export default adminRouter;
