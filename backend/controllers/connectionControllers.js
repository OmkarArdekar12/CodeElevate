import Profile from "../models/profile.js";
import Notification from "../models/notification.js";

//Follow Controller
export const followUser = async (req, res) => {
  try {
    const currUserId = req.user._id;
    const targetUserId = req.params.id;

    if (currUserId.toString() === targetUserId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currProfile = await Profile.findOne({ user: currUserId });
    const targetProfile = await Profile.findOne({ user: targetUserId });

    if (!targetProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currProfile.following.includes(targetUserId)) {
      res.status(400).json({ message: "Already following this user" });
    }

    currProfile.following.push(targetUserId);
    targetProfile.followers.push(currUserId);

    await currProfile.save();
    await targetProfile.save();

    const notification = await Notification.create({
      from: currUserId,
      to: targetUserId,
      type: "follow",
      message: `${req.user.username} started following you.`,
    });

    res.json({ message: "Followed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Follow failed!", error: err });
  }
};

//Unfollow Controller
export const unfollowUser = async (req, res) => {
  try {
    const currUserId = req.user._id;
    const targetUserId = req.params.id;

    if (currUserId.toString() === targetUserId.toString()) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const currProfile = await Profile.findOne({ user: currUserId });
    const targetProfile = await Profile.findOne({ user: targetUserId });

    if (!targetProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = currProfile.following.includes(targetUserId);
    if (!isFollowing) {
      return res.status(400).json({ error: "You are not following this user" });
    }

    currProfile.following.pull(targetUserId);
    targetProfile.followers.pull(currUserId);

    await currProfile.save();
    await targetProfile.save();

    res.json({ msg: "Unfollowed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Unfollow failed!", error: err });
  }
};

//Connect Controller
export const sendConnectRequest = async (req, res) => {
  try {
    const currUserId = req.user._id;
    const targetUserId = req.params.id;

    if (currUserId.toString() === targetUserId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot connect with yourself" });
    }

    const targetProfile = await Profile.findOne({ user: targetUserId });

    if (!targetProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetProfile.followers.includes(currUserId)) {
      return res
        .status(400)
        .json({ message: "You are already connected with this user" });
    }

    const notification = await Notification.create({
      from: currUserId,
      to: targetUserId,
      type: "connect",
      message: `${req.user.username} send you a connection request`,
    });

    res.status(200).json({ message: "Connection request sent" });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, Connect Request failed!",
      error: err,
    });
  }
};

//Connect Respond Controller
export const respondConnectRequest = async (req, res) => {
  try {
    const targetUserId = req.user._id;
    const { id: notificationId } = req.params;
    const { action } = req.body;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (notification.to.toString() !== targetUserId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const requesterId = notification.from;

    if (action === "accept") {
      const targetProfile = await Profile.findOne({ user: targetUserId });
      const requesterProfile = await Profile.findOne({ user: requesterId });

      if (!targetProfile || !requesterProfile) {
        return res.status(404).json({ error: "User profiles not found" });
      }

      if (!targetProfile.followers.includes(requesterId)) {
        targetProfile.followers.push(requesterId);
      }
      if (!targetProfile.following.includes(requesterId)) {
        targetProfile.following.push(requesterId);
      }

      if (!requesterProfile.followers.includes(targetUserId)) {
        requesterProfile.followers.push(targetUserId);
      }
      if (!requesterProfile.following.includes(targetUserId)) {
        requesterProfile.following.push(targetUserId);
      }

      await targetProfile.save();
      await requesterProfile.save();

      await Notification.create({
        from: targetUserId,
        to: requesterId,
        type: "message",
        message: `${req.user.username} accepted your connection request`,
      });

      await notification.deleteOne();
      res.json({ msg: "Connection request accepted" });
    } else if (action === "reject") {
      await Notification.create({
        from: targetUserId,
        to: notification.from,
        type: "message",
        message: `${req.user.username} rejected your connection request`,
      });

      await notification.deleteOne();
      res.json({ msg: "Connection request rejected" });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, Connect Response failed!",
      error: err,
    });
  }
};
