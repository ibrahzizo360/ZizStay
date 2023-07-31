import { useState, useEffect } from "react";
import Axios from "../utils/Axios";


const useRoomsCount = (url, token) => {
  const [roomsCount, setRoomsCount] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: url,
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });
      setRoomsCount(response.data.count);
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

  return { roomsCount};
};

export default useRoomsCount;
