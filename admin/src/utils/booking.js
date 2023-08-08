import Axios from "./Axios";

const token = localStorage.getItem("token");

export const getPastWeekBookings = async () => {
    try {
        const {data} = await Axios({
            url: `bookings/find/past-week`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getLatestBookings = async () => {
    try {
        const {data} = await Axios({
            url: "bookings",
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`},
        });

        return data ?? [];
    } catch (e) {
        console.log(e);
        return []; 
    }
}

export const getTodayRevenue = async () => {
    try {
        const {data} = await Axios({
            url: "bookings/get/today-revenue",
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

        return data.amount;
    } catch (e) {
        console.log(e);
    }
}

export const getTotalRevenue = async () => {
    try {
        const {data} = await Axios({
            url: "bookings/get/total-revenue",
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
          });

        return data.balance;
    } catch (e) {
        console.log(e);
        return []; 
    }
}
