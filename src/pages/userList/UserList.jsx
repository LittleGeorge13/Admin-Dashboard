import "./userList.scss"
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid"
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserList = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(prev => prev.filter(item => item.id !== id))
    };
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'User name', width: 200, renderCell: (params => {
            return(
                <div className="userListUser">
                    <img className="userListIImg" src={ params.row.avatar } alt="user avatar" />
                    { params.row.userName }
                </div>
            );
        }) },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'transaction', headerName: 'Transaction Volume', width: 160 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params => {
            return(
                <>
                    <Link to={"/user/" + params.row.id }>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline
                      onClick={ () => handleDelete(params.row.id) }
                      className="userListDelete"
                    />
                </>
            );
        }) },
    ];

    return (
        <div className='userList'>
            <DataGrid
                rows={data}
                columns={columns}
                checkboxSelection
                sx={{ border: 0 }}
                pageSize={5}
                disableSelectionOnClick
            />
        </div>
    )
}

export default UserList
