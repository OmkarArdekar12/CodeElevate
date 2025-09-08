import mongoose from "mongoose";
import profileSchema from "../schemas/profileSchema";

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
