import Axios from "../utils/Axios";

const token = localStorage.getItem("token");


export const getUsersCount = async () => {
    try {
        const {data} = await Axios({
            url: 'users/count',
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        return data.count
    } catch (e) {
        console.log(e)
    }
}