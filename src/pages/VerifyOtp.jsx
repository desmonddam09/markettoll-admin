import React, { useEffect, useState } from "react";
import { OTPMockup } from "../assets/export";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../constants/BaseUrl";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const state=useLocation();
  const [Otp,setOtp]=useState("")

  const handleNavigate = (e) => {
    e.preventDefault();
  
    fetch(`${BASE_URL}/users/forgot-password-verify-email-otp`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.state?.email,
        otp:Otp
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Wrong Otp');
        }
        return res.json();
      })
      .then((data) => {              
        navigate("/reset-password", { state: { email: state.state?.email } });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  
  }

  useEffect(() => {
    document.title = "Market-Toll - Verify OTP";
  }, []);

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-6">
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Verify OTP</h3>
                <p className="text-sm mt-4">
                  Input the OTP code we've provided at your registered email.
                </p>
              </div>
              <div>
                <label className="text-sm mb-2 block">OTP Code</label>
                <div className="relative flex items-center">
                  <input
                    name="otp"
                    type="password"
                    value={Otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    required
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-none"
                    placeholder="OTP Code"
                  />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg> */}
                </div>
              </div>

              <div className="!mt-4">
                <button
                  type="button"
                  onClick={handleNavigate}
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white bg-[#0098EA] hover:opacity-85 focus:outline-none"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[550px] md:h-[400px] max-md:mt-10">
            <img
              src={OTPMockup}
              className="w-full h-full object-cover"
              alt="Authentication Mockup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
