import { z } from "zod";
import mongoose from "mongoose";

export const textMessageSchema = z.object({
  type: z.enum(["text"], {
    required_error: "type is required",
    invalid_type_error: "Invalid message type, must be 'text' or 'enquiry'",
  }),
  recipientId: z.string({
    required_error: "recipientId is required",
    invalid_type_error: "recipientId must be a string",
  }),
  content: z.string({
    required_error: "content is required for text message",
    invalid_type_error: "content must be a string",
  }),
});

export const enquiryMessageSchema = z.object({
  type: z.enum(["enquiry"], {
    required_error: "type is required",
    invalid_type_error: "Invalid message type, must be 'text' or 'enquiry'",
  }),
  recipientId: z.string({
    required_error: "recipientId is required",
    invalid_type_error: "recipientId must be a string",
  }),
  enquiry: z.object(
    {
      title: z.string({
        required_error: "title is required for enquiry",
        invalid_type_error: "title must be a string",
      }),
      description: z.string({
        required_error: "description is required for enquiry",
        invalid_type_error: "description must be a string",
      }),
      jobId: z.string({
        required_error: "jobId is required for enquiry",
        invalid_type_error: "jobId must be a string",
      }),
    },
    {
      required_error: "enquiry object is required",
      invalid_type_error: "enquiry field must be an object",
    }
  ),
});

export const messageValidator = (message) => {
  if (!message.type) {
    return { success: false, error: "message type is required" };
  }
  if (!["text", "enquiry"].includes(message.type)) {
    return { success: false, error: `Invalid message type. Allowed types are 'text' or 'enquiry'` };
  }
  if (!mongoose.Types.ObjectId.isValid(message.recipientId)) {
    return { success: false, error: `Invalid recipientId` };
  }

  if (message.type == "text") {
    const result = textMessageSchema.safeParse(message);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }
  } else if (message.type == "enquiry") {
    const result = enquiryMessageSchema.safeParse(message);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }
  }
};
