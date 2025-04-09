import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [1, "Name must be at least 1 character long"],
    maxlength: [50, "Name must be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  activeStatus: {
    type: String,
    default: "offline",
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
