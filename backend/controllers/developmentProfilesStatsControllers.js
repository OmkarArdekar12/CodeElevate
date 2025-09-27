import axios from "axios";

export const githubStats = async (req, res) => {
  const { username } = req.params;
  try {
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const user = userResponse.data;
    const repos = reposResponse.data;

    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );
    const githubData = {
      userId: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
    };
    // console.log(githubData);
    res.json(githubData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch GitHub data", error: error.message });
  }
};
