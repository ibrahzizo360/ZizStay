import { useState, useEffect } from "react";
import Axios from "../utils/Axios";


const useUsersCount = (url, token) => {
  const [usersCount, setUsersCount] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: url,
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });
      setUsersCount(response.data.count);
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

  return { usersCount};
};

export default useUsersCount;
