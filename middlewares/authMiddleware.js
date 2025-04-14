import jwt from "jsonwebtoken"
import { isTokenBlacklisted } from "../features/services.js";
export const authMiddleware = async(req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User is not logged in. Please log in to access this resource.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or expired token.",
      });
    }

    req.user = {
      _id: decoded.userId,
      email: decoded.email,
      role:decoded.role
    };
console.log("decoded is",decoded)
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};
