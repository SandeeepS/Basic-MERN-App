import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

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

//@desc Register a new admin
//route POST /api/users
//@access public
const resgisterAdmin = asyncHandler(async (req, res) => {
  console.log("entered for registration");
  const { name, email, password } = req.body;
  console.log(password);
  console.log(name);

  const adminExist = await Admin.findOne({ email });
  console.log(adminExist);
  if (adminExist) {
    res.status(400);
    throw new Error("Admin  already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    generateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin data");
  }
});

//@desc Logout admin
//route POST /api/admin/Logout
//@access public
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
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

export { adminLogin, logoutAdmin, getUserProfile, resgisterAdmin };
