import React from "react";
import { Goal } from "@/types/goal";
import { useAppDispatch } from "../../lib/hooks";
import { deleteGoal } from "@/features/goals/goalSlice";

// type Goal = {
//   _id: string;
//   text: string;
//   createdAt?: string;
// };

interface GoalItemProps {
  goal: Goal;
}

export default function GoalItem({ goal }: GoalItemProps) {
  const dispatch = useAppDispatch();

  const formatDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) return null;

    const date = new Date(dateTimeString);
    const now = new Date();

    // Normalize times to midnight for date-only comparison
    const today = new Date(now.setHours(0, 0, 0, 0));
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const goalDate = new Date(date);
    const goalDateOnly = new Date(goalDate.setHours(0, 0, 0, 0));

    // Format time
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

    // Determine label (Today, Tomorrow, or Day)
    let dayLabel = "";
    if (goalDateOnly.getTime() === today.getTime()) {
      dayLabel = "Today";
    } else if (goalDateOnly.getTime() === tomorrow.getTime()) {
      dayLabel = "Tomorrow";
    } else {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      dayLabel = daysOfWeek[goalDate.getDay()];
    }

    // Format date (dd/mm/yyy)
    const day = goalDate.getDate().toString().padStart(2, "0");
    const month = (goalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = goalDate.getFullYear();

    return `${dayLabel}, ${day}/${month}/${year} at ${formattedTime}`;
  };

  return (
    <div className="bg-[#000000]  w-full sm:p-5 p-2 rounded-2xl flex flex-col justify-between shadow-sm items-center mb-5 gap-3">
      <div className="flex flex-col items-center mb-4">
        {goal.createdAt && (
          <div className="sm:text-sm text-[#ffd700] mb-3">
            Time set:{" "}
            <span className="text-white">{formatDateTime(goal.createdAt)}</span>
          </div>
        )}

        <h2 className="sm:text-sm text-xs text-white font-bold uppercase ">
          {goal.text}
        </h2>
      </div>

      <div className="flex flex-col text-center">
        {goal.dateTime && (
          <p className="sm:text-sm text-[#ffd700] mb-3">
            Target time:{" "}
            <span className="text-white">{formatDateTime(goal.dateTime)}</span>
          </p>
        )}
        <p className="text-white text-lg font-bold uppercase">
          {goal.location}
        </p>
      </div>

      <button
        className=" bottom-0 left-14 mb-0 text-sm text-red-500 w-full cursor-pointer"
        onClick={() => dispatch(deleteGoal(goal._id))}
      >
        x Delete Todo x
      </button>
    </div>
  );
}
