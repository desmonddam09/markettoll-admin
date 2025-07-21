import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const InActiveUserListItem = ({ item, blockedUserId, setIsBlocked }) => {
  const { setBlockedModal } = useContext(AuthContext);
  const navigate = useNavigate("");

  return (
    <tr className="cursor-pointer">
      <th
        onClick={() => navigate(`/user/${blockedUserId}`,{state:{data:item}})}
        className="px-6 lg:px-4 xl:px-3 flex gap-3 items-center py-4 font-normal text-gray-900"
      >
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={
              item?.profileImage
                ? item?.profileImage
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt=""
          />
          {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{item?.name}</div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.email?.value}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        {item?.phoneNumber?.code + item?.phoneNumber?.value}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full ${
            item.adminStatus == "active"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }  px-2 py-1 text-xs font-semibold `}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              item.adminStatus == "active" ? " bg-green-600" : "bg-red-600"
            }`}
          ></span>
          {item?.adminStatus}
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 flex justify-center gap-2">
        <button
          onClick={() => {
            if (item.adminStatus === "active") {
              setBlockedModal(true);
              setIsBlocked(item.adminStatus);
              blockedUserId(item?._id);
            } else {
              setIsBlocked(false);
              setBlockedModal(item.adminStatus);
              blockedUserId(item?._id);
            }
          }}
          className={`w-auto px-3 py-1 ${
            item.adminStatus === "active"
              ? "bg-red-600 text-white"
              : "bg-red-50 text-red-600"
          } hover:opacity-80 rounded-md text-xs`}
        >
          {item.adminStatus === "active" ? "Block" : "Unblock"}
        </button>
      </td>
    </tr>
  );
};

export default InActiveUserListItem;
