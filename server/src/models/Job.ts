import { Schema, model, Document, Types } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  jobType: "full-time" | "part-time" | "contract" | "internship";
  minSalary: number;
  maxSalary: number;
  description: string;
  requirements: string[];
  skills: string[];
  createdBy: Types.ObjectId; // User (employer)
  isActive: boolean;
  applicationDeadline?: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { 
      type: String, 
      required: true, 
      enum: ["full-time", "part-time", "contract", "internship"] 
    },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    skills: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    applicationDeadline: { type: Date },
  },
  { timestamps: true }
);

export default model<IJob>("Job", jobSchema);
