import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import MovieCard from "./MovieCard";

function Listado(props) {
  // const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=33475612a448d2c6aa651669e30ab954&language=es-ES&page=1";
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        apiData.results.map(movie => {
          movie.poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
          movie.favorite = false;
        })
        apiData.results.map((movie)=>{
          movie.favorite = false;
        });
        setMovieList(apiData.results);
      })
      .catch((error) => {
        swAlert(<h2>Hubo errores, intenta mas tarde</h2>);
      });
  }, [setMovieList]);
  
  return (
    <div className="container">
      {!token && <Navigate to="/" />}
      <div className="row">
        {/* Estructura Basica */}
        {movieList.map((movie, idx) => {
          return (
            <MovieCard onClickEvent={props.addOrRemoveFromFavs} item={movie} key={idx}/>
          );
        })}
      </div>
    </div>
  );
}

export default Listado;
