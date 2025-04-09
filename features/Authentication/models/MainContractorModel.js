import mongoose from "mongoose";
import { User } from "./UserModel.js";

const MainContractorSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_number: { type: String, required: true }
});

export const MainContractor = User.discriminator('main_contractor', MainContractorSchema);
