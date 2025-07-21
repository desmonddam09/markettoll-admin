import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
export default function UserSubscription({ userId }) {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Subscription, SetSubscription] = useState([]);
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/user-subscriptions/${userId}?page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetSubscription(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData]);
  console.log(Subscription, "subscription");
  return (
    <div className="w-full overflow-x-auto h-[300px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">          
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
            >
              Package
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
            >
              Amount
            </th>
            {/* <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
            >
              Status
            </th> */}
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2 py-4 rounded-r-lg text-sm font-semibold"
            >
              Renewed At
            </th>
          </tr>
        </thead>
        <tbody className="divide-y  divide-gray-100 border-t border-gray-100">
          {Subscription?.map((item) => (
            <tr className="">
             
              <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.name}</td>
              <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.price}</td>
              {/* <td className="px-6 lg:px-4 xl:px-3 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  Status
                </span>
              </td> */}
              <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.renewedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
