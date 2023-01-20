//Librerias
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import Login from "./components/Login"; // Si mi archivo tiene
// la extension jsx quizas si se le ponga el .jsx sino no es necesario
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";

//Style
import "./css/app.css";
import "bootstrap/dist/css/bootstrap.css";
import Favoritos from "./components/Favoritos";

function App() {

  const [favorites, setFavorites] = useState([]); // De ésta forma el componente app se va a encargar de mandarle por props los favorites y va a ser el encargado 
  // de eliminar de la ruta '/favoritos' las pelis que marque como favoritos sin necesidad de actualizar, si lo haciamos en el componente favoritos lo eliminaba 
  // pero habia que apretr el botón para actualizar 

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs"); //Aca se guarda en favsInLocal los que marcamos como favoritos
    console.log(favsInLocal);
    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal); //Aca al strin lo parseamos y volvemos un array de objetos o un objeto literal para poder trabajar con la info
    
      setFavorites(favsArray); // Aca seteamos el array con el array que viene del localStorage
    }
  }, []); // El array vacio hace que se ejecute una vez


  const favMovies = localStorage.getItem("favs");

  let tempMovieInFavs;

  if (favMovies === null) {
    tempMovieInFavs = [];
  } else {
    tempMovieInFavs = JSON.parse(favMovies); // Aca llega el favMovies en formato json
  }

  console.log(tempMovieInFavs);

  const addOrRemoveFromFavs = (e) => {
    // Esta funcionalidad la hacemos en el componente padre asi despues le pasamos info al components listado y resultado
    const currentTarget = e.currentTarget; // Capturo el button y le digo del evento dame aquel que le di click
    const parent = currentTarget.parentElement; // Aca es un metodo de js que dice del button que capturaste dame el elemento padre quiere decir que captura el <div></div>
    const imgURL = parent.querySelector("img").getAttribute("src"); // Aca captura del elemento padre la img el src
    const title = parent.querySelector("h5").innerText; // Aca del elemento padre captura el titulo de la peli
    const overview = parent.querySelector("p").innerText;
    const movieId = parent.getElementsByClassName('movieId')[0].innerText
    const favorite = true;
    
    const movieData = {
      imgURL,
      title,
      overview,
      id: movieId, // Aca trae del atributo data el id de la peli (mirar un poco de doc de data de hmtl 5)
      favorite
    };

    let movieIsInArray = tempMovieInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      
      tempMovieInFavs.push(movieData); //Aca inserto en el array las pelis que marque como favoritas

      localStorage.setItem("favs", JSON.stringify(tempMovieInFavs)); // Cuando ya tengo info en el array vuelvo y piso el localStorage

      setFavorites(tempMovieInFavs); // Aca en mi estado de favoritos quiero setear el array 'tempMovieInFavs'

      console.log('Se agregó la pelicula');
      
    } else{
     let moviesLeft = tempMovieInFavs.filter(oneMovie => {
      return oneMovie.id !== movieData.id
     });

     localStorage.setItem("favs", JSON.stringify(moviesLeft)); //Aca seteamos en el storage 
     setFavorites(moviesLeft); // y adicionalmente seteamos en el estado asi se actualiza cada vez que eliminamos 
     console.log('Se eliminó la pelicula'); // Despues de sacar la pelicula asi muestra el listado con las que quedan 
    }
  };

  return (
    <div>
      <Header favorites={favorites} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/listado"
          element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}/>}
        />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/resultados" element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
        <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

/* TIPS PARA RECORDAR:
En el componente listado le estamos mandando por props addOrRemoveFromFavs pero el que está escrito de verde 
por que el que esta entre corchetes es la funcion, ésto quiere decir que si lo de letras verdes se llama hola 
entonces al componente listado le llega por props hola 

*/
