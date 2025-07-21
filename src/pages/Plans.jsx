import React, { useEffect } from "react";

const Plans = () => {
  
  useEffect(() => {
    document.title = "Market-Toll - Plans";
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Subscription Plans</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="flex flex-col items-center justify-center rounded-lg p-8 gap-4 bg-black text-white">
          <p className="text-sm font-medium text-gray-300">Plan 1</p>
          <h1 className="text-2xl font-semibold">
            $9.00<sub className="text-sm font-normal">/month</sub>
          </h1>
          <p className="text-sm font-normal text-gray-300">Feature 1</p>
          <p className="text-sm font-normal text-gray-300">Feature 2</p>
          <p className="text-sm font-normal text-gray-300">Feature 3</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg p-8 gap-4 bg-black text-white">
          <p className="text-sm font-medium text-gray-300">Plan 2</p>
          <h1 className="text-2xl font-semibold">
            $25.00<sub className="text-sm font-normal">/3 month</sub>
          </h1>
          <p className="text-sm font-normal text-gray-300">Feature 1</p>
          <p className="text-sm font-normal text-gray-300">Feature 2</p>
          <p className="text-sm font-normal text-gray-300">Feature 3</p>
          {/* <button className="text-sm font-medium underline text-blue-600">
            Edit
          </button> */}
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg p-8 gap-4 bg-black text-white">
          <p className="text-sm font-medium text-gray-300">Plan 3</p>
          <h1 className="text-2xl font-semibold">
            $49.00<sub className="text-sm font-normal">/6 month</sub>
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg p-8 gap-4 bg-black text-white">
          <p className="text-sm font-medium text-gray-300">Plan 4</p>
          <h1 className="text-2xl font-semibold">
            $99.00<sub className="text-sm font-normal">/year</sub>
          </h1>
          <p className="text-sm font-normal text-gray-300">Feature 1</p>
          <p className="text-sm font-normal text-gray-300">Feature 2</p>
          <p className="text-sm font-normal text-gray-300">Feature 3</p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
