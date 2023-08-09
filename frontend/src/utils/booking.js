import Axios from "./Axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

export const addBooking = async (userId , info) => {
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