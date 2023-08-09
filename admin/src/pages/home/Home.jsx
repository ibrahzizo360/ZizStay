import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { WidgetProvider } from "../../context/WidgetContext";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <WidgetProvider>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="hotel" />
          <Widget type="room" />
          <Widget type="earning" />
        </div>
        </WidgetProvider>  
        <div className="charts">
          <Featured />
          <Chart title="Revenues generated for the past week" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Bookings</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;