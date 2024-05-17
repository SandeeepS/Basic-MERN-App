import {
  adminLogin,
  logoutAdmin,
  editUser,deleteUser,
  updateListingStatus,
} from "../controllers/adminControllers.js";
import "../controllers/adminControllers.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.post("/editUser",editUser);
adminRouter.post("/deleteUser",deleteUser);
adminRouter.put("/updateListingStatus",updateListingStatus);

export default adminRouter;
