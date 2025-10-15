"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { logout, reset } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // ensures code runs only after hydration
    setIsClient(true);
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.push("/dashboard");
  };

  // Don’t render anything until after hydration
  if (!isClient) return null;

  return (
    <div className="bg-blue-200 fixed flex flex-row w-full justify-between p-10 border border-b-[0.1px] border-b-[#cacaca]">
      <div className="">
        <Link href="/" className="font-extrabold">
          TodoSetter
        </Link>
      </div>

      <ul className="flex flex-row gap-7">
        {user ? (
          <li>
            <button onClick={onLogout} className="flex flex-row gap-2">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
}
