import React, { useContext, useState } from "react";
import UserListing from "./UserListing";
import UserOrder from "./UserOrder";
import UserSubscription from "./UserSubscription";
import UserFeaturePosting from "./UserFeaturePost";
import UserReviewsList from "./UserReviewsList";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ConfirmBlockModal from "../Users/ConfirmModal";
import BASE_URL from "../../constants/BaseUrl";

const UserInfo = () => {
  const loc = useLocation("");
  const { setBlockedModal, isUserData } = useContext(AuthContext);
  let data = loc.state.data;
  console.log(data,"userInfoData");
  
  const [BlockedUserId, setBlockedUserId] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [unblockState, setUnblockState] = useState(false);
  const navigate = useNavigate("");

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
        navigate("/users");
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
        navigate("/users");
        setUnblockState(!unblockState);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="font-semibold text-xl">User Profile</h1>
      <div className="w-full lg:w-1/1 flex flex-col gap-4 border rounded-xl p-4 md:p-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Profile Photo:</p>
          <img
            src={
              data.profileImage
                ? data.profileImage
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt=""
            className="w-20 h-20 bg-cover bg-center rounded-full"
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Email:</p>
          <p className="text-sm font-medium">{data?.email?.value}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Name:</p>
          <p className="text-sm font-medium">{data?.name}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Phone Number:</p>
          <p className="text-sm font-medium">
            +{data?.phoneNumber.code + " " + data?.phoneNumber.value}
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => {
              if (data.adminStatus == "active") {
                setBlockedModal(true);
                setIsBlocked(true);
                setBlockedUserId(data?._id);
              } else {
                setIsBlocked(false);
                setBlockedModal(true);
                setBlockedUserId(data?._id);
              }
            }}
            className={`text-sm font-medium px-4 py-1.5 rounded-lg ${
            data.adminStatus === "active"
              ? "bg-red-600 text-white"
              : "bg-red-50 text-red-600"
          } hover:opacity-80 rounded-md text-xs`}
          >
            {data.adminStatus == "active" ? "Block User" : "UnBlock User"}
          </button>
        </div>
      </div>
      <h1 className="font-semibold text-xl">User Listings</h1>
      <UserListing userId={data._id} userData={data} />
      <h1 className="font-semibold text-xl">User Orders</h1>
      <UserOrder userId={data._id} />
      <h1 className="font-semibold text-xl">User Subscription</h1>
      <UserSubscription userId={data._id} />
      <h1 className="font-semibold text-xl">User Feature Posting</h1>
      <UserFeaturePosting userId={data._id} />
      <h1 className="font-semibold text-xl">Reviews</h1>
      <UserReviewsList />

      <ConfirmBlockModal
        isBlocked={data.adminStatus}
        handleBlockUser={handleBlockUser}
        handleUnBlockUser={handleUnBlockUser}
        UserId={BlockedUserId}
      />
    </div>
  );
}; 

export default UserInfo;
