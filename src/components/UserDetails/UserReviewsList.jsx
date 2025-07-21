import React, { useContext, useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import UserReviewCard from "./UserReviewCard";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
const UserReviewsList = ({ userId }) => {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Review, SetReview] = useState([]);
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/user-reviews/671bc9d2b25262600108bde8?page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetReview(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData]);
  const sumArr = Review?.reduce((a, b) => a + (b?.rating || 0), 0);
  const averageRating = Review.length > 0 ? sumArr / Review.length : 0;
  const ratingCount = Review.reduce((acc, user) => {
    if (!acc[user.rating]) {
      acc[user.rating] = 0;
    }
    acc[user.rating]++;
    return acc;
  }, {});

  console.log(ratingCount);

  return (
    <div className="border rounded-xl  px-3 py-3 h-[300px] overflow-auto description-scroll ">
      <>
        <div className="flex items-center gap-1 my-2">
          <IoIosStar className="text-yellow-400 text-xl" />
          <IoIosStar className="text-yellow-400 text-xl" />
          <IoIosStar className="text-yellow-400 text-xl" />
          <IoIosStar className="text-yellow-400 text-xl" />
          <IoIosStar className="text-gray-300 text-xl" />
          <span className="text-sm">({averageRating})</span>
          <span className="text-sm text-gray-500">{Review.length}</span>
        </div>
        <div className="flex flex-col items-start gap-2 mt-5">
          {/* 5 stars rating */}
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="text-xs w-[15%] md:w-[10%]">5 stars</div>
            <div className="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-[8px] rounded-full"
                style={{
                  width: `${
                    ratingCount[5] ? (ratingCount[5] / Review.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs w-[10%] text-center">
              {ratingCount[5] || 0}
            </div>
          </div>

          {/* 4 stars rating */}
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="text-xs w-[15%] md:w-[10%]">4 stars</div>
            <div className="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-[8px] rounded-full"
                style={{
                  width: `${
                    ratingCount[4] ? (ratingCount[4] / Review.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs w-[10%] text-center">
              {ratingCount[4] || 0}
            </div>
          </div>

          {/* 3 stars rating */}
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="text-xs w-[15%] md:w-[10%]">3 stars</div>
            <div className="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-[8px] rounded-full"
                style={{
                  width: `${
                    ratingCount[3] ? (ratingCount[3] / Review.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs w-[10%] text-center">
              {ratingCount[3] || 0}
            </div>
          </div>

          {/* 2 stars rating */}
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="text-xs w-[15%] md:w-[10%]">2 stars</div>
            <div className="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-[8px] rounded-full"
                style={{
                  width: `${
                    ratingCount[2] ? (ratingCount[2] / Review.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs w-[10%] text-center">
              {ratingCount[2] || 0}
            </div>
          </div>

          {/* 1 star rating */}
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="text-xs w-[15%] md:w-[10%]">1 star</div>
            <div className="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-[8px] rounded-full"
                style={{
                  width: `${
                    ratingCount[1] ? (ratingCount[1] / Review.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs w-[10%] text-center">
              {ratingCount[1] || 0}
            </div>
          </div>
        </div>
        <div className="w-full mt-4" />
        {Review?.map((item) => (
          <UserReviewCard item={item} />
        ))}
      </>
    </div>
  );
};

export default UserReviewsList;
