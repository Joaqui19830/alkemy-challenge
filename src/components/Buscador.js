import { useNavigate, Navigate } from "react-router-dom"
import '../css/buscador.css'
import swAlert from "@sweetalert/with-react";

function Buscador() {
  let token = sessionStorage.getItem("token");
     const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value.trim(); // El trim poda los espacios adelante y al final del string
        
        if(keyword.length === 0){
            swAlert(<h5>Tienes que escribir una palabra clave</h5>)
        } else if(keyword.length < 4){
            swAlert(<h5>Tienes que escribir más de 4 caracteres</h5>)
        } else{
            e.currentTarget.keyword.value = '';
            navigate(`/resultados?keyword=${keyword}`)
        }
    }
  return (
    <>
     {!token && <Navigate to="/" />}
    <div className="buscador" style={{ marginLeft: "60em" }}>
        
      <form onSubmit={submitHandler} className="d-flex align-items-center">
        <label className="form-label mb-0 mx-2">
          <input type="text" name="keyword" className="form-control" placeholder='Escribe una palabra clave...' />
        </label>

        <button type="submit" className="btn btn-dark ">
          Buscar
        </button>
      </form>
    </div>
    </>
  );
}

export default Buscador;
