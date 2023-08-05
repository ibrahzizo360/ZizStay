import { useState, useEffect } from "react";
import Axios from "../utils/Axios";


const useTotalRevenue = (url, token) => {
  const [totalRevenue, setTotalRevenue] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: url,
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });
      setTotalRevenue(response.data.balance);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return { totalRevenue};
};

export default useTotalRevenue;
