import { createBrowserRouter } from "react-router";
import { Layout } from "@/app/layout";
import { HomePage } from "@/app/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
