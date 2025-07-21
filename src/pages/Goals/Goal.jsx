import React, { useContext, useState } from "react";
import GoalList from "../../components/Goal/GoalList";
import AddGoal from "../../components/Goal/AddGoal";
import { AuthContext } from "../../context/AuthContext";

export default function Goal() {
  const { isUserData, loader } = useContext(AuthContext);
    const [isGoal,setIsGoal]=useState(false);
  return (
    <div>
      <h1 className="text-xl font-bold"> Goals</h1>
      
      <GoalList setIsGoal={setIsGoal} />
      <AddGoal isGoal={isGoal}/>
    </div>
  );
}
