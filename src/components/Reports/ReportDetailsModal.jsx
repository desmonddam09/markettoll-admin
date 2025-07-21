import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const ReportDetailsModal = ({ showModal, onclick }) => {
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 px-4 transition-all duration-1000">
        <div className="bg-white w-[620px] h-auto px-10 pt-10 pb-10 rounded-lg relative flex flex-col gap-6">
          <button
            className="w-6 h-6 absolute right-4 top-4 rounded-full bg-gray-200 p-1"
            onClick={onclick}
          >
            <IoCloseOutline className="w-full h-full" />
          </button>
          <h1 className="font-semibold mb-2">Report Information</h1>
          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-normal">Reporter's username: </p>
            <p className="text-sm font-normal">Jane Smith</p>
          </div>
          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-normal">Reported user: </p>
            <p className="text-sm font-normal">John Doe</p>
          </div>
          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-normal">Category: </p>
            <p className="text-sm font-normal">Harassment</p>
          </div>
          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-normal">Reported date: </p>
            <p className="text-sm font-normal">24-04-2024</p>
          </div>
          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-normal">Report Status: </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-normal  text-red-500 ">Unresolved</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-end gap-3 mt-2">
           
            <button className="text-xs font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 px-3 py-1 rounded-lg">
              Block User
            </button>
            <button className="text-xs font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 px-3 py-1 rounded-lg" onClick={onclick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReportDetailsModal;
