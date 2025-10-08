import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
});

//GitHub Stats Controller
export const githubStats = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username || typeof username !== "string" || username.trim() === "") {
      return res.status(400).json({ message: "Invalid gitHub username" });
    }

    const [userResponse, reposResponse] = await Promise.all([
      githubAPI.get(`/users/${username}`),
      githubAPI.get(`/users/${username}/repos?per_page=100`),
    ]);
    // const userResponse = await axios.get(
    //   `https://api.github.com/users/${username}`
    // );
    // const reposResponse = await axios.get(
    //   `https://api.github.com/users/${username}/repos?per_page=100`
    // );

    const user = userResponse.data;
    const repos = reposResponse.data || [];

    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );

    const githubData = {
      userId: user.login,
      name: user.name || username,
      avatarUrl: user.avatar_url || "",
      bio: user.bio || "",
      publicRepos: user.public_repos || 0,
      followers: user.followers || 0,
      following: user.following || 0,
      totalStars,
    };
    // console.log(githubData);
    return res.status(200).json(githubData);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res
        .status(404)
        .json({ message: "GitHub user not found", error: err });
    } else if (err.code === "ECONNABORTED") {
      return res
        .status(504)
        .json({ message: "GitHub API timeout. Try again later.", error: err });
    } else {
      // console.error("GitHub API Error:", err.message);
      return res.status(500).json({
        message: "Failed to fetch GitHub data",
        error: err,
      });
    }
  }
};
