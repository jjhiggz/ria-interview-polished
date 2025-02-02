import toast, { Toaster } from "react-hot-toast";
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Tooltip } from "react-tooltip";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { useState } from "react";
import {
  BiBarChart,
  BiBattery,
  BiHome,
  BiSearch,
  BiSolidBattery,
  BiSolidBatteryLow,
} from "react-icons/bi";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});
const icons = [
  <div
    data-tooltip-id="battery-tooltip"
    data-tooltip-content="Beep boop... running low! Send help!"
  >
    <BiBattery className="w-5 h-5 text-red-200" />
  </div>,
  <div
    data-tooltip-id="battery-tooltip"
    data-tooltip-content="Half full or half empty? Philosopher battery!"
  >
    <BiSolidBatteryLow className="w-5 h-5 text-yellow-200" />
  </div>,
  <div
    data-tooltip-id="battery-tooltip"
    data-tooltip-content="Fully charged and ready to party!"
  >
    <BiSolidBattery className="w-5 h-5 text-green-200" />
  </div>,
];

function RootComponent() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <RootDocument>
      <div className="flex flex-col bg-red-100 h-screen">
        <header className="flex flex-col w-full">
          <div className="flex justify-end bg-gray-900 px-4 py-1 text-white">
            <div className="flex items-center gap-2 text-sm">
              <Tooltip id="battery-tooltip" />
              {icons[currentIconIndex]}
              <BiBarChart className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex justify-between items-center mx-auto max-w-7xl">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <BiHome className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-2xl text-white">
                  Simple Weather
                </h1>
              </div>
              <form
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!searchInput || searchInput.length === 0) {
                    return toast.error("Please make a query before submitting");
                  }
                  navigate({
                    to: "/query/$query",
                    params: {
                      query: searchInput,
                    },
                  });
                }}
              >
                <input
                  type="text"
                  placeholder="Search city or state..."
                  className="bg-transparent w-40 text-sm text-white focus:outline-none placeholder-white/70"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <BiSearch className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="flex flex-col flex-1">
          <Outlet />
        </main>
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 1000,
          }}
        />
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
