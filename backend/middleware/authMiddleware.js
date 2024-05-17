import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Admin from "../models/adminModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;


  if (req.cookies.userJwt) {
    token = req.cookies.userJwt;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed for user");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token for user");
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;


  if (req.cookies.adminJwt) {
    token = req.cookies.adminJwt;
    try {
      const decoded = jwt.verify(token, process.env.JWT_ADSECRET);
      req.admin = await Admin.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed for admin");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token for admin");
  }
});

export { protect, protectAdmin };