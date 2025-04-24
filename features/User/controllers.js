import { getUserById } from "../../shared/services/services.js";
import { userDto } from "../../shared/dtos/userDto.js";
import { updateUser } from "./services.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getMe = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const user = await getUserById(_id);
  console.log("user is", user);
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: userDto(user),
  });
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  const updateData = { ...req.body };

  // Check if a profile image is provided
  // if (req.file) {
  //   const uploadResult = await s3Uploader(req.file);

  //   if (!uploadResult.success) {
  //     console.error("Failed to upload profile image:", uploadResult.error);
  //     return next(createError(500, "Failed to upload profile image."));
  //   }

  //   updateData.profileImage = uploadResult.url;
  // }
  console.log("updated", updateData);
  const updatedUser = await updateUser(_id, role, updateData);

  if (!updatedUser) {
    return next(createError(404, "User not found."));
  }
  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    user: userDto(updatedUser),
  });
});
