import { useLoaderData } from "@tanstack/react-router";
import { formatTemp } from "~/utils/temperature";

export const DailyForecast = () => {
  const data = useLoaderData({
    from: "/query/$query",
    select: (data) => data.daily,
  });

  return (
    <div className="bg-white shadow-md p-4 rounded w-10/12">
      <h2 className="mb-2 font-semibold text-lg">Daily Forecast</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Day</th>
              <th className="p-2">Min Temp</th>
              <th className="p-2">Max Temp</th>
              <th className="p-2">Humidity</th>
              <th className="p-2">Wind Speed</th>
              <th className="p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 7).map((day) => (
              <tr
                key={day.dt}
                className="hover:bg-gray-50 border-b whitespace-nowrap"
              >
                <td className="p-2 font-medium">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </td>
                <td className="p-2 text-center">{formatTemp(day.temp.min)}°</td>
                <td className="p-2 text-center">{formatTemp(day.temp.max)}°</td>
                <td className="p-2 text-center">{day.humidity}%</td>
                <td className="p-2 text-center">{day.wind_speed} m/s</td>
                <td className="p-2 text-center capitalize">
                  {day.weather[0].description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
