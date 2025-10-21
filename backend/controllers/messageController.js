import Profile from "../models/profile.js";
import Message from "../models/message.js";
import { cloudinary } from "../config/cloudConfig.js";

export const getUsersForMessageSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await Profile.find({
      user: { $ne: loggedInUserId },
    }).populate("user", "username");

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
    const { id: currReceiverId } = req.params;
    const currSenderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currSenderId, receiverId: currReceiverId },
        { senderId: currReceiverId, receiverId: currSenderId },
      ],
    }).sort({ createdAt: 1 });

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

    let imagePublicId, imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "CodeElevate_Project",
        overwrite: false,
      });
      imagePublicId = uploadResponse.public_id;
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: {
        publicId: imagePublicId,
        url: imageUrl,
      },
    });

    await newMessage.save();

    // todo => realtime functionality goes here using socket

    return res.status(201).json(newMessage);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Sever Error, failed to send message to user!",
      error: err,
    });
  }
};
