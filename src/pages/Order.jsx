import React, { useEffect, useState } from "react";
import OrderList from "../components/Order/OrderList";
import OrderFilter from "../components/Order/OrderFilter";


const Order = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.title = "Market-Toll - Order";
    };
    scrollToTop()
  }, []);
  const [filterData, setFilterData] = useState("")
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">Order</h1>
      <OrderFilter setFilterData={setFilterData} />
      <OrderList filterData={filterData} />
    </div>
  );
};

export default Order;
