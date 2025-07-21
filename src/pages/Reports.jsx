import React, { useEffect } from "react";
import ReportList from "../components/Reports/ReportList";

const Reports = () => {
  
  useEffect(() => {
    document.title = "Market-Toll - Reports";
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Reported Users</h1>
      <ReportList />
    </div>
  );
};

export default Reports;
