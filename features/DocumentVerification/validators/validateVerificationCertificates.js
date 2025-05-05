export const validateVerificationCertificates = (req, res, next) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".doc", ".docx", ".pdf"];
  const maxSizeInBytes = 2 * 1024 * 1024;
  const files = req.files;

  if (!files || !files.compliance_certificate || !files.verification_certificate) {
    return res.status(400).json({
      success: false,
      message: "Both compliance_certificate and verification_certificate are required.",
    });
  }

  for (const [fieldName, fileArray] of Object.entries(files)) {
    const file = fileArray[0];

    const extension = file.originalname.slice(((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    const fileSize = file.size;

    if (!allowedExtensions.includes(`.${extension}`)) {
      return res.status(400).json({
        success: false,
        message: `Invalid file type!! Allowed files (jpg, png, docx, pdf)`,
      });
    }
    if (fileSize > maxSizeInBytes) {
      return res.status(400).json({
        success: false,
        message: `${fieldName} must not exceed 2MB.`,
      });
    }
  }

  next();
};
