"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import GoalForm from "@/componets/GoalForm";
import Spinner from "@/componets/Spinner";
import { getGoals, reset } from "@/features/goals/goalSlice";
import GoalItem from "@/componets/GoalItem";

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // const goalState = useAppSelector((state) => state.goal);
  // console.log("Goal slice from Redux", goalState);

  const { goals, isLoading, isError, message } = useAppSelector(
    (state) => state.goal
  );

  useEffect(() => {
    // if (!isError) {
    //   console.log(message);
    // }

    if (!user) {
      router.push("/login");
    }

    if (user?.token) {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, router, dispatch, isError, message]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   if (isError) console.log(message);
  // }, [isError, message]);

  if (!isClient) return null;

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <div className="flex flex-col mb-10">
        <h1 className="flex flex-row text-4xl text-center items-center font-extrabold mb-3">
          Welcome {user && user.name}
        </h1>
        <p className="text-center">Goals Dashboard</p>
      </div>
      <GoalForm />

      <section className="">
        {goals.length > 0 ? (
          <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals.</h3>
        )}
      </section>
    </div>
  );
}
