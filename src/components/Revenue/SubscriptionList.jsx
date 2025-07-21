import React, { useContext, useEffect, useState } from "react";
import SubscriptionListItem from "./SubscriptionListItem";
import PackagesListItem from "./PackagesListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const SubscriptionList = () => {
  const [ActiveSubscription, SetActiveSubscription] = useState([]);
  const [BoostingPackage, SetBoostingPackage] = useState([]);

  const { isUserData, setLoader, FilterMonthUser, loader, setFilterMonthUser } =
    useContext(AuthContext);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    const FetchSubscriptions = () => {
      fetch(`${BASE_URL}/admin/active-subscriptions?subscription=-1&page=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setDataToDisplay(res.data);
          SetActiveSubscription(res.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    };
    const FetchBoostingPackage = () => {
      fetch(`${BASE_URL}/admin/active-boosts?boost=-1&page=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data, "data -->");

          SetBoostingPackage(res.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    };

    FetchBoostingPackage();
    FetchSubscriptions();
  }, [isUserData]);

  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    const formateDate = FilterMonthUser && FilterMonthUser?.split("-");
    if (formateDate) {
      fetch(
        `${BASE_URL}/admin/user-subscriptions-in-month?month=${
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
            SetActiveSubscription(res?.data);
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
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    if (currentPageNumber === ActiveSubscription.length / TOTAL_VALUES_PER_PAGE)
      return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(ActiveSubscription?.slice(start, end));
  }, [currentPageNumber, ActiveSubscription]);

  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div className="flex justify-end">
        <div>
          <label className="text-sm mb-2 block">Date</label>
          <div className="relative flex items-center">
            <input
              name="month"
              type="month"
              value={FilterMonthUser ? FilterMonthUser : ""}
              onChange={(e) => {
                setFilterMonthUser(e.target.value);
              }}
              className="w-full border border-gray-200 px-3 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
              placeholder="Search Here..."
            />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto h-[500px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg  py-4 text-sm font-semibold"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Package
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 rounded-r-lg text-sm font-semibold"
              >
                Purchase Date
              </th>
            </tr>
          </thead>
          {loader ? (
            <span className="loader"></span>
          ) : (
            <tbody className="divide-y  divide-gray-100 border-t border-gray-100">
              {dataToDisplay?.map((item) => (
                <SubscriptionListItem
                  item={item}
                  FilterMonthUser={FilterMonthUser}
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
      <h1 className="text-xl font-bold">Boosting Packages Report</h1>
      <div className="w-full overflow-x-auto h-[500px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg  py-4 text-sm font-semibold"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Package
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Amount
              </th>

              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 rounded-r-lg text-sm font-semibold"
              >
                Purchase Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100 border-t border-gray-100">
            {BoostingPackage?.map((item) => (
              <PackagesListItem item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;
