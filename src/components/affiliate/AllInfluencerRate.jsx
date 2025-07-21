import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import BASE_URL from "../../constants/BaseUrl";

import { toast } from "react-toastify";
const AllInfluencerRate = ({ showModal, setShowModal, refetch }) => {
  const [value, setValue] = useState("5");
  const { isUserData } = useContext(AuthContext);
  const token = isUserData?.token;

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/update-all-influencer-rates`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          influencerRate: value,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      console.log(data);
      toast.success("Rates updated successfully");
      if (typeof refetch === "function") {
        refetch(); 
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to update influencer rates");
    }
  };

  return (
    showModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white w-[400px] h-[250px]  rounded-lg ">
          <div className="flex justify-end p-3">
            <button onClick={() => setShowModal(false)}>
              {" "}
              <FaXmark size={22} />{" "}
            </button>
          </div>
          <div className="flex w-full mt-5 items-center justify-center flex-col  gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-xl">Update All Influencer Rate</h3>
            </div>
            <div className="w-full px-4">
              <input
                type="number"
                onChange={(e) => setValue(e?.target?.value)}
                value={value}
                className="w-full border  rounded-lg text-sm py-2.5 px-3.5 focus:border-[#0085FF] focus:ring focus:ring-[#rgb(177 226 253)] outline-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#0085FF] p-3 rounded-[10px] text-white px-8"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AllInfluencerRate;
