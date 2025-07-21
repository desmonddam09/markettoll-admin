import React, { useEffect, useState } from "react";
import Filter from "../components/Users/Filter";
import UserList from "../components/Users/UserList";

const Users = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.title = "Market-Toll - Users";
    };
    scrollToTop();
  }, []);
  const [filterData, setFilterData] = useState([]);
  const [UserCount, setUserCount] = useState(0);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">Users <span className="text-[#0098EA] text-sm" >({UserCount})</span></h1>
      <Filter setFilterData={setFilterData} />
      <UserList filterData={filterData} setUserCount={setUserCount} />
    </div>
  );
};

export default Users;
