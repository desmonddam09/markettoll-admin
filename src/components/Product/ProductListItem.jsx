import React from "react";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({ item }) => {
  const navigate = useNavigate("");
  return (
    <tr className="cursor-pointer"
    onClick={() => {
      navigate(`/productDetail/${item._id}`, { state: { data: item } });
    }}
    >
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900"
      >
        <div className="text-sm">
          <div className="font-medium text-gray-700 text-nowrap">
            {item.name}
          </div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.category}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
        {item.subCategory}
      </td>

      <td className="px-6 lg:px-4 xl:px-3 py-4">${item.price}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4"> {item.status}</td>
    </tr>
  );
};

export default ProductListItem;
