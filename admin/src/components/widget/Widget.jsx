import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { getUsersCount } from "../../utils/user";
import { getHotelsCount } from "../../utils/hotel";
import { getRoomsCount } from "../../utils/room";
import { getTotalRevenue } from "../../utils/booking";


const Widget = ({ type }) => {
  let dataInfo;
  const usersCount =  getUsersCount();
  const hotelsCount =  getHotelsCount();
  const roomsCount = getRoomsCount();
  const totalRevenue = getTotalRevenue();


  switch (type) {
    case "user":
      dataInfo = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount: usersCount? usersCount: "N/A",
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
        amount: hotelsCount? hotelsCount: "N/A",
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
      case "room":
        dataInfo = {
          title: "ROOMS",
          isMoney: false,
          amount: roomsCount? roomsCount: "N/A",
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
    case "earning":
      dataInfo = {
        title: "EARNINGS",
        isMoney: true,
        amount: totalRevenue,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
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