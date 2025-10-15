"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../lib/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { usePathname } from "next/navigation";
import Navbar from "@/componets/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // const hideNavbar = ["/register"].includes(pathname);

  return (
    <div>
      <Provider store={store}>
        {/* {!hideNavbar && <Navbar />} */}
        <Navbar />
        {children}
        <ToastContainer
        // position="top-right"
        // autoClose={3000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // pauseOnHover
        // draggable
        // theme="colored"
        />
      </Provider>
    </div>
  );
}
