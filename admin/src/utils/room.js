import Axios from "./Axios";
import { toast } from "react-toastify"

const token = localStorage.getItem("token");

export const addRoom = async (info , hotelId) => {
    try {
        await Axios({
            url: `rooms/${hotelId}`,
            method: "POST",
            data:info,
            headers: {Authorization: `Bearer ${token}`}
        });
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "addRoom",
            }
        );
    }
}

export const getRoomsCount = async () => {
    try {
        const {data} = await Axios({
            url: 'rooms',
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        return data.count
    } catch (e) {
        console.log(e)
    }
}