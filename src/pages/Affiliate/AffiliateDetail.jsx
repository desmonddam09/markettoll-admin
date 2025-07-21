import React, { useContext, useEffect, useState } from "react";
import { BiChevronDown, BiChevronDownCircle, BiCopy } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import BASE_URL from "../../constants/BaseUrl";
import ViewRefferal from "../../components/affiliate/ViewRefferal";

export default function AffiliateDetail() {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refferals, setRefferals] = useState([]);
  const { state } = useLocation();
  const [Settings, setSettings] = useState("");
  const affiliateLink = state?.referralLink;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  console.log(state, "influencerRate");
  const [accountStatus, setAccountStatus] = useState(
    state.adminStatus == "active" ? true : false
  );
  const [commissionRate, setCommissionRate] = useState(state?.influencerRate);
  const [linkActive, setLinkActive] = useState(
    state?.isActive == "active" ? true : false
  );

  const fetchInfluencer = () => {
    setLoader(true);
    try {
      const token = isUserData?.token;
      if (!token) return;
      fetch(`${BASE_URL}/admin/get-influencers/${state?._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setRefferals(res?.data);
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
  }, []);

  useEffect(() => {
    setLinkActive(state?.isActive == "active" ? true : false);
  }, [state?.isActive]);

  const handleUnBlockUser = () => {
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/unblock-user/${state._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to Block User");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Unblock User");
        setAccountStatus("unblock");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  const handleBlockUser = () => {
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/block-user/${state._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to Block User");
        }
        return res.json();
      })
      .then((data) => {
        toast.success("block User");
        setAccountStatus("block");
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Details</h1>
        <img
          src={state?.adminStatus == "active" ? "/active.png" : "/block.png"}
          alt="active.png"
          className="w-24"
        />
      </div>
      <div className=" mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Profile Section */}
        {!edit && (
          <div className="flex justify-end mr-5 mb-2">
            <CiEdit
              size={25}
              className="cursor-pointer"
              onClick={() => setEdit(!edit)}
            />
          </div>
        )}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Profile Photo:
              </span>
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={state.profileImage ? state?.profileImage : "/circle.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Name:</span>
              <span className="text-gray-900 font-medium">{state?.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Email:</span>
              <span className="text-gray-900 font-medium">
                {state?.email?.value}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Phone Number
              </span>
              <span className="text-gray-900 font-medium">
                +{state?.phoneNumber.code + state?.phoneNumber.value}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Total Referred Users:
              </span>
              <span className="text-gray-900 font-semibold">
                {state?.referredUsersCount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Total Earnings:
              </span>
              <span className="text-gray-900 font-semibold">
                ${state?.totalEarning}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Amount Paid:
              </span>
              <span className="text-gray-900 font-semibold">
                ${state?.totalPaid}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Wallet Balance:
              </span>
              <span className="text-gray-900 font-semibold">
                ${state?.walletBalance}
              </span>
            </div>

            {/* Dropdown Sections */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Assigned Commission Rate
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={commissionRate}
                  max={100}
                  min={0}
                  disabled={edit ? false : true}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= 100) {
                      setCommissionRate(e.target.value);
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Account Status
              </span>
              <div className="relative">
                {!accountStatus ? (
                  <button
                    onClick={() => {
                      handleUnBlockUser();
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleBlockUser();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
            {edit && (
              <div className="flex items-center gap-5 justify-end">
                <button
                  onClick={() => setEdit(false)}
                  className="bg-[#929495] text-white p-3 rounded-lg "
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      setLoader(true);
                      const response = await fetch(
                        `${BASE_URL}/admin/update-influencer-rate`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            user: state._id,
                            influencerRate: commissionRate,
                          }),
                        }
                      );

                      const result = await response.json();
                      if (response.ok) {
                        setLoader(false);
                        console.log("Success:", result);
                        setEdit(false);
                        toast.success("Updated Successfully");
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
                  className="bg-[#0098EA] text-white p-3 rounded-lg "
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Affiliate Link Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4 flex-1">
              <span className="text-gray-700 font-medium">Affiliate Link</span>
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-gray-600 text-sm truncate max-w-md">
                  {state?.referralLink ? state?.referralLink : "----"}
                </span>
                {state?.referralLink && linkActive && (
                  <button
                    onClick={handleCopyLink}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy link"
                  >
                    <BiCopy className="w-4 h-4 text-gray-500" />
                  </button>
                )}
                {copied && (
                  <span className="text-green-600 text-xs font-medium">
                    Copied!
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">
                  {linkActive ? "Active" : "InActive"}
                </span>
                <button
                  disabled={state?.isActive == "active" ? false : true}
                  onClick={async () => {
                    setLinkActive(!linkActive);
                    try {
                      setLoader(true);
                      const response = await fetch(
                        `${BASE_URL}/admin/toggle-referral-status`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            influencer: state?._id,
                            isActive: true,
                          }),
                        }
                      );

                      const result = await response.json();
                      if (response.ok) {
                        setLoader(false);
                        console.log("Success:", result);

                        toast.success("Link Updated");
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
          </div>
        </div>
      </div>
      <ViewRefferal refferals={refferals} />
    </div>
  );
}
