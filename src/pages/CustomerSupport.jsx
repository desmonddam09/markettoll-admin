import React, { useEffect, useState } from "react";
import CustomerList from "../components/CustomerSupport/CustomerList";
import Filter from "../components/Users/Filter";

const Customer = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.title = "Market-Toll - Customer";
    };
    scrollToTop()
  }, []);
  const [filterData, setFilterData] = useState("")
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">Email Support</h1>
      <Filter setFilterData={setFilterData} />
      <CustomerList filterData={filterData} />
    </div>
  );
};

export default Customer;
