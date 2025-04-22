import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle mongoose validation errors specifically
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const firstError = Object.values(err.errors)[0];
    message = firstError.message;
  }

  // Handle duplicate key errors (e.g., duplicate email)
  if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};
