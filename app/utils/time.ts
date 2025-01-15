import dayjs from "dayjs";

export const getDayPeriodIcon = (
  timestamp: number
): "sun" | "moon" | "rising sun" | "setting sun" => {
  const hour = dayjs.unix(timestamp).hour();

  if (hour >= 6 && hour < 8) return "rising sun";
  if (hour >= 8 && hour < 18) return "sun";
  if (hour >= 18 && hour < 20) return "setting sun";
  return "moon";
};
