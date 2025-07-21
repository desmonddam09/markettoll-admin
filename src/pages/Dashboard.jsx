import React, { useEffect } from "react";
import RevenueAndUsersBarChart from "../components/Dashboard/RevenueAndUsersBarChart";
import NewUsersList from "../components/Dashboard/NewUsersList";
import LatestTransactions from "../components/Dashboard/LatestTransactions";
import Analytics from "../components/Dashboard/Analytics";

const Dashboard = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Dashboard";
    };
    scrollToTop()
  }, []);
  
  return (
    <div className="w-full flex flex-col gap-y-5">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* <Analytics/> */}
      <RevenueAndUsersBarChart />
      <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-6">      
        <NewUsersList />
      </div>
    </div>
  );
};

export default Dashboard;
