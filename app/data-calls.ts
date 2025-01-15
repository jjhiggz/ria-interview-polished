import { CityDataResponse, cityDataResponseSchema } from "types";
import { z, ZodSchema } from "zod";

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
  <Schema extends ZodSchema>({ schema }: { schema: Schema }) =>
  (input: any) => {
    const data = schema.safeParse(input);
    if (!data.success) {
      throw data.error;
    }

    return data.data as z.infer<Schema>;
  };

const getLatAndLong = ({
  query,
  apiKey,
}: {
  query: string;
  apiKey: string;
}) => {
  return fetch(
    `${baseUrl}/geo/1.0/direct?q=${query}&limit=${limit}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then(
      parseWithBetterMessage({
        schema: z.array(latLongResponseSchema),
      })
    )
    .then((result) => result);
};

export const getCityData = async ({
  query,
  apiKey,
}: {
  query: string;
  apiKey: string;
}): Promise<CityDataResponse> => {
  const latAndLongsBySearch = await getLatAndLong({ query: query, apiKey });
  const city = latAndLongsBySearch.find(
    (latAndLong) => latAndLong.name.toLowerCase() === query.toLowerCase()
  );
  if (!city) {
    throw new Error("City not found");
  }

  const url = `${baseUrl}/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => cityDataResponseSchema.parse(data));
};
