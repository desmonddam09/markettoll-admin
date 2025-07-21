import React, { useContext, useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

const OrderList = ({ filterData }) => {
  const { isUserData, setLoader,loader } = useContext(AuthContext);
  const [Order, SetOrder] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/orders?name=${filterData || ""}&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data, "orderss");
        setDataToDisplay(res.data);
        SetOrder(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData, filterData]);
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return; 
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    const totalPages = Math.ceil(Order.length / TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(Order.slice(start, end));
  }, [currentPageNumber]);

  return (
    <>
    
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-3 text-sm font-semibold"
            >
              Buyer Name
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Buyer Email
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-xm font-semibold"
            >
              Delivery Address{" "}
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 text-nowrap xl:px-2  py-3 text-sm font-semibold"
            >
              Total Price
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Created At
            </th>
          </tr>
        </thead>
         {loader ? <span className="loader"></span> : (
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {dataToDisplay?.map((item) => (
            <OrderListItem item={item} />
          ))}
        </tbody>
         )}
      </table>
    </div>
    <div className="flex justify-end gap-3 w-full">
        <button className={`${currentPageNumber === 1?" bg-[#9fdeff]":" bg-[#0098EA]"} px-2 rounded-md w-[80px] text-white py-2 `}  onClick={goOnPrevPage}>Prev</button>
        <button className="bg-[#0098EA] px-2 rounded-md w-[80px] text-white py-2" onClick={goOnNextPage}>Next</button>
      </div> 
    </>
  );
};

export default OrderList;
