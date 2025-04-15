import mongoose from "mongoose";
import { User } from "./UserModel.js";

const MainContractorSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_number: { type: String, required: true },
  admin_status: {
    type: String,
    enum: ['not-verified', 'pending', 'verified', 'rejected'],
    default: 'not-verified',
  },
  compliance_certificate: { type: String },
  verification_certificate: { type: String },
});

export const MainContractor = User.discriminator('main_contractor', MainContractorSchema);
