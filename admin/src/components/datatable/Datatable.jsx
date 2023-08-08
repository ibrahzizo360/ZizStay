import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";




const Datatable = ({columns}) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [list, setList] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:5000/api/${path}`, token);

  useEffect(() => {
    setList(data)
  }, [data])

  
  
  

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/${path}/${id}`,  {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setList(list.filter((item) => item._id !== id));
    }catch(err){}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <button className="viewButton"  >View</button>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {`Available ${path}`}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row)=>row._id}
      />
    </div>
  );
};

export default Datatable;