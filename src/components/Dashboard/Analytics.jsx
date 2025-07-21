import React from "react";
import { GrGroup } from "react-icons/gr";

const Analytics = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="flex items-start justify-between p-5 border rounded-xl">
        <div>
          <p className="text-sm font-normal text-gray-500">Users</p>
          <h1 className="text-xl font-semibold">1,456</h1>
        </div>
        <div className="w-12 h-12 bg-yellow-100 p-3 rounded-xl"></div>
      </div>
      <div className="flex items-start justify-between p-5 border rounded-xl">
        <div>
          <p className="text-sm font-normal text-gray-500">Revenue</p>
          <h1 className="text-xl font-semibold">$1,456</h1>
        </div>
        <div className="w-12 h-12 bg-yellow-100 p-3 rounded-xl"></div>
      </div>
      <div className="flex items-start justify-between p-5 border rounded-xl">
        <div>
          <p className="text-sm font-normal text-gray-500">Groups</p>
          <h1 className="text-xl font-semibold">1,456</h1>
        </div>
        <div className="w-12 h-12 bg-yellow-100 p-3 rounded-xl">
            <GrGroup className="w-full h-full text-yellow-500"/>
        </div>
      </div>
      <div className="flex items-start justify-between p-5 border rounded-xl">
        <div>
          <p className="text-sm font-normal text-gray-500">Users</p>
          <h1 className="text-xl font-semibold">1,456</h1>
        </div>
        <div className="w-12 h-12 bg-yellow-100 p-3 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Analytics;
