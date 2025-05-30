import { MainContractor } from "../../shared/models/MainContractorModel.js";
import { Subcontractor } from "../../shared/models/SubContractorModel.js";
import { JobSeeker } from "../../shared/models/JobSeekerModel.js";
import { User } from "../../shared/models/UserModel.js";
import { BlacklistedToken } from "../../shared/models/BlacklistedTokenModel.js";
export const createUserByRole = async (role, userData) => {
  let newUser;
  if (role === "main_contractor") {
    newUser = new MainContractor(userData);
  } else if (role === "subcontractor") {
    newUser = new Subcontractor(userData);
  } else if (role === "job_seeker") {
    newUser = new JobSeeker(userData);
  } else {
    throw new Error("Invalid role");
  }

  return await newUser.save();
};


export const updateUserEmailVerificationStatus = async (userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      verifyEmail: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
    { new: true }
  );
};

export const createBlacklistedToken = async (token,expiresAt) => {
    const newToken = new BlacklistedToken({ token,expiresAt });
    return await newToken.save();
};
