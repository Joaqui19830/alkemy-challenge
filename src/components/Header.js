import { Link } from "react-router-dom";
import "../css/header.css";

//components
import Buscador from "./Buscador";


function Header(props) {
  return (
    
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="d-flex flex-row  row-cols-auto">
          <div className="col">
            <Link className="link" to="/">
              Home
            </Link>
          </div>
          <div className="col" style={{ marginLeft: "30px" }}>
            <Link className="link" to="/listado">
              Listado
            </Link>
          </div>
          <div className="col" style={{ marginLeft: "30px" }}>
            <Link className="link" to="/favoritos">
              Favoritos
            </Link>
          </div>
          <div className="col" style={{ marginLeft: "30px" }}>
            <span className="text-dark" style={{color: 'white'}}>
              {
                props.favorites.length > 0 && <>Peliculas en Favoritos: {props.favorites.length}</>
              }
              
            </span>
          </div>
          
     
            <Buscador />

         
          
          
        </div>
      </div>
    </nav>

  );
}

export default Header;
