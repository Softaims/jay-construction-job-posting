export const validateProfilePicture = (req, res, next) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const maxSizeInBytes = 2 * 1024 * 1024;

  const fileArray = req.files?.profile_picture;

  if (!fileArray || !fileArray.length) return next();
  const file = fileArray[0];
  const extension = file.originalname.slice(((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
  const fileSize = file.size;

  if (!allowedExtensions.includes(`.${extension}`)) {
    return res.status(400).json({
      success: false,
      message: `Invalid profile_picture file type. Allowed types: jpg, jpeg, png.`,
    });
  }

  if (fileSize > maxSizeInBytes) {
    return res.status(400).json({
      success: false,
      message: `profile_picture must not exceed 2MB.`,
    });
  }

  next();
};
