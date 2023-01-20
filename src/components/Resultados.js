import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

function Resultados() {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('keyword');

  const [movieResult, setMovieResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=33475612a448d2c6aa651669e30ab954&language=es-ES&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results; // array de peliculas
        if (moviesArray.length === 0){
          swAlert(<h4>Tu búsqueda no arrojó resultados</h4>);
        };
        setMovieResults(moviesArray);
      })
      .catch((error) => console.log(error));
  }); 
// }, [keyword]); // Aca no se por que cuando coloco el array no me actualiza las pelis en 'resultados'

  //

  return (
    <div className="container">
      <h2>
        Buscaste: <em>{keyword}</em>
      </h2>

      {movieResult.length === 0 && <h3>No hay resultados</h3>}

      <div className="row">
        {movieResult.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}...
                  </h5>

                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Resultados;
