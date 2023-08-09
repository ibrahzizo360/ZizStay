import Axios from "./Axios";

const token = localStorage.getItem("token");

export const getHotelCities = async (destination) => {
    try {
        const {data} = await Axios({
            url: `hotels/get/hotel-cities?searchCity=${destination}`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        return data
    } catch (e) {
        console.log(e)
    }
}
