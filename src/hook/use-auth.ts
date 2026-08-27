export const getAuth = () => {
  if (typeof window !== "undefined") {
    return {
      token: sessionStorage.getItem("accessToken"),
      user: JSON.parse(sessionStorage.getItem("userData") || "null"),
    };
  }
  return { token: null, user: null };
};
