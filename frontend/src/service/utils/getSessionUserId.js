export const getSessionUserId = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser.userId;

    if (!userId) {
      return null;
    }

    return userId;
  } catch (err) {
    return null;
  }
};
