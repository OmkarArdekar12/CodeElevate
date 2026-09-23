import mongoose from "mongoose";
import otpSchema from "../schemas/otpSchema.js";

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
