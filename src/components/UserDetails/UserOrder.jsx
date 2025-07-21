import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserOrder({ userId }) {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Order, SetOrder] = useState([]);
  const navigate=useNavigate("");
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    console.log(userId, "userIdd");

    fetch(`${BASE_URL}/admin/user-orders/${userId}?page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetOrder(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData]);
  console.log(Order, "oreraa");
  return (
    <div className="w-full overflow-x-auto h-[300px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-3 text-sm font-semibold"
            >
              Seller Name
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Seller Contact
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Delivery Address{" "}
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Total Price
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {Order?.map((item) => (
            <tr onClick={()=>{
              navigate(`/OrderDetail/${item?._id}`)
            }} className="cursor-pointer" >
              <th className="px-6 lg:px-4 xl:px-3 flex gap-3 py-4 font-normal text-gray-900">
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {item?.sellersProducts[0]?.seller.name}
                  </div>
                </div>
              </th>
              <td className="px-6 lg:px-4 xl:px-3 py-4">
                +{" "}
                {item?.sellersProducts[0]?.seller.phoneNumber.code +
                  " " +
                  item?.sellersProducts[0]?.seller.phoneNumber.value}
              </td>
              <td className="px-6 lg:px-4 xl:px-3 py-4">
                {item?.deliveryAddress &&
                  `${item?.deliveryAddress?.streetAddress}, ${item?.deliveryAddress?.apartment_suite}, ${item?.deliveryAddress?.city}, ${item?.deliveryAddress?.state}, ${item?.deliveryAddress?.country}, ${item?.deliveryAddress?.zipCode}`}
              </td>
              <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
