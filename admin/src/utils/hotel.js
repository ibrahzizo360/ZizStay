import Axios from "./Axios";
import { toast } from "react-toastify"

const token = localStorage.getItem("token");

export const addHotel = async (info) => {
    try {
        await Axios({
            url: "hotels",
            method: "POST",
            data:info,
            headers: {Authorization: `Bearer ${token}`}
        });
        
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "addHotel",
            }
        );
    }
}

export const getHotelsCount = async () => {
    try {
        const {data} = await Axios({
            url: 'hotels',
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        return data.count
    } catch (e) {
        console.log(e)
    }
}