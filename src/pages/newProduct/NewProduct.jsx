import { useState } from "react"
import "./newProduct.scss"

const NewProduct = () => {
    const [ movie, setMovie ] = useState(null);
    const [ img, setImg ] = useState(null);
    const [ imgTitle, setImgTitle ] = useState(null);
    const [ imgSm, setImgSm ] = useState(null);
    const [ trailer, setTrailer ] = useState(null);
    const [ video, setVideo ] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie(prevMovie => ({ ...prevMovie, [e.target.name]: value }));
    }
    
    console.log(movie);
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
                      onChange={e => setImg(e.target.files[0])}
                      />
                </div>
                <div className="addProductItem">
                    <label>Title Image</label>
                    <input
                      type="file"
                      id="imgTitle"
                      name='imgTitle'
                      onChange={e => setImgTitle(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail Image</label>
                    <input
                      type="file"
                      id="imgSm"
                      name='imgSm'
                      onChange={e => setImgSm(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Movie title"
                      name='title'
                      onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="Movie description"
                      name='desc'
                      onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input
                      type="text"
                      placeholder="Movie year"
                      name='year'
                      onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input
                      type="text"
                      placeholder="Movie genre"
                      name='genre'
                      onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input
                      type="text"
                      placeholder="Movie duration"
                      name='duration'
                      onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div className="addProductItem">
                    <label>Limit</label>
                    <input
                      type="text"
                      placeholder="Movie limit"
                      name='limit'
                      onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div className="addProductItem">
                    <label>Is series?</label>
                    <select
                      name="isSeries"
                      id="isSeries"
                      onChange={ (e) => handleChange(e) }
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Trailer</label>
                    <input
                      type="file"
                      name='trailer'
                      onChange={e => setTrailer(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input
                      type="file"
                      name='video'
                      onChange={e => setVideo(e.target.files[0])}
                    />
                </div>
                <button className="addProductButton">Create</button>
            </form>
        </div>
    )
}

export default NewProduct
