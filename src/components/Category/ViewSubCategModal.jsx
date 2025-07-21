import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaX } from "react-icons/fa6";

const ViewSubCategModal = ({ Categories }) => {
  const { ViewSubCatModal, setViewSubCatModal, isUserData } =
    useContext(AuthContext);
  return (
    ViewSubCatModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white w-[450px] px-3 py-5 h-[450px]  rounded-lg ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Sub Categories</h1>
            <button
              onClick={() => {
                setViewSubCatModal(false);
              }}
            >
              <FaX />
            </button>
          </div>

          <ul className="mt-5 px-2 description-scroll divide-gray-200 dark:divide-gray-700 overflow-auto h-[90%]">
            {Categories?.map((el) => (
              <li className="mt-4  border rounded-lg  ">
                <div className="flex items-center w-full space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 p-3">
                    <img
                      className="w-8 h-8 rounded-md"
                      src={el?.image}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                     {el?.name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default ViewSubCategModal;
