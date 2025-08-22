import mongoose, { Schema, Document, Types } from "mongoose";
export interface IApplication extends Document {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  status: "applied" | "shortlisted" | "rejected";
  resumeUrl?: string;
}
const appSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied",
    },
    resumeUrl: { type: String },
  },
  { timestamps: true }
);
appSchema.index({ jobId: 1, userId: 1 }, { unique: true }); // prevent duplicates
export default mongoose.model<IApplication>("Application", appSchema);
