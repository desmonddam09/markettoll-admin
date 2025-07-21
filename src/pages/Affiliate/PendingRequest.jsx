import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../../constants/BaseUrl";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck, FaSpinner } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

export default function PendingRequest() {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [affiliate, setAffiliate] = useState([]);
  const [Settings, setSettings] = useState("");
  const [statusLoader,setStatusLoader]=useState(false);
  const navigate = useNavigate("");
  const fetchInfluencer = () => {
    setLoader(!loader);
    try {
      const token = isUserData?.token;
      fetch(`${BASE_URL}/admin/pending-influencers-requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "response");
          setAffiliate(res?.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("error.message");
    }
  };
  const fetchInfluencerSettings = () => {
    setLoader(!loader);
    try {
      const token = isUserData?.token;
      fetch(`${BASE_URL}/admin/influencer-settings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setSettings(res?.data?.influencerStatus);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("error.message");
    }
  };

  useEffect(() => {
    fetchInfluencerSettings();
    fetchInfluencer();
  }, []);
  const [linkActive, setLinkActive] = useState(false);

  useEffect(() => {
    setLinkActive(Settings == "manual" ? false : true);
  }, [Settings]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          className="absolute top-5 z-30"
          onClick={() => navigate("/affiliate")}
        >
          {" "}
          <IoIosArrowBack size={25} color="#666666" />{" "}
        </button>
        <h1 className="text-xl font-bold">Pending Request</h1>

        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">
            {linkActive ? "Auto" : "Manual"}
          </span>
          <button
            onClick={async () => {
              setLinkActive(!linkActive);
              try {
                setLoader(true);
                const response = await fetch(
                  `${BASE_URL}/admin/update-influencer-settings`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      influencerStatus: linkActive ? "auto" : "manual",
                    }),
                  }
                );

                const result = await response.json();
                if (response.ok) {
                  setLoader(false);
                  console.log("Success:", result);
                  fetchInfluencerSettings();
                  toast.success("Settings Updated");
                } else {
                  setLoader(false);
                  console.error("API error:", result);
                  toast.error(result.error.message);
                }
              } catch (error) {
                setLoader(false);
                toast.error(error.error.message);
                console.error("Network error:", error);
              }
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              linkActive ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                linkActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Total Referred Users
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Total Earnings
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Amount Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Commission Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {affiliate && affiliate.length > 0 ? (
                    affiliate.map((item, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
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
                          {item?.referredUsersCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${item?.totalEarning}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${item?.totalPaid}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          %{item?.influencerRate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <img
                            src={
                              item?.influencerStatus === "active"
                                ? "/active.png"
                                : item?.influencerStatus === "suspend"
                                ? "/block.png"
                                : "/suspend.png"
                            }
                            alt="influencerStatus"
                            className="w-24"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                navigate(`/affiliate/${item?._id}`, {
                                  state: item,
                                })
                              }
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm p-2 rounded-[8px] text-white bg-[#0098EA]"
                            >
                              View
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  setStatusLoader(true);
                                  const response = await fetch(
                                    `${BASE_URL}/admin/approve-influencer-request`,
                                    {
                                      method: "PUT",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        influencer: item._id,
                                      }),
                                    }
                                  );

                                  const result = await response.json();
                                  if (response.ok) {
                                    setStatusLoader(false);
                                    console.log("Success:", result);
                                    toast.success("Approved Successfully");
                                  } else {
                                    setStatusLoader(false);
                                    console.error("API error:", result);
                                    toast.error(result.error.message);
                                  }
                                } catch (error) {
                                  setStatusLoader(false);
                                  toast.error(error.error.message);
                                  console.error("Network error:", error);
                                }
                              }}
                              type="button"
                              className="flex bg-[#34C759] rounded-[8px] p-3 text-white items-center gap-2"
                            >
                              <div>
                                <FaCheck className="text-sm" />
                              </div>
                              {statusLoader && (
                                <FaSpinner className="animate-spin text-white" />
                              )}
                            </button>                          
                          </div>
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
    </div>
  );
}
