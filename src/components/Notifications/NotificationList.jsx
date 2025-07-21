import React, { useContext, useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import CreateNotification from "./CreateNotification";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

const NotificationList = () => {
  const [showModal, setShowModal] = useState(false);
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Notifications, SetNotifications] = useState([]);
  const token = isUserData?.token;
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    setLoader(true)

    fetch(`${BASE_URL}/admin/notification?page=1`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((res) => {
        SetNotifications(res?.data)
        console.log(res?.data, "SetNotifications");
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false)
      });
  }, [isUserData, showModal,]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col items-start md:flex-row gap-3 md:items-center justify-between">
        <h1 className="text-xl font-bold">Send Push Notification</h1>
        <button className="text-sm font-medium text-white bg-[#0098EA] hover:opacity-90 px-4 py-2.5 rounded-lg" onClick={handleShowModal}>
          Create Notification
        </button>
        <CreateNotification showModal={showModal} token={token} onclick={handleShowModal} />
      </div>
      <div className="w-full rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 h-[80vh] px-2 overflow-auto description-scroll">
        {
          Notifications?.map((item) => (
            <NotificationItem item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default NotificationList;
