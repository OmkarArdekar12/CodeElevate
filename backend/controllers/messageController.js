import Profile from "../models/profile.js";
import Message from "../models/message.js";
import { cloudinary } from "../config/cloudConfig.js";

//Get All Users for Message Sidebar Controller
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

//Get Selected User for Messaging Controller
export const getUserForMessage = async (req, res) => {
  try {
    const { id: toMessage } = req.params;
    const loggedInUserId = req.user._id;
    if (loggedInUserId.toString() === toMessage.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot get yourself for messaging" });
    }

    const user = await Profile.findOne({ user: toMessage })
      .populate("user", "username")
      .select("fullName user profilePicture headLine");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Sever Error, failed to fetch user for messaging!",
      error: err,
    });
  }
};

//Get All Messages between sender and receiver Controller
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

//Send Message Controller
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Message must have text or image" });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json({ message: "Can't send message to yourself" });
    }

    const roomId = [senderId.toString(), receiverId.toString()]
      .sort()
      .join("_");

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
