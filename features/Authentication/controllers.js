import User from "./models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userDto } from "./dtos.js";
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!password || password.length < 8 || password.length > 50) {
      return res.status(400).json({ message: "Password must be between 8 and 50 characters" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User signed up successfully", data:userDto(newUser)});
  } catch (error) {
    res.status(500).json({ message: "Error signing up user", error: error.message });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const jwtPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      activeStatus: user.activeStatus,
      chats: user.chats,
      lastSeen: user.lastSeen,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login Successful", token, user: { ...user } });
  } catch (error) {
    res.status(500).json({ message: "Error Logging In", error: error.message });
    console.log(error);
  }
};
