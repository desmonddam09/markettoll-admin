import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

export default function GoalAchiverList() {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Achiever, setAchiever] = useState([]);
  const token = isUserData?.token;
  useEffect(() => {
    setLoader(true);

    fetch(`${BASE_URL}/admin/goal-achievers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAchiever(res?.data);
        console.log(res?.data, "SetNotifications");

        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, []);
  return (
    <div className="flex flex-col mt-5">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F2F2F2]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    User
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Referral Done
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Referral Rate
                  </th>

                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Achiever?.length > 0 ? (
                  Achiever?.map((item, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              item?.profileImage
                                ? item?.profileImage
                                : "/circle.png"
                            }
                            className="w-10"
                            alt="circle.png"
                          />
                          <div>
                            <p className="text-[14px] font-[400] text-[#000000]">
                              {item?.name}
                            </p>
                            <p className="text-[14px] font-[300] text-[#6B7280]">
                              {item?.email?.value}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.referredCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.influencerRate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center px-6 py-4 text-sm text-gray-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
