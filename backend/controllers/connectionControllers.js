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
      return res.status(400).json({ message: "Already following this user" });
    }

    currProfile.following.push(targetUserId);
    targetProfile.followers.push(currUserId);

    await currProfile.save();
    await targetProfile.save();

    const notification = await Notification.create({
      from: currUserId,
      to: targetUserId,
      type: "message",
      message: `${req.user.username} started following you.`,
    });

    return res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    return res
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

    const notification = await Notification.create({
      from: currUserId,
      to: targetUserId,
      type: "message",
      message: `${req.user.username} unfollowed you.`,
    });

    return res.status(200).json({ msg: "Unfollowed successfully" });
  } catch (err) {
    return res
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
    const currProfile = await Profile.findOne({ user: currUserId });

    if (!targetProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const isConnected =
      targetProfile.followers.includes(currUserId) &&
      currProfile.followers.includes(targetUserId);

    if (isConnected) {
      return res
        .status(400)
        .json({ message: "You are already connected with this user" });
    }

    const existingConnectionRequest = await Notification.findOne({
      type: "connect",
      $or: [
        { from: currUserId, to: targetUserId },
        { from: targetUserId, to: currUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Already Connection Request is Send" });
    }

    const notification = await Notification.create({
      from: currUserId,
      to: targetUserId,
      type: "connect",
      message: `${req.user.username} send you a connection request`,
      status: "pending",
    });

    return res.status(200).json({ message: "Connection request sent" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, Connect Request failed!",
      error: err,
    });
  }
};

//Connect Respond Controller
export const respondConnectRequest = async (req, res) => {
  try {
    const currUserId = req.user._id;
    const { id: notificationId } = req.params;
    const { action } = req.body;

    const connectionRequest = await Notification.findById(notificationId);
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection Request not found" });
    }

    if (connectionRequest.to.toString() !== currUserId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const requesterId = connectionRequest.from.toString();

    if (action === "accept") {
      const currProfile = await Profile.findOne({ user: currUserId });
      const requesterProfile = await Profile.findOne({ user: requesterId });

      if (!currProfile || !requesterProfile) {
        return res.status(404).json({ error: "User profiles not found" });
      }

      if (!currProfile.followers.includes(requesterId)) {
        currProfile.followers.push(requesterId);
      }
      if (!currProfile.following.includes(requesterId)) {
        currProfile.following.push(requesterId);
      }

      if (!requesterProfile.followers.includes(currUserId)) {
        requesterProfile.followers.push(currUserId);
      }
      if (!requesterProfile.following.includes(currUserId)) {
        requesterProfile.following.push(currUserId);
      }

      await currProfile.save();
      await requesterProfile.save();

      const notification = await Notification.create({
        from: currUserId,
        to: requesterId,
        type: "message",
        message: `${req.user.username} accepted your connection request`,
      });

      await connectionRequest.deleteOne();
      return res.json({ message: "Connection request accepted" });
    } else if (action === "reject") {
      await Notification.create({
        from: currUserId,
        to: requesterId,
        type: "message",
        message: `${req.user.username} rejected your connection request`,
      });

      await connectionRequest.deleteOne();
      return res.status(200).json({ message: "Connection request rejected" });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, Connect Response failed!",
      error: err,
    });
  }
};

//Unconnect Controller
export const unconnectUser = async (req, res) => {
  try {
    const { id: targetUserId } = req.params;
    const currUserId = req.user._id;

    const targetProfile = await Profile.findOne({ user: targetUserId });
    const currProfile = await Profile.findOne({ user: currUserId });

    const isConnected =
      targetProfile.followers.includes(currUserId) &&
      currProfile.followers.includes(targetUserId);

    if (!isConnected) {
      return res.status(400).json({ message: "Connection not found" });
    }

    if (targetProfile.followers.includes(currUserId)) {
      targetProfile.followers.pull(currUserId);
    }
    if (targetProfile.following.includes(currUserId)) {
      targetProfile.following.pull(currUserId);
    }

    if (currProfile.followers.includes(targetUserId)) {
      currProfile.followers.pull(targetUserId);
    }
    if (currProfile.following.includes(targetUserId)) {
      currProfile.following.pull(targetUserId);
    }

    await currProfile.save();
    await targetProfile.save();

    const notification = await Notification.create({
      from: currUserId,
      to: targetUserId,
      type: "message",
      message: `${req.user.username} unconnected from you`,
    });

    return res.status(200).json({ message: "Unconnected successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, Unconnect failed!",
      error: err,
    });
  }
};

//Check Connection Status Controller
export const checkConnectionStatus = async (req, res) => {
  try {
    const { id: targetUserId } = req.params;
    const currUserId = req.user._id;

    const targetProfile = await Profile.findOne({ user: targetUserId });
    const currProfile = await Profile.findOne({ user: currUserId });

    if (!targetProfile) {
      return res.status(404).json({ message: "User Profile not found" });
    }

    const isFollowing = currProfile.following.includes(targetUserId);
    const isConnected =
      targetProfile.followers.includes(currUserId) &&
      currProfile.followers.includes(targetUserId);

    let connectStatus = "none";
    if (isConnected) {
      connectStatus = "connected";
    } else {
      const connection = await Notification.findOne({
        type: "connect",
        $or: [
          { from: currUserId, to: targetUserId },
          { from: targetUserId, to: currUserId },
        ],
      });
      if (!connection) {
        connectStatus = "not_connected";
      } else {
        connectStatus = "pending";
      }
    }

    return res.status(200).json({
      followStatus: isFollowing,
      connectStatus: connectStatus,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, failed fetch the status!",
      error: err,
    });
  }
};
