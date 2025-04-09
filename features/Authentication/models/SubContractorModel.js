import mongoose from "mongoose";
import { User } from "./UserModel.js";

const SubcontractorSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_number: { type: String, required: true },
  services_offered: [{ type: String, required: true }]
});

export const Subcontractor = User.discriminator('subcontractor', SubcontractorSchema);
