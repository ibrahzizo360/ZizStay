import Axios from "./Axios";
import { toast } from "react-toastify"

export const addRoom = async (info ,token, hotelId) => {
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