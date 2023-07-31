import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useUsersCount from "../../hooks/useUsersCount";
import useHotelsCount from "../../hooks/useHotelsCount";
import useRoomsCount from "../../hooks/useRoomsCount";

const Widget = ({ type }) => {
  let dataInfo;
  const token = localStorage.getItem('token')
  const {usersCount} = useUsersCount('users/count',token);
  const {hotelsCount} = useHotelsCount('hotels/count',token);
  const {roomsCount} = useRoomsCount('rooms/count',token);


 

  switch (type) {
    case "user":
      dataInfo = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount: usersCount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotel":
      dataInfo = {
        title: "HOTELS",
        isMoney: false,
        amount: hotelsCount,
        link: "View all hotels",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      dataInfo = {
        title: "EARNINGS",
        isMoney: true,
        amount: 200,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "room":
      dataInfo = {
        title: "ROOMS",
        isMoney: false,
        amount: roomsCount,
        link: "See rooms available",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataInfo.title}</span>
        <span className="counter">
          {dataInfo.isMoney && "$"} {dataInfo.amount}
        </span>
        <span className="link">{dataInfo.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {20} %
        </div>
        {dataInfo.icon}
      </div>
    </div>
  );
};

export default Widget;