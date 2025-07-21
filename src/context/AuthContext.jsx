import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import BASE_URL from "../constants/BaseUrl";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserData, setUserData] = useState("");
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blockedModal, setBlockedModal] = useState(false);
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const [subCatModal, setSubCatModal] = useState(false);
  const [viewSubCatModal, setViewSubCatModal] = useState(false);
  const [filterMonthUser, setFilterMonthUser] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const cookieToken = Cookie.get("data");

  useEffect(() => {
    if (cookieToken) {
      try {
        const parsedToken = JSON.parse(cookieToken);
        setUserData(parsedToken);
        setIsLoggedIn(true);
        fetchCategories(parsedToken.token); // API call right after setting user
      } catch (error) {
        console.error("Failed to parse token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const fetchCategories = (token) => {
    if (!token) return;
    setLoader(true);
    fetch(`${BASE_URL}/users/product-categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res?.data || []);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoader(false);
      });
  };

  const toggleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider
      value={{
        subCatModal,
        setSubCatModal,
        filterMonthUser,
        setFilterMonthUser,
        disclaimerModal,
        setDisclaimerModal,
        isLoggedIn,
        setIsLoggedIn,
        toggleUser,
        setUserData,
        setCategories,
        categories,
        isUserData,
        loader,
        setLoader,
        setShowModal,
        showModal,
        setBlockedModal,
        blockedModal,
        viewSubCatModal,
        setViewSubCatModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
