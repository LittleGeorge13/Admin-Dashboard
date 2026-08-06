import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import "./product.scss"
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons"
import { useContext, useState } from "react"
import { updateMovie } from "../../context/movieContext/apiCalls"
import { MovieContext } from "../../context/movieContext/MovieContext"
import { handleUploadToStorage, deleteFileFromStorage } from "../../utils/Utils"

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(MovieContext);
  const movieProp = location.state?.movie;
  const [movie, setMovie] = useState({});

  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const { productId } = useParams();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie(prevMovie => ({ ...prevMovie, [e.target.name]: value }));
  }

  const handleUpload = async () => {
    const mediaUrls = {};
    for (const media of [img, imgTitle, imgSm, trailer, video]) {
      if (media !== null) {
        const url = await handleUploadToStorage(media.file);
        mediaUrls[media.inputName] = url;
      }
    }
    return { ...movie, ...mediaUrls };
  };

  const deletePreviousMedia = async (updatedMedia) => {
    const deletionPromises = [];

    if (updatedMedia.img && movieProp?.img) {
      deletionPromises.push(deleteFileFromStorage(movieProp.img));
    }
    if (updatedMedia.imgTitle && movieProp?.imgTitle) {
      deletionPromises.push(deleteFileFromStorage(movieProp.imgTitle));
    }
    if (updatedMedia.imgSm && movieProp?.imgSm) {
      deletionPromises.push(deleteFileFromStorage(movieProp.imgSm));
    }
    if (updatedMedia.trailer && movieProp?.trailer) {
      deletionPromises.push(deleteFileFromStorage(movieProp.trailer));
    }
    if (updatedMedia.video && movieProp?.video) {
      deletionPromises.push(deleteFileFromStorage(movieProp.video));
    }

    await Promise.all(deletionPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const movieWithUpdatedMedia = await handleUpload();
      await deletePreviousMedia(movieWithUpdatedMedia);
      await updateMovie(productId, movieWithUpdatedMedia, dispatch);
    } catch (error) {
      alert('Error updating movie: ' + error.message);
    }
    navigate('/movies');
  };

  return (
    <div className='product'>
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={movieProp.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{movieProp.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{movieProp._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movieProp.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movieProp.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movieProp.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              name='title'
              placeholder='Movie title'
              defaultValue={movieProp.title}
              onChange={(e) => handleChange(e)}
            />
            <label>Year</label>
            <input
              type="text"
              name='year'
              placeholder='Movie year'
              defaultValue={movieProp.year}
              onChange={(e) => handleChange(e)}
            />
            <label>Genre</label>
            <input
              type="text"
              name='genre'
              placeholder='Movie genre'
              defaultValue={movieProp.genre}
              onChange={(e) => handleChange(e)}
            />
            <label>Limit</label>
            <input
              type="text"
              name='limit'
              placeholder='Movie limit'
              defaultValue={movieProp.limit}
              onChange={(e) => handleChange(e)}
            />
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={e => setTrailer({ file: e.target.files[0], inputName: e.target.name })}
            />
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={e => setVideo({ file: e.target.files[0], inputName: e.target.name })}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <h1 className="productUploadImgTitle">Image poster</h1>
              <img
                src={movieProp.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="img"
                style={{ display: "none" }}
                onChange={e => setImg({ file: e.target.files[0], inputName: e.target.name })}
              />
            </div>
            <div className="productUpload">
              <h1 className="productUploadImgTitle">Image title</h1>
              <img
                src={movieProp.imgTitle}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="imgTitle"
                style={{ display: "none" }}
                onChange={e => setImgTitle({ file: e.target.files[0], inputName: e.target.name })}
              />
            </div>
            <div className="productUpload">
              <h1 className="productUploadImgTitle">Image thumbnail</h1>
              <img
                src={movieProp.imgSm}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="imgSm"
                style={{ display: "none" }}
                onChange={e => setImgSm({ file: e.target.files[0], inputName: e.target.name })}
              />
            </div>
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

export default Product