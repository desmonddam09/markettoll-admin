import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { Logo } from "../../assets/export";
import { LuFolderOpenDot } from "react-icons/lu";
import { TbAlertCircleOff, TbFileInvoice } from "react-icons/tb";
import { MdOutlineNoAccounts, MdSupportAgent, MdRateReview  } from "react-icons/md";
import { FaCartFlatbedSuitcase, FaTruckRampBox } from "react-icons/fa6";
import { PiDresser } from "react-icons/pi";
import cookie from "js-cookie";
import { BiMessageRounded } from "react-icons/bi";
import LogOutModal from "../LogOut/LogOutModal";
import { AuthContext } from "../../context/AuthContext";
const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Dashboard");
  const { setShowModal } = useContext(AuthContext);

  const navigateToLink = (link, name) => {
    navigate(link);
    setActiveLink(name);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full py-6 px-2  lg:px-5 flex overflow-y-auto description-scroll flex-col items-center gap-y-6">
      <div>
        {/* <h1 className="text-2xl font-semibold">BCT</h1> */}
        <img src={Logo} alt="" />
      </div>
      <ul className="w-full flex flex-col gap-y-2">
        <li className={`w-full text-black`}>
          <button
            onClick={() => navigateToLink("/", "Dashboard")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Dashboard"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <LuLayoutDashboard className="text-lg" /> Dashboard
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/users", "Users")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Users"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <LuUser className="text-lg" /> Users
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/inactive", "InActive")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "InActive"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <TbAlertCircleOff className="text-lg" /> Inactive Users
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/products", "Products")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Products"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <FaCartFlatbedSuitcase className="text-lg" /> Products
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/review-product", "review-product")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "review-product"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <MdRateReview className="text-lg" /> Reveiw Product
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/order", "Order")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Order"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <FaTruckRampBox className="text-lg" />
            Orders
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/category", "Category")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Category"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <PiDresser className="text-lg" /> Categories
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/affiliate", "Affiliate")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Affiliate"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
           { activeLink === "Affiliate"?( <img src="/affiliate.png" className="w-5" alt="affiliate.png" />):( <img src="/affiliate-dark.png"  className="w-5" alt="affiliate.png" />)} Affiliate
          </button>
        </li>
        {/* <li className="w-full">
          <button
            onClick={() => navigateToLink("/goal", "Goal")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Goal"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
           { activeLink == "Goal"?( <img src="/goal.png" className="w-5" alt="goal.png" />):( <img src="/goal-dark.png"  className="w-5" alt="goal.png" />)} Goal
          </button>
        </li> */}

        <li className="w-full">
          <button
            onClick={() => navigateToLink("/deleted", "Deleted")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Deleted"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <MdOutlineNoAccounts className="text-lg" /> Deleted
          </button>
        </li>
        <li
          className={`w-full `} // Add background when dropdown is open
        >
          <button
            onClick={() => setIsDropdownOpen((prevState) => !prevState)} // Toggle dropdown
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              isDropdownOpen
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] text-nowrap hover:text-white transition-all duration-300"
            }`}
          >
            <MdSupportAgent className="text-lg" />
            Customer
          </button>

          {/* Dropdown Menu for Customer */}
          {isDropdownOpen && (
            <ul className="ml-6 mt-2 bg-white border rounded-lg">
              <li className="w-full">
                <button
                  onClick={() => navigateToLink("/customer", "Customer")}
                  className={`text-sm flex items-center  gap-3 font-medium w-full py-3 px-6 rounded-lg ${
                    activeLink === "customer"
                      ? "bg-[#0098EA] text-white"
                      : "bg-transparent text-black  hover:bg-[#0098EA] hover:text-white transition-all duration-300"
                  }`}
                >
                  Email Support
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => navigateToLink("/chat", "Chat")}
                  className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
                    activeLink === "Chat"
                      ? "bg-[#0098EA] text-white"
                      : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
                  }`}
                >
                  <BiMessageRounded className="text-lg" />
                  Live Chat
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* <li className="w-full ">
          <button
            onClick={() =>
              navigateToLink("/plans", "Plans")
            }
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Plans"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <MdOutlineSubscriptions className="text-lg" /> Plans
          </button>
        </li> */}
        <li className="w-full ">
          <button
            onClick={() => navigateToLink("/revenue", "revenue")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "revenue"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <TbFileInvoice className="text-lg" /> Subscription
          </button>
        </li>
        <li className=" w-full">
          <button
            onClick={() => navigateToLink("/notifications", "Notifications")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Notifications"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <IoNotificationsOutline className="text-lg" /> Notifications
          </button>
        </li>
        <li className="w-full ">
          <button
            onClick={() => navigateToLink("/reports", "Settings")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Settings"
                ? "bg-[#0098EA] text-white"
                : "bg-transparent text-black hover:bg-[#0098EA] hover:text-white transition-all duration-300"
            }`}
          >
            <LuFolderOpenDot className="text-lg" /> Reports
          </button>
        </li>
        <li className={`w-full  text-white`}>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="text-sm font-medium w-full py-3 px-6 flex items-center gap-3 text-black rounded-lg hover:bg-[#0098EA] hover:text-white transition-all duration-300"
          >
            <HiOutlineLogout className="text-lg" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
