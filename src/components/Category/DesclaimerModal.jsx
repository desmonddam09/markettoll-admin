import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GoAlert } from "react-icons/go";
const DesClaimerModal = ({handleSubmit}) => {
  const { disclaimerModal, setDisclaimerModal } = useContext(AuthContext);  
  return (
    disclaimerModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white w-[450px] h-[280px] rounded-lg ">
          <div className="flex items-center flex-col justify-center gap-y-4 h-full">
            <div className="flex flex-col gap-y-2 items-center">
              <GoAlert className="text-[#0098EA]" size={40} />
              <h3 className="text-2xl">Alert</h3>
            </div>
            <p className="text-center text-wrap mt-4 text-gray-600">
              Are you sure you want to create this category? <br />
              Once created, you won't be able to change it again.
            </p>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={() => {
                  setDisclaimerModal(!disclaimerModal);
                }}
                className="bg-gray-200 text-sm px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                    handleSubmit();
                  setDisclaimerModal(!disclaimerModal);
                  // Your category creation logic here
                  // For example: createCategory();
                }}
                className="bg-red-500 text-white text-sm px-4 py-2 rounded-md"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DesClaimerModal;
