import { Outlet } from "react-router";

import { CityBackground } from "@/app/layout/city-background";
import { Footer } from "@/app/layout/footer";
import { Header } from "@/app/layout/header";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <CityBackground />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
