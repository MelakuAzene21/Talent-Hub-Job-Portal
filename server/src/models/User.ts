import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "employer" | "applicant" | "admin";
  comparePassword: (pw: string) => Promise<boolean>;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employer", "applicant", "admin"],
      default: "applicant",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = (await import("bcryptjs")).default;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = async function (pw: string) {
  const bcrypt = (await import("bcryptjs")).default;
  return bcrypt.compare(pw, this.password);
};
export default mongoose.model<IUser>("User", userSchema);
