import "./productList.scss"
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

const ProductList = () => {
    const { movies, dispatch } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'movie', headerName: 'Movie', width: 200, renderCell: (params => {
            return(
                <div className="productListItem">
                    <img className="productListIImg" src={ params.row.img } alt="product image" />
                    { params.row.title }
                </div>
            );
        }) },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'year', headerName: 'Year', width: 120 },
        { field: 'limit', headerName: 'Limit', width: 160 },
        { field: 'isSeries', headerName: 'IsSeries', width: 160 },
        { field: 'edit', headerName: 'Edit', width: 150, renderCell: (params => {
            return(
                <>
                    <Link to={ "/products/" + params.row._id } state={{ movie: params.row }}>
                        <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline
                      onClick={ () => handleDelete(params.row._id) }
                      className="productListDelete"
                    />
                </>
            );
        }) },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={movies}
                columns={columns}
                checkboxSelection
                sx={{ border: 0 }}
                pageSize={5}
                disableSelectionOnClick
                getRowId={r=>r._id}
            />
        </div>
    )
}

export default ProductList
