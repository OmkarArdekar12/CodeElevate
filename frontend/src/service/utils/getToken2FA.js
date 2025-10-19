export const getToken2fa = () => {
  try {
    const token2FA = localStorage.getItem("token2FA");

    if (!token2FA) {
      return null;
    }

    return token2FA;
  } catch (err) {
    return null;
  }
};
