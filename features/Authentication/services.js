import { MainContractor } from "./models/MainContractorModel.js";
import { Subcontractor } from "./models/SubContractorModel.js";
import { JobSeeker } from "./models/JobSeekerModel.js";
import { User } from "./models/UserModel.js";
import { BlacklistedToken } from "./models/BlacklistedTokenModel.js";
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

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
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
