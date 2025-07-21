import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const user = getUserFromToken();
    // setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
