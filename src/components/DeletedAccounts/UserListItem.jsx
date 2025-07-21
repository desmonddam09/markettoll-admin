import React from "react";
import { Link } from "react-router-dom";

const DeletedUserListItem = ({item}) => {
  return (
    <tr className="">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
         
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{item?.name}</div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.email.value}</td>

      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.phoneNumber?.code+item?.phoneNumber?.value}</td>
    </tr>
  );
};

export default DeletedUserListItem;
