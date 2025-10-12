"use client";

import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full overflow-hidden">
        <Dashboard />
      </div>
    </>
  );
}
