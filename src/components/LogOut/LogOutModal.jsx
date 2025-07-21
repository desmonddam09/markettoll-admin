import React, { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
const LogOutModal = () => {
  const { showModal,setShowModal } = useContext(AuthContext);
  const navigate=useNavigate("");
  return (
    showModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white w-[400px] h-[250px]  rounded-lg ">
          <div className="flex items-center flex-col justify-center gap-y-4 h-full">
            <div  className="flex flex-col gap-y-2 items-center" >
              <RiLogoutCircleRLine className="text-[#0098EA]" size={40} />
              <h3 className="text-2xl" >Log Out</h3>
            </div>
          <p className="text-center text-wrap mt-4 text-gray-600" >Are you sure you want to log out <br/> of your account?</p>
          <div className="flex items-center justify-center gap-5 " >
            <button onClick={()=>{
              setShowModal(!showModal)
            }} className="bg-gray-200 text-sm px-4 py-2 rounded-md">Cancel</button>
            <button onClick={()=>{  
               setShowModal(!showModal)          
              cookie.remove("data");    
              navigate("/login")                             
            }}  className="bg-red-500 text-white text-sm px-4 py-2 rounded-md">Log Out</button>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LogOutModal;
