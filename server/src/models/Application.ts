import { Schema, model, Document, Types } from "mongoose";

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  applicantId: Types.ObjectId;
  coverLetter: string;
  resumeUrl: string;
  status: "applied" | "shortlisted" | "rejected" | "hired";
  appliedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["applied", "shortlisted", "rejected", "hired"], 
      default: "applied" 
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Add compound index to prevent duplicate applications
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

export default model<IApplication>("Application", applicationSchema);
