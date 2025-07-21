import React, { useContext, useEffect, useState } from "react";
import CustomerListItem from "./CustomerListItem";
import CustomerReply from "./CustomerReply";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

const CustomerList = ({filterData}) => {
  const [showModal, setShowModal] = useState(false);
  const [ticketRes, setticketRes] = useState(false);
  const [CustomerSupport, setCustomerSupport] = useState([]);
  const [SupportId, setSupportId] = useState("");

  const { isUserData, setLoader } = useContext(AuthContext);

  const handleShowModal = (itemId) => {
    console.log(itemId);
    setSupportId(itemId);
    setShowModal(!showModal);
  };

  const token = isUserData?.token;
  useEffect(() => {
    setLoader(true);
   
    fetch(`${BASE_URL}/admin/email-support-request?name=${filterData?filterData:""}&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data, "custtomer data");
        setCustomerSupport(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData,filterData,ticketRes]);

  const TicketResolved = (id) => {
    fetch(`${BASE_URL}/admin/email-support-request-close-ticket/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },     
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to log in");
        }
        setticketRes(!ticketRes)
        return res.json();
      })
      .then((data) => {
        console.log("Notification Created", data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
            >
              Description
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
          {CustomerSupport?.map((item) => (
            <CustomerListItem
              item={item}
              TicketResolved={TicketResolved}
              handleShowModal={handleShowModal}
            />
          ))}
        </tbody>
      </table>
      <CustomerReply
        showModal={showModal}
        id={SupportId}
        onclick={handleShowModal}
        token={isUserData?.token}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CustomerList;
