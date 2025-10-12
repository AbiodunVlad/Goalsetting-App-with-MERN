import Link from "next/link";
import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-blue-200 fixed flex flex-row w-full justify-between p-10 border border-b-[0.1px] border-b-[#cacaca]">
      <div className="">
        <Link href="/" className="font-extrabold">
          GoalSetter
        </Link>
      </div>

      <ul className="flex flex-row gap-7">
        <li>
          <Link href="/login" className="flex flex-row gap-2">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link href="/register" className="flex flex-row gap-2">
            <FaUser /> Register
          </Link>
        </li>
        {/* <li>
          <Link href="/dashboard" className="flex flex-row gap-2">
            Dashboard
          </Link>
        </li> */}
      </ul>
    </div>
  );
}
