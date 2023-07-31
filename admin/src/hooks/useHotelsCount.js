import { useState, useEffect } from "react";
import Axios from "../utils/Axios";


const useHotelsCount = (url, token) => {
  const [hotelsCount, setHotelsCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        url: url,
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });

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
