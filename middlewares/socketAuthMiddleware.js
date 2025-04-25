import cookie from "cookie";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
      return next(new Error("Unauthorized: User is not logged in. Please log in to access this resource."));
    }
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.access_token;
    if (!token) {
      return next(new Error("Unauthorized: User is not logged in. Please log in to access this resource."));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = {
      _id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    return next();
  } catch (error) {
    return next(new Error("Unauthorized: Invalid or expired token." + error.message));
  }
};
