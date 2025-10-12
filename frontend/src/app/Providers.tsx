"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../lib/store";

// import { usePathname } from "next/navigation";
import Navbar from "@/componets/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // const hideNavbar = ["/register"].includes(pathname);

  return (
    <div>
      {/* {!hideNavbar && <Navbar />} */}
      <Navbar />
      <Provider store={store}>{children}</Provider>;
    </div>
  );
}
