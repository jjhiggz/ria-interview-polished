import {
  createFileRoute,
  redirect,
  useNavigate,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import { DailyForecast } from "~/components/DailyForecast";
import { HourlyForecast } from "~/components/HourlyForecast";
import { getCityData } from "~/data-calls";
import { deleteApiKey, getApiKey } from "~/utils/weather-api-key";

const $getData = createServerFn()
  .validator((params: { query: string }) => {
    return z
      .object({
        query: z.string(),
      })
      .parse(params);
  })
  .handler(async ({ data }) => {
    return await getCityData({ query: data.query, apiKey: "" });
  });

export const Route = createFileRoute("/query/$query")({
  errorComponent: () => {
    const navigate = useNavigate();
    const params = useParams({ from: "/query/$query" });
    return (
      <div className="flex flex-col flex-1 justify-center items-center gap-4">
        <div className="text-gray-600 text-xl">
          Cannot find any weather data for that search query
        </div>
        <div className="text-gray-600">
          If you think that your api key may be wrong please{" "}
          <button
            onClick={() => {
              deleteApiKey();
              navigate({
                to: "/no-api-key",
                search: { redirectTo: `/query/${params.query}` },
              });
            }}
            className="text-blue-500 hover:underline"
          >
            reset it here
          </button>
        </div>
      </div>
    );
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw redirect({
        to: "/no-api-key",
        search: {
          redirectTo: `/query/${params.query}`,
        },
      });
    }
    return await $getData({
      data: {
        query: params.query,
      },
    });
  },
});

function RouteComponent() {
  const { query } = useParams({ from: "/query/$query" });
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center gap-10 bg-blue-300">
      <h1 className="drop-shadow-lg mt-8 font-bold text-4xl text-white capitalize tracking-wide">
        {query.split(",")[0]}
      </h1>
      <HourlyForecast />
      <DailyForecast />
      <button
        onClick={() => router.invalidate()}
        className="bg-blue-500 hover:bg-blue-600 mb-8 px-4 py-2 rounded-md font-semibold text-white transition-colors"
      >
        Refresh Data
      </button>
    </div>
  );
}
