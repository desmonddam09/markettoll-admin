import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import BASE_URL from "../../constants/BaseUrl";

const CreateNotification = ({ showModal, onclick, token }) => {
  const [ScheduleCheck, setScheduleCheck] = useState(false);
  const [SchedulteDate, setSchedulteDate] = useState("");
  const [data, setData] = useState({
    notification_title: "",
    notification_message: "",
  });

  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(SchedulteDate, "scheduleDate");

    fetch(`${BASE_URL}/admin/notification`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data?.notification_title,
        body: data?.notification_message,
        scheduleDate: SchedulteDate,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to log in");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Notification Created", data);
        onclick();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value); 
    setSchedulteDate(date.toISOString());
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
          <h1 className="text-xl font-semibold">Send Notification</h1>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="notification_title" className="text-sm font-medium">
              Notification Title
            </label>
            <input
              type="text"
              name="notification_title"
              id="notification_title"
              value={data.notification_title}
              onChange={handleChange}
              className="w-full border rounded-lg text-sm py-2.5 px-3.5 focus:border-[#0085FF] focus:ring focus:ring-[#rgb(177 226 253)] outline-none"
              placeholder="Title"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="notification_message"
              className="text-sm font-medium"
            >
              Notification Message
            </label>
            <textarea
              name="notification_message"
              id="notification_message"
              rows={"6"}
              value={data.notification_message}
              onChange={handleChange}
              className="w-full border rounded-lg text-sm py-2.5 px-3.5 focus:border-[#0085FF] focus:ring focus:ring-[#rgb(177 226 253)] outline-none"
              placeholder="Message..."
            ></textarea>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="scheduled_notification"
              className="flex cursor-pointer items-center  text-sm font-medium"
            >
              <input
                type="checkbox"
                name="scheduled_notification"
                id="scheduled_notification"
                className="mr-1"
                value={ScheduleCheck}
                onChange={(e) => setScheduleCheck(e.target.checked)}
              />
              Scheduled Notification
            </label>
          </div>
          {ScheduleCheck && (
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="notification_title"
                className="text-sm font-medium"
              >
                Select Date Time
              </label>
              <input
                type="datetime-local"
                name="notification_title"
                id="notification_title"
                value={SchedulteDate ? SchedulteDate.slice(0, 19) : ""} // Display in input without 'Z' (it’s not needed in the field)
                onChange={handleDateChange}
                className="w-full border rounded-lg text-sm py-2.5 px-3.5 focus:border-[#0085FF] focus:ring focus:ring-[#rgb(177 226 253)] outline-none"
                placeholder="Title"
              />
            </div>
          )}

          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full bg-[#0098EA] text-white font-medium text-sm rounded-lg py-3"
            >
              Send Now
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CreateNotification;
