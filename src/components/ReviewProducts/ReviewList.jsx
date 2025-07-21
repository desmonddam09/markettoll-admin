import React, { useContext, useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import ServiceListItem from "./ServiceListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import {
  FilterProductCategory,
  FilterStatus,
  FilterProductSubCategory,
  MultiRangeSlider,
} from "./Filter";

const ReviewList = ({ filterData, setFilterLength }) => {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [Product, SetProduct] = useState([]);
  const [service, setService] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [productToDisplay, setProductToDisplay] = useState([]);
  const [serviceToDisplay, setServiceToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 15;
  const [displayValue, setDisplayValue] = useState("Category");
  const [SubCategFill, setSubCategFill] = useState("Sub Category");
  const [isProducts, setIsProducts] = useState(true);
  const [isViewed, setIsViewed] = useState(true);
  const token = isUserData?.token;
  useEffect(() => {
    setLoader(true);

    fetch(
      `${BASE_URL}/admin/pending-review-products?name=${filterData || ""}&category=${displayValue == "Category" ? "" : displayValue
      }&subCategory=${SubCategFill != "Sub Category" ? SubCategFill : ""
      }&page=1`,
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
        SetProduct(res.data);
        setProductToDisplay(res?.data?.slice(0, TOTAL_VALUES_PER_PAGE));
        setFilterLength(res?.data?.slice(0, TOTAL_VALUES_PER_PAGE)?.length)
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
    setLoader(true);

    fetch(
      `${BASE_URL}/admin/pending-review-services?name=${filterData || ""}&page=1`,
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
        console.log(res.data, "service");
        setService(res.data.items);
        setServiceToDisplay(res?.data?.items?.slice(0, TOTAL_VALUES_PER_PAGE));
        setFilterLength(res?.data?.items?.slice(0, TOTAL_VALUES_PER_PAGE)?.length)
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData, filterData, displayValue, SubCategFill], productToDisplay, serviceToDisplay);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    const totalPages = Math.ceil(Product.length / TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setProductToDisplay(Product.slice(start, end));
  }, [currentPageNumber]);
  console.log("sdjf", serviceToDisplay);

  return (
    <>
      <div className="mt-2  w-full grid-cols-2  flex items-center justify-end space-x-4 md:flex">
        <button
          onClick={() => setIsProducts(true)}
          className={`active:scale-95 rounded-md ${isProducts
            ? "bg-[#0098EA] text-white"
            : "bg-gray-200 text-black"
            }  px-6 py-2 font-medium  outline-none focus:ring-gray-500 hover:opacity-90 text-sm`}
        >
          Product
        </button>
        <button
          onClick={() => setIsProducts(false)}
          className={`active:scale-95 rounded-md px-6 ${!isProducts
            ? "bg-[#0098EA] text-white"
            : "bg-gray-200 text-black"
            }  py-2 text-sm font-medium  outline-none focus:ring focus:ring-[#0098EA] hover:opacity-90 `}
        >
          Service
        </button>
      </div>
      {
        isProducts ? (
          <div className="w-full overflow-x-auto h-[400px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
            <table className="w-full mt-4  border-collapse  text-left text-sm text-gray-500">
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
                    <FilterProductCategory
                      displayValue={displayValue}
                      setDisplayValue={setDisplayValue}
                      setSubCategFill={setSubCategFill}
                    />

                    {/* Category */}
                  </th>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                  >
                    <FilterProductSubCategory
                      displayValue={displayValue}
                      SubCategFill={SubCategFill}
                      setSubCategFill={setSubCategFill}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                  >
                    <MultiRangeSlider
                      min={0}
                      max={100000}

                      dataToDisplay={productToDisplay}
                      setDataToDisplay={setProductToDisplay}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                  >
                    <FilterStatus />
                  </th>
                </tr>
              </thead>
              {loader ? <span className="loader"></span> : (
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {productToDisplay?.map((item) => (
                    <ProductListItem item={item} key={item._id} setProductToDisplay={setProductToDisplay} productToDisplay={productToDisplay} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        ) : (
          <div className="w-full overflow-x-auto h-[400px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
            <table className="w-full mt-4  border-collapse  text-left text-sm text-gray-500">
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
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                  >
                    <MultiRangeSlider
                      min={0}
                      max={100000}

                      dataToDisplay={serviceToDisplay}
                      setDataToDisplay={setServiceToDisplay}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                  >
                    <FilterStatus />
                  </th>
                </tr>
              </thead>
              {loader ? <span className="loader"></span> : (
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {serviceToDisplay?.map((item) => (
                    <ServiceListItem item={item} key={item._id} setServiceToDisplay={setServiceToDisplay} serviceToDisplay={serviceToDisplay} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        )
      }

      <div className="flex justify-end gap-3 w-full">
        <button
          className={`${currentPageNumber === 1 ? " bg-[#9fdeff]" : " bg-[#0098EA]"
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
    </>
  );
};

export default ReviewList;
