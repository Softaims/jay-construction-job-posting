import { catchAsync } from "../utils/catchAsync.js";
import { s3Uploader } from "../utils/s3Uploader.js";
import createError from "http-errors";
export const uploadMultiFiles = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(createError(400, "No file received"));
  }

  const files = req.files;
  const uploadResults = await Promise.all(files.map((file) => s3Uploader(file)));
  return res.status(200).json({
    success: true,
    files: uploadResults.map((result) => ({
      url: result.url,
    })),
  });
});
