import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    project_image: {
      type: String,
      default: null,
    },

    job_title: {
      type: String,
      required: true,
    },

    job_location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    job_type: {
      type: String,
      required: true,
    },

    target_user: {
      type: String,
      required: true,
      enum: ["job_seeker", "subcontractor", "both"],
    },

    services: [
      {
        service_name: {
          type: String,
          required: true,
        },
        resource_count: {
          type: Number,
          default: 0,
        },
      },
    ],

    job_priority: {
      type: Boolean,
      default: false,
    },

    budget: {
      type: Number,
      default: null,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

JobSchema.index({ job_location: "2dsphere" });

export const Job = mongoose.model("Job", JobSchema);
