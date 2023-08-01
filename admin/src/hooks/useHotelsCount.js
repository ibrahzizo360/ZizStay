import { useState, useEffect } from "react";
import Axios from "../utils/Axios";


const useHotelsCount = (url, token) => {
  const [hotelsCount, setHotelsCount] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: url,
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });
      setHotelsCount(response.data.count);
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

  return { hotelsCount};
};

export default useHotelsCount;
