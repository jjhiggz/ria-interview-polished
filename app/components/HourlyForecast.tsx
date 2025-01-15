import { useLoaderData } from "@tanstack/react-router";
import { formatTemp, kelvinToFarenheight } from "~/utils/temperature";
import dayjs from "dayjs";

export const HourlyForecast = () => {
  const weatherData = useLoaderData({
    from: "/query/$query",
    select: (data) => data.hourly,
  });

  return (
    <div className="flex justify-evenly gap-5 bg-white shadow-md p-2 rounded w-10/12 h-40">
      {weatherData.slice(0, 3).map((hour) => (
        <div className="flex flex-col justify-around items-center border-1 bg-slate-200 border-black rounded-lg w-32">
          <h3>{formatTemp(hour.temp)}</h3>
          <h3>{formatTemp(hour.dew_point)}%</h3>
        </div>
      ))}
    </div>
  );
};
