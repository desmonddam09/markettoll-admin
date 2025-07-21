import React from "react";

const StatusIndicator = ({ adminStatus = "active" }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return {
          bgColor: "bg-green-100",
          dotColor: "bg-green-500",
          textColor: "text-green-700",
          text: "Active",
        };
      case "blocked":
        return {
          bgColor: "bg-red-100",
          dotColor: "bg-red-500",
          textColor: "text-red-700",
          text: "Blocked",
        };
      case "suspended":
      default:
        return {
          bgColor: "bg-orange-100",
          dotColor: "bg-orange-500",
          textColor: "text-orange-700",
          text: "Suspended",
        };
    }
  };

  const config = getStatusConfig(adminStatus);

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${config.bgColor} md:w-26 lg:w-24`}
    >
      <div className={`w-2 h-2 rounded-full ${config.dotColor} mr-2`} />
      <span className={`text-sm font-medium ${config.textColor}`}>
        {config.text}
      </span>
    </div>
  );
};

export default StatusIndicator;
