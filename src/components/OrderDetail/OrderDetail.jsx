import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
export default function DetailOrder() {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [OrderDetail, SetOrderDetail] = useState([]);
  const params = useParams("");

  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/orders?page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data, "orderss");
        let filterData = res.data.filter((item) => item._id == params.id);
        SetOrderDetail(filterData);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData]);
  console.log(OrderDetail[0], "orderDetail");
  const deliveryAddress = OrderDetail[0]?.deliveryAddress;
  const formattedAddress = `${deliveryAddress?.streetAddress}, ${deliveryAddress?.apartment_suite}, ${deliveryAddress?.city}, ${deliveryAddress?.state}, ${deliveryAddress?.country}, ${deliveryAddress?.zipCode}`;
  const navigate = useNavigate("");

  return (
    <>
      <div className="flex items-center justify-center  ">
        {loader&&<span className="loader !left-[40%]"></span>}
      </div>

      <div className="py-4 px-4 md:px-6 2xl:px-4 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order Detail
          </h1>
        </div>

        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>

              {OrderDetail[0]?.sellersProducts?.map((sellerProduct) => {
                return sellerProduct?.fulfillmentMethods?.map((method) => {
                  return (
                    method?.products.length > 0 &&
                    method?.products.map((item) => (
                      <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            className="w-full hidden !h-[120px] md:block"
                            src={
                              item?.product?.images[0]?.url
                                ? item?.product?.images[0]?.url
                                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt="product Img"
                          />
                          <img
                            className="w-full !h-[120px] md:hidden"
                            src={
                              item?.product?.images[0]?.url
                                ? item?.product?.images[0]?.url
                                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt="product Img"
                          />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3
                              onClick={() => {
                                navigate(
                                  `/productDetail/${item?.product?._id}`,
                                  {
                                    state: { data: item?.product },
                                  }
                                );
                              }}
                              className="text-xl cursor-pointer dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"
                            >
                              {item?.product?.name}
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-500">
                                  Category:{" "}
                                </span>{" "}
                                {item?.product?.category}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-500">
                                  Sub Category:{" "}
                                </span>{" "}
                                {item?.product?.subCategory}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-500">
                                  Status:{" "}
                                </span>{" "}
                                {method.method === "selfPickup"
                                  ? "Self Pickup"
                                  : "Delivery"}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base dark:text-white xl:text-lg leading-6">
                              ${item?.product?.price}
                            </p>
                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                              QTY/{item?.product?.quantity}
                            </p>
                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                              ${item?.product?.price * item?.product?.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  );
                });
              })}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p
                      onClick={() => {
                        navigate(`/user/${OrderDetail[0]?.placerDetails._id}`, {
                          state: { data: OrderDetail[0]?.placerDetails },
                        });
                      }}
                      className=" cursor-pointer text-base dark:text-white font-semibold leading-4 text-left text-gray-800"
                    >
                      {OrderDetail[0]?.placerDetails?.name}
                    </p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      +{OrderDetail[0]?.placerDetails?.phoneNumber.code}
                      {OrderDetail[0]?.placerDetails?.phoneNumber.value}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img
                    className="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                    alt="email"
                  />
                  <img
                    className="hidden dark:block"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                    alt="email"
                  />
                  <p className="cursor-pointer text-sm leading-5 ">
                    {OrderDetail[0]?.placerDetails?.email.value}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Delivery Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {formattedAddress}
                    </p>
                  </div>
                  {/* <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    180 North King Street, Northhampton MA 1060
                  </p>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
