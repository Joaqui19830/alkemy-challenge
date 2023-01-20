import { Link } from "react-router-dom";
import favoriteYes from "../assets/favorite-on.png";
import favoriteNo from "../assets/favorite-off.png";
import "../css/movie-card.css";
function MovieCard({ item, onClickEvent }) {
  return (
    <div className="col-3">
      <div className="card my-4">
        <span className="movieId" style={{display: 'none'}}>{item.id}</span>
        <img
          src={item.poster_path ?? item.imgURL}
          className="card-img-top"
          alt="..."
        />
        <span onClick={onClickEvent} className="favorite-btn">
          {item.favorite ? (
            <img className="heart-style" src={favoriteYes} />
          ) : (
            <img className="heart-style" src={favoriteNo} />
          )}
        </span>
        <div className="card-body">
          <h5 className="card-title">{item.title.substring(0, 30)}...</h5>
          <p className="card-text">{item.overview.substring(0, 100)}...</p>
          <Link to={`/detalle?movieID=${item.id}`} className="btn btn-primary">
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
