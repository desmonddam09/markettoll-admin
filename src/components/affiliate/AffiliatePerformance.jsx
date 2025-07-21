import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";
import StatusIndicator from "../Global/StatusIndicator";

export default function AffiliatePerformance({ totalAffiliate, SetRefetch }) {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [affiliate, setAffiliate] = useState([]);
  const [refDrop, setRefDrop] = useState(false);
  const [CommisionDrop, setCommisionDrop] = useState(false);
  const [EarningDrop, setEarningDrop] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [commissionSort, setCommissionSort] = useState(""); // "asc" | "desc" | ""
  const [referralSort, setReferralSort] = useState(""); // "asc" | "desc" | ""
  const [earningSort, setEarningSort] = useState(""); // "asc" | "desc" | ""

  const navigate = useNavigate("");
  const fetchInfluencer = () => {
    setLoader(true);
    try {
      const token = isUserData?.token;
      if (!token) return;
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (search) {
        params.append("name", search);
        params.append("email", search);
        params.append("referrals", search);
        params.append("commission", search);
        params.append("totalEarning", search);
      }

      // Only one sort param at a time
      if (commissionSort) {
        params.append("totalEarning", "");
        params.append("referrals", "");
        params.append("commission", commissionSort); // "asc" or "desc"
      } else if (referralSort) {
        params.append("commission", "");
        params.append("totalEarning", "");
        params.append("referrals", referralSort); // "asc" or "desc"
      } else if (earningSort) {
        params.append("totalEarning", earningSort);
        params.append("commission", "");
        params.append("referrals", ""); // "asc" or "desc"
      }

      fetch(`${BASE_URL}/admin/get-influencers?${params.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAffiliate(res?.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchInfluencer();
    SetRefetch(() => fetchInfluencer);
  }, [startDate, endDate, search, commissionSort, referralSort, earningSort]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {totalAffiliate ? "Total Affiliate" : "Affiliate Performance Table"}
        </h1>
        {!totalAffiliate && (
          <div className="grid grid-cols-3">
            <div>
              <label htmlFor="" className="text-xs text-gray-500">
                Start Date
              </label>{" "}
              <br />
              <input
                type="date"
                className="p-2 px-2 bg-[#FFFFFF] border border-[#E5E7EB] focus:outline-[#E5E7EB] rounded-[12px]"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="" className="text-xs text-gray-500">
                End Date
              </label>{" "}
              <br />
              <input
                type="date"
                className="p-2 px-2 bg-[#FFFFFF] border border-[#E5E7EB] focus:outline-[#E5E7EB] rounded-[12px]"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="" className="text-xs text-gray-500">
                Search
              </label>{" "}
              <br />
              <input
                type="text"
                className="p-2 px-2 bg-[#FFFFFF] border focus:outline-[#E5E7EB] border-[#E5E7EB] rounded-[12px]"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 end-0 top-5 flex items-center pointer-events-none z-20 pe-1">
                <button className="bg-[#0098EA] text-white  px-2 py-2 rounded-[10px]">
                  <CiSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
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
                      <div className="relative">
                        <button
                          onClick={() => setRefDrop(!refDrop)}
                          className="flex items-center justify-between w-full sm:w-50 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <LuArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-700 text-nowrap">
                              {referralSort == ""
                                ? "Total Referred Users"
                                : referralSort == "asc"
                                ? "Low to High"
                                : " High to Low"}
                            </span>
                          </div>
                          <BiChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {/* Static Dropdown Options (hidden by default) */}
                        <div
                          className={`absolute top-full left-0 w-full sm:w-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${
                            refDrop ? "block" : "hidden"
                          }`}
                        >
                          <button
                            onClick={() => {
                              setReferralSort("");
                              setCommissionSort("");
                              setRefDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 rounded-t-lg"
                          >
                            Default Order
                          </button>
                          <button
                            onClick={() => {
                              setReferralSort("asc");
                              setCommissionSort("");
                              setRefDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
                          >
                            Low to High
                          </button>
                          <button
                            onClick={() => {
                              setReferralSort("desc");
                              setCommissionSort("");
                              setRefDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
                          >
                            High to Low
                          </button>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      <div className="relative">
                        <button
                          onClick={() => setEarningDrop(!EarningDrop)}
                          className="flex items-center justify-between w-full sm:w-50 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <LuArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-700 text-nowrap">
                              {earningSort == ""
                                ? "Total Earnings"
                                : earningSort == "asc"
                                ? "Low to High"
                                : " High to Low"}
                            </span>
                          </div>
                          <BiChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {/* Static Dropdown Options (hidden by default) */}
                        <div
                          className={`absolute top-full left-0 w-full sm:w-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${
                            EarningDrop ? "block" : "hidden"
                          }`}
                        >
                          <button
                            onClick={() => {
                              setReferralSort("");
                              setCommissionSort("");
                              setEarningDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 rounded-t-lg"
                          >
                            Default Order
                          </button>
                          <button
                            onClick={() => {
                              setEarningSort("asc");
                              setReferralSort("");
                              setCommissionSort("");
                              setEarningDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
                          >
                            Low to High
                          </button>
                          <button
                            onClick={() => {
                              setEarningSort("desc");
                              setReferralSort("");
                              setCommissionSort("");
                              setEarningDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
                          >
                            High to Low
                          </button>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-nowrap text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Amount Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      <div className="relative">
                        <button
                          onClick={() => setCommisionDrop(!CommisionDrop)}
                          className="flex items-center justify-between w-full sm:w-50 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <LuArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-700 text-nowrap">
                              {commissionSort == ""
                                ? "Additional Comission rate"
                                : commissionSort == "asc"
                                ? "Low to High"
                                : " High to Low"}
                            </span>
                          </div>
                          <BiChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {/* Static Dropdown Options (hidden by default) */}
                        <div
                          className={`absolute top-full left-0 w-full sm:w-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${
                            CommisionDrop ? "block" : "hidden"
                          }`}
                        >
                          <button
                            onClick={() => {
                              setReferralSort("");
                              setCommissionSort("");
                              setCommisionDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 rounded-t-lg"
                          >
                            Default Order
                          </button>
                          <button
                            onClick={() => {
                              setReferralSort("");
                              setCommissionSort("asc");
                              setCommisionDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
                          >
                            Low to High
                          </button>
                          <button
                            onClick={() => {
                              setCommissionSort("desc");
                              setReferralSort("");
                              setCommisionDrop(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
                          >
                            High to Low
                          </button>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {affiliate && affiliate.length > 0 ? (
                    affiliate
                      ?.filter((item) => item.influencerStatus == "active")
                      ?.map((item, i) => (
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
                            <StatusIndicator adminStatus={item?.adminStatus} />
                            {/* <img
                              src={
                                item?.adminStatus == "active"
                                  ? "/active.png"
                                  : item?.adminStatus == "blocked"
                                  ? "/block.png"
                                  : "/suspend.png"
                              }
                              alt="influencerStatus"
                              className="md:w-26 lg:w-24"
                            /> */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
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
