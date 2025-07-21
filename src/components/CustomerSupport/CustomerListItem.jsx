import React from "react";
import { Link } from "react-router-dom";

const CustomerListItem = ({handleShowModal,item,TicketResolved}) => {
  return (
    <tr className="">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={item.user.profileImage}
            alt=""
          />          
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{item?.user?.name}</div>
          <div mailto:classname="text-gray-400">{item?.user?.email.value}</div>
        </div>
      </th>   
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.description}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span className={`inline-flex items-center gap-1 rounded-full  ${item?.status=="active"?"bg-green-50 text-green-600":"bg-red-50 text-red-600"}  px-2 py-1 text-xs font-semibold `}>
          <span className={`h-1.5 w-1.5 rounded-full ${item.adminStatus=="active"?" bg-green-600":"bg-red-600"}`}></span>
          {item?.status}
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 flex justify-center gap-2">
        <button disabled={item?.status=="closed"?true:false} onClick={()=>handleShowModal(item._id)} className="w-auto px-3 py-1 bg-[#0098EA] hover:opacity-80 text-white rounded-md text-xs">
          Reply
        </button>
        <button disabled={item?.status=="closed"?true:false}  onClick={()=>TicketResolved(item._id)} className="w-auto px-3 py-1 bg-red-600 hover:opacity-80 text-white rounded-md text-xs">
          Ticket Resolved
        </button>
      </td>
    </tr>
  );
};

export default CustomerListItem;
