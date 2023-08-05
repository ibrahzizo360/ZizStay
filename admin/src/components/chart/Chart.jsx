import React, { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPastWeekBookings } from "../../utils/booking";

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const getDayName = (dayOfWeek) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayOfWeek - 1];
  };

  const toDate = new Date();
  const today = toDate.getDay()+1;

  const fetchData = () => {
    getPastWeekBookings(token)
      .then(data => {
        const totalsByDay = {
          1: 0, // Sunday
          2: 0, // Monday
          3: 0, // Tuesday
          4: 0, // Wednesday
          5: 0, // Thursday
          6: 0, // Friday
          7: 0  // Saturday
        };

        // Sum up total amounts by day
        data.forEach(item => {
          totalsByDay[item.dayOfWeek] += item.totalAmount;
        });

        // Create the formattedData array for the entire week
        const formattedData = [];
        for (let day = 1; day <= 7; day++) {
          formattedData.push({
            name: getDayName(day),
            Total: totalsByDay[day]
          });
        }

        const newFormattedData = [
          ...formattedData.slice(today),
          ...formattedData.slice(0, today)
        ];
        console.log(today)

        setData(newFormattedData);
        console.log(newFormattedData)
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts

    // Calculate the time until midnight
    const now = new Date();
    const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    // Set up an interval to fetch data at midnight
    const intervalId = setInterval(() => {
      fetchData();
    }, timeUntilMidnight);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 7, right: 15, left: 10, bottom: 10 }} 
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="gray"
            interval={0}
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
