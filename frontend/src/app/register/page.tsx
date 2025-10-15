"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Spinner from "@/componets/Spinner";

// import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, phoneNumber, confirmPassword } = formData;

  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
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
  }, [user, isError, isLoading, isSuccess, message, dispatch, router]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      const userData = {
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <section className="flex flex-col mb-10 items-center">
        <h1 className="flex flex-row text-4xl text-center items-center font-extrabold mb-3">
          <FaUser /> Register
        </h1>
        <p>Please create an account.</p>
      </section>

      <section className="flex flex-col items-center sm:w-1/2 w-5/6">
        <form onSubmit={onSubmit} className="w-full gap-10 flex flex-col">
          <div className="">
            <input
              type="text"
              className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

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
              type="text"
              className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Enter your phone number"
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
              placeholder="Set your password"
              onChange={onChange}
            />
          </div>

          <div className="">
            <input
              type="password"
              className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="py-3 text-white text-center bg-[#000] rounded-md w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
