import Axios from "./Axios";

export const getPastWeekBookings = async (token) => {
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