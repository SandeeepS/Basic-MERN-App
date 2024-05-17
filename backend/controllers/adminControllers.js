import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/UserModel.js";
import { generateAdminToken } from "../utils/generateToken.js";
import mongoose from "mongoose";

//@desc Auth admin/set token
//route POST /api/admin/auth
//@access public
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  console.log("admin is ", admin);
  if (admin && (await admin.matchPassword(password))) {
    generateAdminToken(res, admin._id);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Logout admin
//route POST /api/admin/Logout
//@access public
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("adminJwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully from admin side" });
});

//@desc Get admin profile
//route POST /api/admin/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    console.log("entered in the server-side to edit", req.body);
    console.log("id is ", req.body.id);
    const { id, name, email } = req.body;

    const { ObjectId } = mongoose.Types;

    const objectId = new ObjectId(id);
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("error occurred while editing the user", err);
    res.status(500);
    throw new Error("Server error");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    console.log("conformed for deletion");
    console.log(req.body);
    const { id, name, email } = req.body;

    const { ObjectId } = mongoose.Types;

    const objectId = new ObjectId(id);
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { deleted: true },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("error while deleting the user from the server side ", err);
  }
});

const updateListingStatus = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    const targetUser = await User.findById(_id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    targetUser.isListed = !targetUser.isListed;

    await targetUser.save();

    res.json(targetUser);
  } catch (err) {
    console.log("error occured while updating the status of the user", err);
  }
});



export {
  adminLogin,
  logoutAdmin,
  getUserProfile,
  editUser,
  deleteUser,
  updateListingStatus,
};
