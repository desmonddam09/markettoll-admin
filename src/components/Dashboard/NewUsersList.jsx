import React, { useContext, useEffect, useState } from "react";
import NewUserListItem from "./NewUserListItem";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import ConfirmBlockModal from "../Users/ConfirmModal";

const NewUsersList = () => {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [users, SetUsers] = useState([]);
  const [BlockedUserId, setBlockedUserId] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [unblockState, setUnblockState] = useState(false);
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    console.log(token);

    if (!token) {
      console.error("Token is missing");
      setLoader(false);
      return;
    }

    const month = "Oct"; // You can replace this dynamically
    const year = 2024; // Replace this dynamically if necessary

    fetch(
      `${BASE_URL}/admin/users-registered-in-month?month=${10}&year=${year}&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data, "filter by months");
          SetUsers(res.data); // Update users state
          setLoader(false);
        } else {
          console.error("No data found in response:", res);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData?.token,unblockState]);

  const handleBlockUser = (UserId) => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/block-user/${UserId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoader(false);
        if (!res.ok) {
          throw new Error("Failed to Block User");
        }
       
        return res.json();
      })
      .then((data) => {
        setLoader(false);
        setUnblockState(!unblockState);
        console.log(data);
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error:", err);
      });
  };

  const handleUnBlockUser = (id) => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/unblock-user/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoader(false);
        if (!res.ok) {
          throw new Error("Failed to Block User");
        }
        return res.json();
      })
      .then((data) => {
        setLoader(false);
        setUnblockState(!unblockState);
        console.log(data);
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error:", err);
      });
  };

  return (
    <div className="w-full flex flex-col border rounded-xl p-4">
      <div className="flex justify-between">
        <h1 className="text-base font-semibold mb-2">New Users</h1>
        <NavLink
          to={"/users"}
          className="bg-[#0098EA] w-[100px] h-[40px] rounded-md text-white text-center py-2 "
        >
          View All
        </NavLink>
      </div>
      <br />
      <div className="w-full overflow-x-auto h-[400px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse  text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  rounded-r-lg py-4 text-sm font-semibold text-center"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((item) => (
              <NewUserListItem
                setIsBlocked={setIsBlocked}
                item={item}
                blockedUserId={setBlockedUserId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmBlockModal
        isBlocked={isBlocked}
        handleBlockUser={handleBlockUser}
        handleUnBlockUser={handleUnBlockUser}
        UserId={BlockedUserId}
      />
    </div>
  );
};

export default NewUsersList;
