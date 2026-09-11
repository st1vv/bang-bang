import { createBrowserRouter, redirect } from "react-router";
import { Layout } from "@/app/layout";
import { HomePage } from "@/app/home";
import { CollagePage } from "@/app/collage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "collage", element: <CollagePage /> },
      // Anything else lands back on the collection.
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
