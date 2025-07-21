import React from "react";

const PackagesListItem = ({item}) => {
  return (
    <tr className="">
      <td className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">      
        <div className="text-sm">
          <div className="font-medium text-gray-700">{item.seller.name}</div>
          <div mailto:classname="text-gray-400">{item.seller.email.value}</div>
        </div>
      </td>
    
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item.boostPlan.name}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item.boostPlan.price}</td>      
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item.boostPlan.purchasedAt}</td>

    </tr>
  );
};

export default PackagesListItem;
