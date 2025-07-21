import React from "react";
import {NavLink} from "react-router-dom";

const SubCategoryListItem = () => {
  return (
    <tr className="">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-md object-cover object-center"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">Cloths</td>
      {/* <td className="px-6 lg:px-4 xl:px-3 py-4 flex justify-center gap-2">
        <NavLink to={'/subeditcategory'} className="w-auto px-3 py-1 bg-[#34C759] hover:opacity-80 text-white rounded-md text-xs">
          Edit
        </NavLink>
        <button className="w-auto px-3 py-1 bg-red-600 hover:opacity-80 text-white rounded-md text-xs">
          Delete
        </button>
      </td> */}
    </tr>
  );
};

export default SubCategoryListItem;
