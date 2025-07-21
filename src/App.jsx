import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import UserProvider from "./context/UserContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Cookie from "js-cookie";

function App() {
  const { isLoggedIn, setUserData, setIsLoggedIn } = useContext(AuthContext);

  const token = Cookie.get("data");
  const navigate = useNavigate("");
  useEffect(() => {
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        setUserData(parsedToken);
        console.log("data", parsedToken);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <UserProvider>
      <Routes>
        {AppRoutes.map((route, index) => {
          // if (route.isPrivate && !isLoggedIn) {
          //   return <Route path={route.url} element={<Navigate to="/login" />} key={index} />;
          // }
          return <Route path={route.url} element={route.page} key={index} />;
        })}
      </Routes>
    </UserProvider>
  );
}

export default App;
