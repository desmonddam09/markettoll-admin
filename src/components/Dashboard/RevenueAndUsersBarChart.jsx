import React, { PureComponent, useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const RevenueAndUsersBarChart = () => {
  const [data, setData] = useState([]);
  const { isUserData, setLoader } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [monthPick, setMonthPick] = useState(new Date());
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const token = isUserData?.token;
    Promise.all([
      fetch(`${BASE_URL}/admin/yearly-orders?year=${startDate.getFullYear()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch(
        `${BASE_URL}/admin/yearly-subscription-revenue?year=${startDate.getFullYear()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()),
    ])
      .then(([orderData, revenueData]) => {
        // Process and map order data
        const orderDataMap = orderData.data.reduce((acc, item) => {
          acc[item._id] = item.order_count;
          return acc;
        }, {});
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
        // Combine revenue and order data
        const updatedData = revenueData.data.map((item) => {
          const month = item._id - 1;
          return {
            name: monthNames[month] || item._id,
            Revenue: item.revenue,
            Order: orderDataMap[item._id] || 0,
          };
        });
        // Set the full data (and store it as originalData)
        setOriginalData(updatedData);
        setData(updatedData); // Set the data initially
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoader(false);
      });
  }, [isUserData, startDate]);

  const [lineVisibility, setLineVisibility] = useState({
    Order: true,
    Revenue: true,
  });

  const toggleLineVisibility = (lineKey) => {
    setLineVisibility((prevState) => ({
      ...prevState,
      [lineKey]: !prevState[lineKey],
    }));
  };

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
    // Get the short month name from the date
    const shortMonthName = date.toLocaleString("default", { month: "short" });

    // Filter the data based on the selected short month name
    const filteredData = data.filter((item) => item.name === shortMonthName);

    // If no data is found for the selected month, set data back to full dataset
    if (filteredData.length === 0) {
      setData(originalData); // 'originalData' should hold the full dataset
    } else {
      // Update the state with filtered data
      setData(filteredData);
    }
  };

  return (
    <div className="w-full h-[50vh] pt-6 pb-4 px-0 border pr-6 rounded-xl relative">
      <div className="w-full flex gap-2 absolute top-2 right-2 text-end justify-end">
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
            className="w-[80px] px-1 focus:border-[#0098EA] focus:outline-[#0098EA] border rounded-lg"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={new Date()} // This will disable future dates
            showYearPicker
            dateFormat="yyyy"
          />
        </div>
        <span
          className="text-xs bg-[#eab40b] text-white px-3 py-3 rounded-full cursor-pointer"
          onClick={() => toggleLineVisibility("Order")}
        ></span>
        <span
          className="bg-green-700 text-white px-3 py-1 rounded-full text-xs cursor-pointer"
          onClick={() => toggleLineVisibility("Revenue")}
        ></span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={"100%"}
          height={"100%"}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" className="text-xs text-gray-500" />
          <YAxis className="text-xs text-gray-500" />
          <Tooltip />
          {lineVisibility.Order && (
            <Line
              type="monotone"
              dataKey="Order"
              stroke="rgb(234 179 8)"
              activeDot={{ r: 8 }}
              onClick={() => toggleLineVisibility("Order")}
            />
          )}
          {lineVisibility.Revenue && (
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="#82ca9d"
              onClick={() => toggleLineVisibility("Revenue")}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueAndUsersBarChart;
