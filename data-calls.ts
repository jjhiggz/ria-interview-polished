import { CityDataResponse, cityDataResponseSchema } from "types";
import { z, ZodSchema } from "zod";

const API_KEY = z.string().min(5).parse(process.env.WEATHER_API_KEY);

export const latLongResponseSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string(),
});
export type LatLongResponse = z.infer<typeof latLongResponseSchema>;

const baseUrl = "http://api.openweathermap.org";

const limit = 10;
const parseWithBetterMessage =
  <Schema extends ZodSchema>(tag: string, schema: Schema) =>
  (input: any) => {
    const data = schema.safeParse(input);
    if (!data.success) {
      console.error(`Error parsing ${tag}`);
      console.error(input);
      console.error("Is Not valid, here is your error message");
      throw data.error;
    }

    return data.data as z.infer<Schema>;
  };

const getLatAndLong = (query: string) => {
  return fetch(
    `${baseUrl}/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`
    // `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then(
      parseWithBetterMessage("latLongResponse", z.array(latLongResponseSchema))
    )
    .then((result) => result);
};

export const getCityData = async (
  cityName: string
): Promise<CityDataResponse> => {
  const latAndLongsBySearch = await getLatAndLong(cityName);
  const city = latAndLongsBySearch.find(
    (latAndLong) => latAndLong.name.toLowerCase() === cityName.toLowerCase()
  );
  if (!city) {
    throw new Error("City not found");
  }

  return fetch(
    `${baseUrl}/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => cityDataResponseSchema.parse(data));
};

// dummy
