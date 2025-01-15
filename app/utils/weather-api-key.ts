export const getApiKey = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("api-key")
    : process.env.WEATHER_API_KEY;
};

export const setApiKey = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem("api-key", key);
  }
  return null;
};

export const deleteApiKey = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem("api-key");
  }
  return null;
};
