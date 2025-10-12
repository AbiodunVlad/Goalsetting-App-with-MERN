"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <section className="flex flex-col mb-10">
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
