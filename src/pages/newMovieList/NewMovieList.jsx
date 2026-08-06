import { useContext, useEffect, useState } from "react"
import "./newMovieList.scss"
import { MovieListContext } from "../../context/movieListContext/MovieListContext";
import { useNavigate } from "react-router-dom";
import { createMovieList } from "../../context/movieListContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";

const NewMovieList = () => {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(MovieListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList(prevList => ({ ...prevList, [e.target.name]: value }));
  }

  const validateData = () => {
    if (list === null
      || list.title === undefined || !list.title
      || list.type === undefined || !list.type
      || list.genre === undefined || !list.genre
      || list.content === undefined || !list.content
    ) {
      return false;
    }
    return true;
  };
  const ListDataIsValid = validateData();

  console.log(list)
  const handleSelect = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
    setList(prevList => ({ ...prevList, [e.target.name]: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovieList(list, dispatch);
    navigate('/lists');
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Movie title"
              name='title'
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="List Genre"
              name='genre'
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select
              name="type"
              onChange={(e) => handleChange(e)}
            >
              <option value="" selected>Select an option</option>
              <option value="series">Series</option>
              <option value="movies">Movies</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={(e) => handleSelect(e)}
              style={{ height: "280px" }}
            >
              { movies.map(movie => {
                return (
                  <option key={movie._id} value={movie._id}>{movie.title}</option>
                );
              })}
            </select>
          </div>
        </div>
        {(ListDataIsValid) && (
          <button
            type="button"
            className="addProductButton"
            onClick={handleSubmit}
          >
            Create
          </button>
        )}
      </form>
    </div>
  )
}

export default NewMovieList
