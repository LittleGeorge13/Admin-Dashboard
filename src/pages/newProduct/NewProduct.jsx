import { useContext, useState } from "react"
import "./newProduct.scss"
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";
import { handleUploadToStorage } from "../../utils/Utils";

const NewProduct = () => {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [mediaUploadedToStorage, setMediaUploadedToStorage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const allFilesUploaded = img !== null && imgTitle !== null
    && imgSm !== null && trailer !== null
    && video !== null;

  const validateData = () => {
    if (movie === null
      || movie.title === undefined || !movie.title
      || movie.desc === undefined || !movie.desc
      || movie.year === undefined || !movie.year
      || movie.genre === undefined || !movie.genre
      || movie.duration === undefined || !movie.duration
      || movie.limit === undefined || !movie.limit
      || movie.isSeries === undefined || !movie.isSeries
      || movie.img === undefined || !movie.img
      || movie.imgTitle === undefined || !movie.imgTitle
      || movie.imgSm === undefined || !movie.imgSm
      || movie.trailer === undefined || !movie.trailer
      || movie.video === undefined || !movie.video
    ) {
      return false;
    }
    return true;
  };
  const movieDataIsValid = validateData();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie(prevMovie => ({ ...prevMovie, [e.target.name]: value }));
  }

  const handleUpload = async () => {
    const mediaUrls = {};
    setIsUpdating(true);
    for (const media of [img, imgTitle, imgSm, trailer, video]) {
      const url = await handleUploadToStorage(media.file);
      mediaUrls[media.inputName] = url;
    }
    setMovie(prevMovie => ({ ...prevMovie, ...mediaUrls }));
    setMediaUploadedToStorage(true);
    setIsUpdating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovie(movie, dispatch);
    navigate('/movies');
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name='img'
            onChange={e => setImg({ file: e.target.files[0], inputName: e.target.name })}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name='imgTitle'
            onChange={e => setImgTitle({ file: e.target.files[0], inputName: e.target.name })}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name='imgSm'
            onChange={e => setImgSm({ file: e.target.files[0], inputName: e.target.name })}
          />
        </div>
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
          <label>Description</label>
          <input
            type="text"
            placeholder="Movie description"
            name='desc'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Movie year"
            name='year'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Movie genre"
            name='genre'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Movie duration"
            name='duration'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Movie limit"
            name='limit'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Is series?</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={(e) => handleChange(e)}
          >
            <option value="" selected>Select an option</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name='trailer'
            onChange={e => setTrailer({ file: e.target.files[0], inputName: e.target.name })}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name='video'
            onChange={e => setVideo({ file: e.target.files[0], inputName: e.target.name })}
          />
        </div>
        { (allFilesUploaded && !mediaUploadedToStorage) && (
          <button
            type="button"
            className="addProductButton"
            onClick={handleUpload}
            disabled={isUpdating}
          >
            Upload
          </button>
        )}
        { (movieDataIsValid) && (
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

export default NewProduct
