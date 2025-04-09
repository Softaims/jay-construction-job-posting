import jwt from "jsonwebtoken";
export const verifyAuthToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided.", isTokenValid: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token has expired", isTokenValid: false });
      }
      return res.status(401).send({ message: "Unauthorized!", isTokenValid: false });
    }
    req.user = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      activeStatus: decoded.activeStatus,
      chats: decoded.chats,
      lastSeen: decoded.lastSeen,
    };

    next();
  });
};
