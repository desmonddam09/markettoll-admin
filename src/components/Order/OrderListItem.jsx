import React from "react";
import { useNavigate } from "react-router-dom";

const OrderListItem = ({ item }) => {
  const deliveryAddress = item?.deliveryAddress;
  const formattedAddress = `${deliveryAddress?.streetAddress}, ${deliveryAddress?.apartment_suite}, ${deliveryAddress?.city}, ${deliveryAddress?.state}, ${deliveryAddress?.country}, ${deliveryAddress?.zipCode}`;
  const navigate=useNavigate("");
 
  
  return (
    <tr onClick={()=>{
      navigate(`/OrderDetail/${item?._id}`)
    }} className="cursor-pointer">
      <th  className="px-6 lg:px-4 xl:px-3 flex gap-3 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">
            {item?.placerDetails?.name}
          </div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        {item?.placerDetails?.email?.value}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-xs">{formattedAddress}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.total}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{new Date(item?.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit"}) }</td>
      {/* <td className="px-6 lg:px-4 xl:px-3 py-4">
        {" "}
        <button className="w-auto px-3 py-1 bg-[#0098EA] text-nowrap hover:opacity-80 text-white rounded-md text-xs">
          Order Detail
        </button>
      </td> */}
    </tr>
  );
};

export default OrderListItem;
