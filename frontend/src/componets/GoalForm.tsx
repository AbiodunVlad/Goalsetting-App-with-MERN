"use client";
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../lib/hooks";
import { createGoal } from "@/features/goals/goalSlice";

export default function GoalForm() {
  const [text, setText] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    dispatch(createGoal({ text, dateTime, location }));
    setText("");
    setDateTime("");
    setLocation("");
  };

  return (
    <section className="flex flex-col items-center sm:w-1/2 w-5/6 mb-5">
      <form onSubmit={onSubmit} className="w-full gap-10 flex flex-col">
        <div className="">
          <label htmlFor="text">Todo</label>
          <input
            type="text"
            placeholder="Enter activity"
            className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-10 w-full">
          <div className=" w-full">
            <label htmlFor="dateTime">When?</label>
            <input
              type="datetime-local"
              className=" p-3 border border-[#969696] rounded-lg w-full focus:outline-none"
              name="dateTime"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className=" w-full">
            <label htmlFor="text">Where?</label>
            <input
              type="text"
              placeholder="Enter location"
              className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            className="py-3 text-white text-center bg-[#000] rounded-md w-full cursor-pointer"
            type="submit"
          >
            Add Todo
          </button>
        </div>
      </form>
    </section>
  );
}
