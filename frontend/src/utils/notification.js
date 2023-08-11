import Axios from "./Axios"


const token = localStorage.getItem("token");
export const sendNotification = async(info) => {
    try{
        const {data} = await Axios({
            url: "notifications",
            method: "POST",
            data: info,
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } catch(e){
        console.log(e)
    }
}