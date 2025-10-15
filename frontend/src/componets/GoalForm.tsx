"use client";
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../lib/hooks";
import { createGoal } from "@/features/goals/goalSlice";

export default function GoalForm() {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="flex flex-col items-center sm:w-1/2 w-5/6 mb-5">
      <form onSubmit={onSubmit} className="w-full gap-10 flex flex-col">
        <div>
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            className="p-3 border border-[#969696] rounded-lg w-full flex items-center focus:outline-none"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <button
            className="py-3 text-white text-center bg-[#000] rounded-md w-full"
            type="submit"
          >
            Add Todo
          </button>
        </div>
      </form>
    </section>
  );
}
