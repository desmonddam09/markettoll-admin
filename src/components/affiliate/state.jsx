import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

export default function Stats({ setTotalAffiliate, totalAffiliate }) {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [Sats, setSats] = useState([]);
  const navigate = useNavigate("");
  const fetchInfluencer = () => {
    const token = isUserData?.token;
    if (!token) {
      console.warn("No token found. Cannot fetch influencer stats.");

      return;
    }

    setLoader(true); // Start loading

    fetch(`${BASE_URL}/admin/influencers-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response");
        setSats(res?.data || []);
        setLoader(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching influencer stats:", error);
        toast.error("Failed to fetch influencer stats.");
        setLoader(false); // Stop loading
      });
  };

  useEffect(() => {
    fetchInfluencer();
  }, []);
  const affiliateData = [
    {
      name: "Total Affiliate",
      value: Sats.totalAffiliates,
    },
    {
      name: "Pending Request",
      value: Sats.pendingRequests,
    },
    {
      name: "Total Referred",
      value: Sats.totalReferredUsers,
    },
    {
      name: "Total Earnings",
      value: Sats.totalEarnings,
    },
    {
      name: "Bonus Commission ",
      value: isUserData.walletBalance,
    },
  ];
  return (
    <div className="grid grid-cols-5 gap-2">
      {affiliateData?.map((item, i) => {
        const handleClick = () => {
          if (i === 0) {
            setTotalAffiliate(!totalAffiliate);
          } else if (i === 1) {
            navigate("/pending-request");
          } else if (i === 4) {
            navigate("/goal");
          }
        };

        const isClickable = i === 0 || i === 1 || i === 4;

        return (
          <div
            key={i}
            onClick={handleClick}
            className={`${
              isClickable ? "cursor-pointer" : ""
            } bg-[#FFFFFF] border p-3 border-[#E5E7EB] rounded-[12px]`}
          >
            <h3 className="font-[500] text-[14px]">{item?.name}</h3>
            <p className="font-bold text-[22px] mt-3 bg-gradient-to-r from-[#0033A5] via-[#0995E7] to-[#0995E7] bg-clip-text text-transparent">
              {i === 4 ? <FaArrowRight color="#0098EA" /> : item?.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
