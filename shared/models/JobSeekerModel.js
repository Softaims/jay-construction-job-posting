import mongoose from "mongoose";
import { User } from "./UserModel.js";

const JobSeekerSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  trade: { type: String, required: true },
  travel_radius_km: { type: Number, required: true },
  phone_number: { type: String, required: true },
  qualification_document: { type: String },
  id_document: { type: String },
});

export const JobSeeker = User.discriminator("job_seeker", JobSeekerSchema);
