import React, { useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductReviewsList from "../components/ProductDetail/ProductReviewsList";
import ProductSeller from "../components/ProductDetail/ProductSeller";
import ProductOrder from "../components/ProductDetail/ProductOrder";

export default function ProductDetail() {
  const loc = useLocation("");
  const navigate=useNavigate("");
  console.log(loc?.state?.data,"data");
  useEffect(()=>{
    if (!loc?.state?.data) {
      navigate("/products")
    }
  })
  return (
    <div className="w-full relative">
      <div className="w-full p-4 rounded-[30px] bg-[#F7F7F7]">
        <div className="w-full p-6 rounded-[30px] bg-[#ffff]">
          <div className="flex items-center justify-between">
            <Link to="/products" className="flex items-center gap-1 mb-5">
              <GoArrowLeft className="text-xl" />
              <span className="font-medium text-sm text-[#5C5C5C]">Back</span>
            </Link>
            <button
              className={`w-auto px-3 py-3 bg-[#0098EA] text-white hover:opacity-80 rounded-md text-xs`}
            >
              Deactivate{" "}
            </button>
          </div>
          <div className="w-full mt-2 flex flex-col lg:flex-row justify-start gap-x-8 gap-y-6">
            <div className="w-full relative">
              <img
                src={loc?.state?.data?.images[0].url}
                alt="product image"
                className="w-full h-auto lg:h-[376px] object-cover rounded-xl"
              />
              <div className="w-full grid grid-cols-4 mt-3 gap-3">
                {/* {product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`rounded-xl h-[97px] w-full object-cover cursor-pointer ${
                      image?.url === displayImage?.url
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))} */}
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-5">
              <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <h2 className="text-[20px] blue-text font-bold">
                  {loc?.state?.data?.name}
                </h2>
                <h3 className="text-[24px] font-bold">
                  ${loc?.state?.data?.price}
                </h3>
              </div>
              <div className="w-full border" />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div className="grid grid-cols-2 gap-y-3">
                  <p className="text-[13px] text-[#7C7C7C] font-medium">City</p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.city}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-medium">
                    Category
                  </p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.category}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-y-3">
                  <p className="text-[13px] text-[#7C7C7C] font-medium">
                    State
                  </p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.state}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-medium">
                    Sub Category
                  </p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.subCategory}
                  </p>
                </div>
              </div>
              <div className="w-full border" />
              <div className="w-full">
                <p className="text-[16px] text-[#003DAC] font-bold mb-3">
                  Description
                </p>
                <p className="text-[14px] font-normal">
                  {loc?.state?.data?.description}
                </p>
              </div>
              <div className="w-full border" />
              <ProductSeller seller={loc?.state?.data?.seller} />
              <div className="w-full border" />
            </div>
          </div>
          <div className="mt-3">
          <h1 className="font-semibold mb-3 text-xl">Product Orders</h1>
            <ProductOrder Producid={loc?.state?.data._id} />
          </div>
          <div className="mt-16 ">
          <h1 className="font-semibold mb-3 text-xl">Product Reviews</h1>
            <ProductReviewsList Producid={loc?.state?.data._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
