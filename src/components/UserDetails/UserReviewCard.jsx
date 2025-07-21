import React from "react";
import { IoIosStar } from "react-icons/io";

const UserReviewCard = ({ item }) => {
  console.log(item, "itemss");

  return (
    <div className="border-t py-3 pb-5">
      <div className="flex items-center gap-1 my-2">
        {Array.from({ length: 5 }, (_, index) => (
          <IoIosStar
            key={index}
            className={`text-xl ${
              index < item?.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm font-normal leading-[14.4px]">
        {item?.description}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <img
          src={item?.reviewer.profileImage || "/seller-profile-img.png"}
          alt="customer-img"
          className="w-[34px] h-[32px] rounded-full"
        />
        <span className="text-xs font-medium">{item?.reviewer.name}</span>
        <span className="text-xs font-normal text-[#5C5C5C]">
          {new Date(item?.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default UserReviewCard;
