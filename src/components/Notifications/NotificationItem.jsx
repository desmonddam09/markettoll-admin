import React from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const NotificationItem = ({ item }) => {
  const localDate = item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "";

  return (
    <div className="w-full flex rounded-lg border border-gray-200 p-4 text-left text-gray-600 sm:p-4 gap-1 justify-start">
      <IoNotificationsCircleSharp className="block h-16 w-16" />
      <div className="w-full text-left">
        <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row pt-2">
          <h3 className="font-semibold text-base">{item?.title}</h3>
          <time className="text-xs" datetime={item?.createdAt}>
            {localDate}
          </time>
        </div>
        <p className="text-sm">{item?.body}</p>
        <div>
          <span className={` text-sm font-thik ${item?.sentDate?"text-green-600":"text-red-600"}`} >{item?.sentDate?"Sent":"Pending"}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

