import React, { useEffect, useState } from "react";
import Filter from "../components/InActive/Filter";
import InActiveUserList from "../components/InActive/InActiveUserList";

const InActiveUser = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Users";
    };
    scrollToTop()
  }, []);
  const [filterData,setFilterData]=useState([])

  return (
    <div className="w-full flex flex-col gap-y-4">
         <h1 className="text-xl font-bold">InActive Users</h1>
      <Filter  setFilterData={setFilterData} />
      <InActiveUserList filterData={filterData} />
    </div>
  );
};

export default InActiveUser;
