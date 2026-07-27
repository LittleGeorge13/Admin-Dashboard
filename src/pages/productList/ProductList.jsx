import "./productList.scss"
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid"
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductList = () => {
    const [data, setData] = useState(productRows);

    const handleDelete = (id) => {
        setData(prev => prev.filter(item => item.id !== id))
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'product', headerName: 'Product', width: 200, renderCell: (params => {
            return(
                <div className="productListItem">
                    <img className="productListIImg" src={ params.row.img } alt="product image" />
                    { params.row.name }
                </div>
            );
        }) },
        { field: 'stock', headerName: 'Stock', width: 200 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'price', headerName: 'Price', width: 160 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params => {
            return(
                <>
                    <Link to={"/products/" + params.row.id }>
                        <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline
                      onClick={ () => handleDelete(params.row.id) }
                      className="productListDelete"
                    />
                </>
            );
        }) },
    ];

    return (
        <div className="productList">
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

export default ProductList
