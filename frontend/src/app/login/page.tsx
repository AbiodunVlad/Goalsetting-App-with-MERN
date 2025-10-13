"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Spinner from "@/componets/Spinner";

import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useAppDispatch();

  const { user, isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      router.push("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, router]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <section className="flex flex-col mb-10">
        <h1 className="flex flex-row text-4xl text-center items-center font-extrabold mb-3">
          <FaSignInAlt /> Login
        </h1>
        <p>Login to continue.</p>
      </section>

      <section className="flex flex-col items-center sm:w-1/2 w-5/6">
        <form onSubmit={onSubmit} className="w-full gap-10 flex flex-col">
          <div className="">
            <input
              type="email"
              className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="">
            <input
              type="password"
              className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="py-3 text-white text-center bg-[#000] rounded-md w-full"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
