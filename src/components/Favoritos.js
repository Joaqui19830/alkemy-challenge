import {Link, Navigate } from "react-router-dom";
import MovieCard from "./MovieCard";

function Favoritos(props) {

    let token = sessionStorage.getItem("token");
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const favsInLocal = localStorage.getItem("favs"); //Aca se guarda en favsInLocal los que marcamos como favoritos
//     console.log(favsInLocal);
//     if (favsInLocal != null) {
//       const favsArray = JSON.parse(favsInLocal); //Aca al strin lo parseamos y volvemos un array de objetos o un objeto literal para poder trabajar con la info
//       console.log(favsArray);
//       setFavorites(favsArray); // Aca seteamos el array con el array que viene del localStorage
//     }
//   }, []); // El array vacio hace que se ejecute una vez

  return (
    <>
      {!token && <Navigate to="/" />}
    <div className="container">
      <h2>Seccion favoritos</h2>
      <div className="row">

        {!props.favorites.length && <div className="col-12 text-danger">No tenés nada en favoritos</div>}
        
        { props.favorites.map((oneMovie, idx) => {
          return (
          <MovieCard onClickEvent={props.addOrRemoveFromFavs} item={oneMovie} key={idx}/>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default Favoritos;
