export const userColumns = [
{ field: "_id", headerName: "ID", width: 230 },
{
    field: "user",
    headerName: "User",
    width: 180,
    renderCell: (params) => {
    return (
        <div className="cellWithImg">
        <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
        {params.row.username}
        </div>
    );
    },
},
{
    field: "email",
    headerName: "Email",
    width: 230,
},

{
    field: "country",
    headerName: "Country",
    width: 130,
},
{
    field: "city",
    headerName: "City",
    width: 130,
},
{
    field: "phone",
    headerName: "Phone",
    width: 140,
},
];

export const hotelColumns = [
{ field: "_id", headerName: "ID", width: 250 },
{
    field: "name",
    headerName: "Name",
    width: 300,
},
{
    field: "type",
    headerName: "Type",
    width: 120,
},
{
    field: "description",
    headerName: "Description",
    width: 230,
},
{
    field: "city",
    headerName: "City",
    width: 150,
},
];

export const roomColumns = [
{ field: "_id", headerName: "ID", width: 250 },
{
    field: "title",
    headerName: "Title",
    width: 230,
},
{
    field: "description",
    headerName: "Description",
    width: 330,
},
{
    field: "price",
    headerName: "Price",
    width: 100,
},
{
    field: "maxPeople",
    headerName: "Max People",
    width: 150,
},
];