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

  return (
    <div className="bg-[#d9d9d9]  w-full p-5 rounded-2xl flex flex-col justify-between shadow-sm items-center mb-5 gap-3">
      {goal.createdAt && (
        <div className="text-sm">
          {new Date(goal.createdAt).toLocaleString("en-US")}
        </div>
      )}
      <h2 className="text-xl font-bold">{goal.text}</h2>

      <button
        className=" bottom-0 left-14 mb-0 text-xs text-red-500 w-full"
        onClick={() => dispatch(deleteGoal(goal._id))}
      >
        Delete Todo
      </button>
    </div>
  );
}
