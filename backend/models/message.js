import mongoose from "mongoose";
import messageSchema from "../schemas/messageSchema.js";

const Message = mongoose.model("Message", messageSchema);

export default Message;
