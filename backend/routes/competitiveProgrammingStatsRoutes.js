import express from "express";
import axios from "axios";

const router = express.Router();

//Codeforces Stats Route/API
router.get("/api/codeforces/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Codeforces data" });
  }
});

export default router;
