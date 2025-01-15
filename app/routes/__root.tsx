import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { useState } from "react";
import { BiBarChart, BiBattery, BiSearch } from "react-icons/bi";
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

function RootComponent() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  return (
    <RootDocument>
      <header className="flex flex-col border-2 bg-blue-500 w-full text-3xl">
        <div className="flex justify-end bg-blue-800 text-lg text-white">
          {/* Device Settings */}
          <div className="flex px-5 p-3">
            <BiBattery />
            <BiBarChart />
          </div>
        </div>
        <div className="flex justify-between items-center px-4 p-3 text-white">
          <h1>Simple Weather</h1>
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
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
              className="text-black text-lg"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />

            <Link
              to="/query/$query"
              params={{
                query: searchInput,
              }}
            >
              <BiSearch className="flex items-center" />
            </Link>
          </form>
        </div>
      </header>
      <Outlet />
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
        <hr />
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
