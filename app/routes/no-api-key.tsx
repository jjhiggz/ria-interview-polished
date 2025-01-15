import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { getApiKey, setApiKey } from "~/utils/weather-api-key";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const Route = createFileRoute("/no-api-key")({
  validateSearch: zodValidator({
    schema: z.object({
      redirectTo: z.string().optional(),
    }),
  }),
  component: RouteComponent,
  loaderDeps: (n) => n,
  loader: ({ deps: { search } }) => {
    const apiKey = getApiKey();
    if (apiKey) {
      throw redirect({ to: search.redirectTo ?? "/" });
    }
    return {};
  },
});

function RouteComponent() {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(apiKeyInput);
    router.invalidate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 p-8"
    >
      <input
        type="text"
        value={apiKeyInput}
        onChange={(e) => setApiKeyInput(e.target.value)}
        placeholder="Enter API Key"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        Submit
      </button>
      <p className="text-gray-600 text-sm">
        For more info on how to get your API key, please visit{" "}
        <a
          href="http://api.openweathermap.org"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeatherMap
        </a>
      </p>
    </form>
  );
}
