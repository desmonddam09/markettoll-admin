import React from "react";
import {NavLink} from "react-router-dom";

const CategoryListItem = ({item,setViewSubCatModal,SetViewCategories}) => {
  return (
    <tr className="cursor-pointer" onClick={()=>{
      setViewSubCatModal(true)
      SetViewCategories(item?.subCategories);
      }} >
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-md object-cover object-center"
            src={item?.image?item?.image:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt=""
          />         
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.name}</td>
    
    </tr>
  );
};

export default CategoryListItem;
