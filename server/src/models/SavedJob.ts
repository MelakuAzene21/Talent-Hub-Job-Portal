import { Schema, model, Document, Types } from "mongoose";

export interface ISavedJob extends Document {
  jobId: Types.ObjectId;
  applicantId: Types.ObjectId;
  savedAt: Date;
}

const savedJobSchema = new Schema<ISavedJob>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent duplicate saves
savedJobSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

export default model<ISavedJob>("SavedJob", savedJobSchema);
