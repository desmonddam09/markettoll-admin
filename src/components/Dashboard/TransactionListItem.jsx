import React from "react";

const TransactionListItem = () => {
  return (
    <>
      <div className="w-full hidden lg:flex flex-row items-center justify-between py-4 border-b">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-9 h-9 rounded-full bg-center bg-cover"
            />
            <p className="text-xs font-medium">Jane Smith</p>
          </div>
          <div>
            <p className="text-xs font-medium">$89</p>
          </div>
        </div>
        <p className="text-xs font-medium">$89</p>
        {/* <p className="text-xs font-medium">09:43 PM</p> */}
        <p className="text-xs font-medium">24 May, 2024</p>
        <p className="text-[10px] font-medium px-3 py-1.5 bg-green-200 rounded-md">
          Successfull
        </p>
      </div>
      {/* mobile responsive */}
      <div className="w-full flex lg:hidden flex-col items-start justify-between py-4 gap-3 border-b">
        <div className="w-full flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-8 h-8 rounded-full bg-center bg-cover"
            />
            <p className="text-xs font-medium">Jane Smith</p>
          </div>
          <p className="text-xs font-medium">$89</p>
        </div >
        <div className="w-full flex items-center justify-between">
          <p className="text-xs font-medium">09:43 PM</p>
          <p className="text-xs font-medium">24 May, 2024</p>
        </div>
        <p className="text-[10px] font-medium px-3 py-1.5 bg-green-200 rounded-full">
          Successfull
        </p>
      </div>
    </>
  );
};

export default TransactionListItem;
