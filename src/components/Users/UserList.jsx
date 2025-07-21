import React, { useContext, useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import ConfirmBlockModal from "./ConfirmModal";

const UserList = ({ filterData, setUserCount }) => {
  const { isUserData, setLoader, FilterMonthUser, loader } =
    useContext(AuthContext);
  const [users, SetUsers] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [BlockedUserId, setBlockedUserId] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [unblockState, setUnblockState] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const TOTAL_VALUES_PER_PAGE = 15;
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    if (!token) return;
    fetch(`${BASE_URL}/admin/users?name=${filterData || ""}&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetUsers(res?.data);
        setDataToDisplay(res?.data?.slice(0, TOTAL_VALUES_PER_PAGE));
        setUserCount(res?.data?.slice(0, TOTAL_VALUES_PER_PAGE).length);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData, filterData, unblockState]);

  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    const formateDate = FilterMonthUser && FilterMonthUser?.split("-");
    if (formateDate) {
      fetch(
        `${BASE_URL}/admin/users-registered-in-month?month=${
          formateDate[1] || ""
        }&year=${formateDate[0] || ""}&page=1`,
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
          console.log(res.data, "filter by months");
          if (res.data) {
            SetUsers(res?.data);
            setDataToDisplay(res?.data?.slice(0, TOTAL_VALUES_PER_PAGE));
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    }
  }, [FilterMonthUser]);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return; // Don't go back if already on the first page
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / TOTAL_VALUES_PER_PAGE);

    // Don't go forward if we're already on the last page
    if (currentPageNumber === totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(users.slice(start, end));
  }, [currentPageNumber]);

  const handleBlockUser = (UserId) => {
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/block-user/${UserId}`, {
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
        setUnblockState(!unblockState);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleUnBlockUser = (id) => {
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/unblock-user/${id}`, {
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
        setUnblockState(!unblockState);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  console.log(dataToDisplay, "data0");
  return (
    <>
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
          {loader ? (
            <span className="loader"></span>
          ) : (
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {dataToDisplay
                ?.filter((item) => item.adminStatus == "active")
                ?.map((item) => (
                  <UserListItem
                    setIsBlocked={setIsBlocked}
                    item={item}
                    blockedUserId={setBlockedUserId}
                  />
                ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-end gap-3 w-full">
        <button
          className={`${
            currentPageNumber === 1 ? " bg-[#9fdeff]" : " bg-[#0098EA]"
          } px-2 rounded-md w-[80px] text-white py-2 `}
          onClick={goOnPrevPage}
        >
          Prev
        </button>
        <button
          className="bg-[#0098EA] px-2 rounded-md w-[80px] text-white py-2"
          onClick={goOnNextPage}
        >
          Next
        </button>
      </div>
      <ConfirmBlockModal
        isBlocked={isBlocked}
        handleBlockUser={handleBlockUser}
        handleUnBlockUser={handleUnBlockUser}
        UserId={BlockedUserId}
      />
    </>
  );
};

export default UserList;
