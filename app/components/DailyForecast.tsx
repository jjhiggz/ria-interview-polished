import { useLoaderData } from "@tanstack/react-router";
import { formatTemp } from "~/utils/temperature";

export const DailyForecast = () => {
  const data = useLoaderData({
    from: "/query/$query",
    select: (data) => data.daily,
  });

  return (
    <div className="flex flex-col gap-5 bg-white shadow-md p-2 rounded w-10/12">
      {data.slice(0, 7).map((day) => (
        <div className="flex flex-col justify-around items-center border-1 bg-slate-200 border-black rounded-lg w-32">
          <h3>Min: {formatTemp(day.temp.min)}</h3>
          <h3>Max: {formatTemp(day.temp.max)}</h3>
        </div>
      ))}
    </div>
  );
};
