import Profile from "../models/profile.js";
import Message from "../models/message.js";
import { cloudinary } from "../config/cloudConfig.js";

export const getUsersForMessageSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await Profile.find({
      user: { $ne: loggedInUserId },
    })
      .populate("user", "username")
      .select("fullName user profilePicture headLine");

    return res.status(200).json(filteredUsers);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Sever Error, failed to fetch users for messages!",
      error: err,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: roomId } = req.params;

    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    // const { id: currReceiverId } = req.params;
    // const currSenderId = req.user._id;
    // const messages = await Message.find({
    //   $or: [
    //     { senderId: currSenderId, receiverId: currReceiverId },
    //     { senderId: currReceiverId, receiverId: currSenderId },
    //   ],
    // }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Sever Error, failed to fetch user messages!",
      error: err,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const roomId = [senderId, receiverId].sort().join("_");

    let messageData = { senderId, receiverId, text: text || "", roomId };

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "CodeElevate_Project",
      });
      messageData.image = {
        publicId: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      };
    }

    const newMessage = await Message.create(messageData);

    //emit via Socket.IO
    req.io.to(roomId).emit("receiveMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Sever Error, failed to send message to user!",
      error: err,
    });
  }
};
