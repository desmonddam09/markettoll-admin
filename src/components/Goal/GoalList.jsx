import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function GoalList({ setIsGoal }) {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Goals, setGoals] = useState([]);
 const [refech,setRefetch]=useState(false);
  const token = isUserData?.token;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    totalReferrals: "",
    influencerRate: "",
  });

  useEffect(() => {
    setLoader(true);

    fetch(`${BASE_URL}/admin/influencer-goal`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGoals(res?.data);
        console.log(res?.data, "SetNotifications");
        if (res?.data?.totalReferrals) {
          setIsGoal(true);
        } else {
          setIsGoal(false);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [refech]);

  const handleEditClick = (goal) => {
    setEditData({
      id: goal._id, // make sure `Goals._id` is available
      totalReferrals: goal.totalReferrals,
      influencerRate: goal.influencerRate,
    });
    setEditModalOpen(true);
  };

  const handleUpdateGoal = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/influencer-goal/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalReferrals: editData.totalReferrals,
          influencerRate: editData.influencerRate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Goal updated successfully!");
        setEditModalOpen(false);
        setRefetch(!refech)
        // Optionally trigger a refresh of the goals list
      } else {
        toast.error("Update failed:", data.message);
      }
    } catch (error) {
      toast.error("Error updating goal:", error);
    }
  };
console.log(Goals,"goalss")
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
                    Referral Required
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Commission Rate
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Goal Achivers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Goals?.totalReferrals ? (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {Goals?.totalReferrals}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {Goals?.influencerRate}
                    </td>
                    <td className="px-6 py-4   whitespace-nowrap ">
                      <NavLink
                        to={"/achiever"}
                        className="flex gap-2 text-gray-800 text-end text-sm font-medium items-center justify-center"
                      >
                        {" "}
                        Achiver <FaArrowRight />
                      </NavLink>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button onClick={() => handleEditClick(Goals)}>
                        <FaEdit color="#0098EA" />
                      </button>
                    </td>
                  </tr>
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
      {/* ✨ Modal for Editing */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Edit Goal</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Referrals
              </label>
              <input
                type="number"
                value={editData.totalReferrals}
                onChange={(e) =>
                  setEditData({ ...editData, totalReferrals: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Rate (%)
              </label>
              <input
                type="number"
                value={editData.influencerRate}
                onChange={(e) =>
                  setEditData({ ...editData, influencerRate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateGoal}
                className="px-4 py-2 bg-[#0098EA] text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
