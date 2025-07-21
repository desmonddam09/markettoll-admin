import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

export default function UserListing({ userId, userData }) {
  const navigate = useNavigate("");
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Product, SetProduct] = useState([]);
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    console.log(userId, "userIdd");

    fetch(`${BASE_URL}/admin/user-listings/${userId}?page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetProduct(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData]);

  return (
    <div>
      <div className="w-full overflow-x-auto h-[300px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full mt-4  border-collapse  text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Sub Category
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {Product?.map((item) => (
              <tr
                onClick={() => {
                  navigate(`/productDetail/${item?._id}`, {
                    state: { data: { ...item, seller: userData } },
                  });
                }}
                className="cursor-pointer"
              >
                <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700 text-nowrap">
                      {item?.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
                  {item?.category}
                </td>
                <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
                  {item?.subCategory}
                </td>

                <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.price}</td>
                <td className="px-6 lg:px-4 xl:px-3 py-4"> {item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
