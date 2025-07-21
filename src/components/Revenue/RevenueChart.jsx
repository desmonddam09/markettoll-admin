import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const RevenueChart = () => {
  const [data, setData] = useState([]);
  const { isUserData, setLoader } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [monthPick, setMonthPick] = useState(new Date());
  const [originalData, setOriginalData] = useState([]); 
  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(
      `${BASE_URL}/admin/yearly-subscription-revenue?year=${startDate.getFullYear()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const updatedData = res.data.map((item) => {
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          return {
            Revenue: item.revenue,
            name: monthNames[item._id - 1] || item._id,
          };
        });
        console.log(updatedData, "updatedData");
        setOriginalData(updatedData);
        setData(updatedData);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData,startDate]);

  const customHeader = ({ date, changeYear, changeMonth }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>
        {date.getFullYear()} -{" "}
        {date.toLocaleString("default", { month: "long" })}
      </span>
    </div>
  );
  const MonthFilterGraph = (date) => {
    const shortMonthName = date.toLocaleString("default", { month: "short" });
    const filteredData = data.filter((item) => item.name === shortMonthName);
    if (filteredData.length === 0) {
      setData(originalData);
    } else {
      setData(filteredData);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-ful flex flex-col items-start lg:flex-row lg:items-center justify-between gap-y-3">
        <h1 className="text-xl font-bold">Subscriptions</h1>
         <div className="w-full flex gap-2  text-end justify-end">
               <div>
                 <DatePicker
                   className="w-[80px] px-1 focus:border-[#0098EA] focus:outline-[#0098EA] border rounded-lg"
                   selected={monthPick}
                   onChange={(date) => {
                     // Set the selected month and filter data
                     setMonthPick(date);
                     MonthFilterGraph(date);
                   }}
                   dateFormat="MM"
                   showMonthYearPicker
                   showFullMonthYearPicker
                   showTwoColumnMonthYearPicker
                   renderCustomHeader={customHeader}
                 />
               </div>
               <div>
                 <DatePicker
                   className="w-[80px] px-1  focus:border-[#0098EA]  focus:outline-[#0098EA]  border rounded-lg"
                   selected={startDate}
                   onChange={(date) => setStartDate(date)}
                   maxDate={new Date()}
                   showYearPicker
                   dateFormat="yyyy"
                 />
               </div>
          </div>
      </div>
      <div className="w-full h-[30vh] border rounded-xl lg:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={"100%"} height={"100%"} data={data}>
            <XAxis dataKey="name" className="text-xs text-gray-500" />
            <YAxis className="text-xs text-gray-500" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="rgb(234 179 8)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
