import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getCityData } from "data-calls";
import { CityDVataResponse } from "types";
import { z } from "zod";
import { DailyForecast } from "~/components/DailyForecast";
import { HourlyForecast } from "~/components/HourlyForecast";

const $getData = createServerFn()
  .validator((params: { query: string }) => {
    return z
      .object({
        query: z.string(),
      })
      .parse(params);
  })
  .handler(async ({ data }) => {
    return (await getCityData(data.query)) as CityDVataResponse;
  });

export const Route = createFileRoute("/query/$query")({
  errorComponent: () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-xl">
          Cannot find any weather data for that search query
        </div>
      </div>
    );
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    return await $getData({
      data: {
        query: params.query,
      },
    });
  },
});

function RouteComponent() {
  const weatherData = useLoaderData({ from: "/query/$query" });
  //
  const { query } = useParams({ from: "/query/$query" });

  return (
    <div className="flex flex-col items-center gap-10 bg-blue-300 h-full">
      <h1>{query}</h1>
      <HourlyForecast />
      <DailyForecast />
    </div>
  );
}
