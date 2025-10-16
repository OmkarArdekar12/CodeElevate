export const getToken2fa = () => {
  try {
    const token2FA = sessionStorage.getItem("token2FA");

    if (!token2FA) {
      return null;
    }

    return token;
  } catch (err) {
    return null;
  }
};
