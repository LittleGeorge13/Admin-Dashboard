import "./movieList.scss"
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieListContext } from "../../context/movieListContext/MovieListContext";
import { deleteMovieList, getMovieLists } from "../../context/movieListContext/apiCalls";

const MovieList = () => {
    const { lists, dispatch } = useContext(MovieListContext);

    useEffect(() => {
        getMovieLists(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteMovieList(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'genre', headerName: 'Genre', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'edit', headerName: 'Edit', width: 150, renderCell: (params => {
            return(
                <>
                    <Link to={ "/lists/" + params.row._id } state={{ list: params.row }}>
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
                rows={lists}
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

export default MovieList
