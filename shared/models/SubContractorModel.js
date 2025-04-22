import mongoose from "mongoose";
import { User } from "./UserModel.js";

const SubcontractorSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_number: { type: String, required: true },
  services_offered: [{ type: String, required: true }],
  travel_radius_km: { type: Number, required: true },
  admin_status: {
    type: String,
    enum: ["not-verified", "pending", "verified", "rejected"],
    default: "not-verified",
  },
  compliance_certificate: { type: String },
  verification_certificate: { type: String },
});

export const Subcontractor = User.discriminator("subcontractor", SubcontractorSchema);
