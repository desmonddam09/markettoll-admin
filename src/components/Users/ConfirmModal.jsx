import React, { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import { BiBlock } from "react-icons/bi";
const ConfirmBlockModal = ({UserId,handleBlockUser,isBlocked,handleUnBlockUser}) => {
  const { blockedModal,setBlockedModal } = useContext(AuthContext);

  return (
    blockedModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white w-[400px] h-[250px]  rounded-lg ">
          <div className="flex items-center flex-col justify-center gap-y-4 h-full">
            <div  className="flex flex-col gap-y-2 items-center" >
              <BiBlock className="text-[#0098EA]" size={40} />
              <h3 className="text-2xl" > {isBlocked?"Block User":"UnBlock User"} </h3>
            </div>
          <p className="text-center text-wrap mt-4 text-gray-600" >{isBlocked?"Are you sure you want to Block":"Are you sure you want to UnBlocked"}  </p>
          <div className="flex items-center justify-center gap-5 " >
            <button onClick={()=>{
              setBlockedModal(!blockedModal)
            }} className="bg-gray-200 text-sm px-4 py-2 rounded-md">Cancel</button>
            <button onClick={()=>{  
                if (isBlocked=="active") {                    
                    handleBlockUser(UserId);   
                    setBlockedModal(!blockedModal);
                }
                else{
                    handleUnBlockUser(UserId);   
                    setBlockedModal(!blockedModal);
                }
            }}  className="bg-red-500 text-white text-sm px-4 py-2 rounded-md">{isBlocked=="active"?"Block":"UnBlock"}</button>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmBlockModal;
