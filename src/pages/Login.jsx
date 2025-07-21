import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginImage } from "../assets/export";
import { LuEye, LuEyeOff } from "react-icons/lu";
import BASE_URL from "../constants/BaseUrl";
import Cookie from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Display the loader toast
    const loaderToast = toast.loading("Processing... Please wait.", {
      position: "top-right",
      autoClose: false, 
    });
  
    fetch(`${BASE_URL}/admin/email-password-login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // If the response is not OK, throw an error with the message
          return res.json().then((errorData) => {
            throw new Error(errorData?.message || 'Failed to log in');
          });
        }
        return res.json();
      })
      .then((data) => {
        // On successful login
        Cookie.set("data", JSON.stringify(data?.data));
        setIsLoggedIn(true);
        toast.update(loaderToast, {
          render: 'Logged in successfully!',
          type: 'success',
          isLoading:false,
          autoClose: 3000, // Close after 3 seconds
        });
        navigate("/");
      })
      .catch((err) => {
        // Update loader toast to error and auto-close after 3 seconds
        toast.update(loaderToast, {
          render: err.message || 'An error occurred!',
          type: 'error',
          isLoading:false,
          autoClose: 3000, // Close after 3 seconds
        });
  
        // Optionally log the error in console for debugging
        console.error('Error:', err);
      });
  };
  

  useEffect(() => {
    document.title = "Market-Toll - Login";
  }, []);

  return (
    <div className="font-[sans-serif] text-[#333]">
      
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="rounded-md p-6 lg:p-10 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4">Sign in to your account.</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center border justify-start border-gray-300 rounded-md px-4">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <LuEyeOff className="text-lg text-gray-400" />
                    ) : (
                      <LuEye className="text-lg text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="text-sm">
                  <Link
                    to="/verify-email"
                    className="text-[#028EE6] hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="!mt-4">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white bg-[#0098EA] hover:bg-opacity-85 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[550px] md:h-[400px] max-md:mt-10">
            <img
              src={LoginImage}
              className="w-full h-full object-cover"
              alt="Authentication Mockup"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
