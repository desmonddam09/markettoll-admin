import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import BASE_URL from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const CustomerReply = ({ showModal, onclick, id, token, setShowModal }) => {
  const [data, setData] = useState({
    notification_message: "",
  });

  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Processing... Please wait.", {
      position: "top-right",
      autoClose: false,
    });

    fetch(`${BASE_URL}/admin/email-support-request-reply/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: data?.notification_message,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          toast.update(loadingToast, {
            render: "Failed to send the message. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
          throw new Error("Failed to send the message");
        }
        return res.json();
      })
      .then((data) => {
        setShowModal(false);
        setData({
          notification_message: "",
        })
        toast.update(loadingToast, {
          render: "Message sent successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch((err) => {
        toast.update(loadingToast, {
          render: "An error occurred while processing your request.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        console.error("Error:", err);
      });
  };

  return (
    showModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-[500px] h-auto bg-white p-6 rounded-lg flex flex-col gap-5 relative"
        >
          <button
            className="w-6 h-6 rounded-full bg-gray-200 p-1 absolute top-6 right-6"
            onClick={onclick}
          >
            <IoClose className="w-full h-full" />
          </button>
          <h1 className="text-xl font-semibold">Email Reply</h1>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="notification_message"
              className="text-sm font-medium"
            >
              Message
            </label>
            <textarea
              name="notification_message"
              id="notification_message"
              rows={"6"}
              required
              value={data.notification_message}
              onChange={handleChange}
              className="w-full border rounded-lg text-sm py-2.5 px-3.5 focus:border-[#0085FF] focus:ring focus:ring-[#rgb(177 226 253)] outline-none"
              placeholder="Message..."
            ></textarea>
          </div>
          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full bg-[#0098EA] text-white font-medium text-sm rounded-lg py-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CustomerReply;
