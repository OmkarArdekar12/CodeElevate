import mongoose from "mongoose";
import profileSchema from "../schemas/profileSchema.js";

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
