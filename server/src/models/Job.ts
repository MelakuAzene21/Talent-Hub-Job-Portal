import mongoose, { Schema, Document, Types } from "mongoose";
export interface IJob extends Document {
  title: string;
  description: string;
  skills?: string[];
  createdBy: Types.ObjectId; // User (employer)
}
const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export default mongoose.model<IJob>("Job", jobSchema);
