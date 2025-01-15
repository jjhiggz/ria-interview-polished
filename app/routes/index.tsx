import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [input, setInput] = useState("");
  const navigate = useNavigate({ from: "/" });
  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="bg-white/80 shadow-lg backdrop-blur-sm p-8 rounded-lg w-11/12 max-w-md">
        <h1 className="mb-6 font-bold text-3xl text-center text-gray-800">
          Weather Forecast
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!input || input.length === 0) {
              return toast.error("Please make a query before submitting");
            }
            navigate({
              to: "/query/$query",
              params: {
                query: input,
              },
            });
          }}
        >
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Enter city name..."
            className="border-gray-300 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md w-full font-semibold text-white transition-colors"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  );
}
