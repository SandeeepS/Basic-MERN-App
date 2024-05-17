import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  const token = jwt.sign({ userId: id, userType: 'user'  }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("userJwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const generateAdminToken = (res, adminId) => {
  const Adtoken = jwt.sign({userId: adminId, userType: 'admin'  }, process.env.JWT_ADSECRET, {
    expiresIn: "30d",
  });

  res.cookie("adminJwt", Adtoken , {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export  {generateToken, generateAdminToken };
