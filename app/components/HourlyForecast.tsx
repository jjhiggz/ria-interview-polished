import { useLoaderData } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { formatTemp } from "~/utils/temperature";
import dayjs from "dayjs";
import { getDayPeriodIcon } from "~/utils/time";
import { BiMoon, BiSun } from "react-icons/bi";

export const HourlyForecast = () => {
  const weatherData = useLoaderData({
    from: "/query/$query",
    select: (data) => data.hourly,
  });

  return (
    <div className="w-10/12">
      <div className="flex flex-col bg-white shadow-md p-4">
        <h2 className="mb-2 font-semibold text-lg">Daily Forecast</h2>
        <div className="flex gap-5 rounded-l w-full overflow-x-scroll">
          {weatherData.slice(0, 24).map((hour) => (
            <div key={hour.dt} className="flex flex-col items-center gap-2 p-2">
              <span className="text-gray-600 text-sm">
                {dayjs.unix(hour.dt).format("ha")}
              </span>
              {match(getDayPeriodIcon(hour.dt))
                .with("moon", () => <BiMoon />)
                .with("sun", () => <BiSun />)
                .with("rising sun", () => <BiSun color="gold" />)
                .with("setting sun", () => <BiSun color="red" />)
                .exhaustive()}
              <span className="font-medium text-sm">
                {formatTemp(hour.temp)}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
