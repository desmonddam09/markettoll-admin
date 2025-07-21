import React, { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function AddGoal({ isGoal }) {
  const [addGoal, setGoal] = useState(false);
  const [totalReferrals, setTotalReferrals] = useState("");
  const [influencerRate, setInfluencerRate] = useState("");
  const { isUserData, setLoader } = useContext(AuthContext);
  const token = isUserData?.token;
  const handleCreateGoal = async () => {
    setLoader(true); // Start loading
    try {
      const response = await fetch(`${BASE_URL}/admin/create-influencer-goal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalReferrals,
          influencerRate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Goal created successfully");
        console.log("Response:", data);
        setGoal(false);
        setInfluencerRate("");
        setTotalReferrals("");
      } else {
        toast.error("Error creating goal:", data.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setLoader(false); // End loading
    }
  };

  return (
    <div className="mt-4 w-full">
      {!isGoal &&!addGoal  && (
        <button
          onClick={() => setGoal(!addGoal)}
          className="bg-[#0098EA1F]  w-full p-2 rounded-[20px] text-[#0098EA] font-[600] text-[14px] flex justify-center items-center "
        >
          <FaPlus className="mr-2" /> Add Goal
        </button>
      )}
      {addGoal && (
        <div className="grid grid-cols-4 items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Enter required referral"
            value={totalReferrals}
            onChange={(e) => setTotalReferrals(e.target.value)}
            className="border px-2 h-[40px] border-[#E5E7EB0] focus:outline-[#0098EA] bg-[#FFFFFF] rounded-[12px]"
          />
          <input
            type="text"
            placeholder="Enter commission rate%"
            value={influencerRate}
            onChange={(e) => setInfluencerRate(e.target.value)}
            className="border px-2 h-[40px] border-[#E5E7EB] bg-[#FFFFFF] focus:outline-[#0098EA] rounded-[12px]"
          />
          <button
            onClick={handleCreateGoal}
            disabled={isUserData?.loader}
            className="bg-[#0098EA] p-3 text-white text-[14px] font-[500] rounded-[12px] flex items-center justify-center"
          >
            {isUserData?.loader ? (
              <FaSpinner className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Create Goal"
            )}
          </button>
          <button
            onClick={() => setGoal(!addGoal)}
            className="text-[red] text-[14px] font-[500]"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      )}
    </div>
  );
}
