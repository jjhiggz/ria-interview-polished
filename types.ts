import { z } from "zod";

export const weatherSchema = z.object({
  id: z.number(),
  main: z.enum(["Clear", "Clouds"]),
  description: z.enum([
    "broken clouds",
    "clear sky",
    "few clouds",
    "overcast clouds",
    "scattered clouds",
  ]),
  icon: z.enum(["01d", "01n", "02n", "03d", "03n", "04d", "04n"]),
});

export const tempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

export const feelsLikeSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

export const currentSchema = z.object({
  dt: z.number(),
  sunrise: z.number().optional(),
  sunset: z.number().optional(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  weather: z.array(weatherSchema),
  wind_gust: z.number().optional(),
  pop: z.number().optional(),
});

export const dailySchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  summary: z.string(),
  temp: tempSchema,
  feels_like: feelsLikeSchema,
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number(),
  weather: z.array(weatherSchema),
  clouds: z.number(),
  pop: z.number(),
  uvi: z.number(),
});

export const minutelySchema = z.object({
  dt: z.number(),
  precipitation: z.number(),
});

export const cityDataResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: currentSchema,
  minutely: z.array(minutelySchema),
  hourly: z.array(currentSchema),
  daily: z.array(dailySchema),
});

export type Weather = z.infer<typeof weatherSchema>;
export type Temp = z.infer<typeof tempSchema>;
export type FeelsLike = z.infer<typeof feelsLikeSchema>;
export type Current = z.infer<typeof currentSchema>;
export type Daily = z.infer<typeof dailySchema>;
export type Minutely = z.infer<typeof minutelySchema>;
export type CityDataResponse = z.infer<typeof cityDataResponseSchema>;
