import Axios from "./Axios";
import { toast } from "react-toastify"

export const addBooking = async (userId , info, token) => {
    try {
        await Axios({
            url: `bookings/${userId}`,
            method: "POST",
            data: info,
            headers: {Authorization: `Bearer ${token}`},
        });
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "updateRoom",
            }
        );
    }
}