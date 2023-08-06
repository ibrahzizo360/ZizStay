import { useState, useEffect } from "react";
import Axios from "../utils/Axios";

const useTodayRevenue = (token) => {
  const [todayRevenue, setTodayRevenue] = useState(undefined);

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: "bookings/get/today-revenue",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodayRevenue(response.data.amount);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    const timeUntilNextDay = nextDay - now;

    const timeoutId = setTimeout(() => {
      fetchData();
    }, timeUntilNextDay);

    return () => clearTimeout(timeoutId);
  }, [token]);

  return { todayRevenue };
};

export default useTodayRevenue;
