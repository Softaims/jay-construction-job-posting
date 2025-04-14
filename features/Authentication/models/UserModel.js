import mongoose from "mongoose";

const options = { discriminatorKey: 'role', timestamps: true };

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['main_contractor', 'subcontractor', 'job_seeker']
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiry: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiry: {
    type: Date,
  },
}, options);

export const User = mongoose.model('User', UserSchema);
