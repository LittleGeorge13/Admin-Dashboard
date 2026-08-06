import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import "./movieListEdit.scss"
import { useContext, useState } from "react"
import { updateList } from "../../context/movieListContext/apiCalls"
import { MovieListContext } from "../../context/movieListContext/MovieListContext"

const MovieListEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listProp = location.state?.list;

  const [list, setList] = useState({});
  const { dispatch } = useContext(MovieListContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const { movieListId } = useParams();

  const handleChange = (e) => {
    const value = e.target.value;
    setList(prevMovie => ({ ...prevMovie, [e.target.name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await updateList(movieListId, list, dispatch);
    } catch (error) {
      alert('Error updating movie: ' + error.message);
    }
    navigate('/lists');
  };

  return (
    <div className='product'>
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{listProp.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{listProp._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{listProp.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{listProp.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name='title'
              placeholder='List title'
              defaultValue={listProp.title}
              onChange={(e) => handleChange(e)}
            />
            <label>Type</label>
            <input
              type="text"
              name='type'
              placeholder='List type'
              defaultValue={listProp.type}
              onChange={(e) => handleChange(e)}
            />
            <label>Genre</label>
            <input
              type="text"
              name='genre'
              placeholder='List genre'
              defaultValue={listProp.genre}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="productFormRight">
            <button
              className="productButton"
              onClick={handleSubmit}
              disabled={isUpdating}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MovieListEdit