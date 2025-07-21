import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  // const checkUser = () => {
  //   if (user) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);
  
  return <div></div>;
};

export default Auth;
