import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { Navigate, useNavigate } from "react-router-dom";
import '../css/login.css'

function Login() {
  const navigate = useNavigate();
  // const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    // Aca tomamos los campos email y password de los inputs
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email === "" || password === "") {
      swAlert(<h2> Los campos no pueden estar vacios </h2>);

      return; // Aca es como que valida bien para completar los 2 campos
    }

    if (email !== "" && !regexEmail.test(email)) {
      swAlert(
        <h2>Debes escribir una dirección de correo electrónico valida</h2>
      );
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Credenciales inválidas</h2>);
      return;
    }

    console.log("Ok estamos litos para enviar la información");

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>Perfecto, ingresaste correctamente</h2>);
        console.log(res.data);

        const tokenRecibido = res.data.token; // Guardo de donde llega el token en la const token
        sessionStorage.setItem("token", tokenRecibido); // localStorage solo guarda string
        navigate("/listado");
      });
  };
  const token = sessionStorage.getItem("token");
  return (

    
    <>
        {token && <Navigate to="/listado"/>}
      <h2 className="login">Formulario de login</h2>

      <form onSubmit={submitHandler} className='grandParentContaniner'>
        <label>
          <span> Correo electrónico: </span> <br />
          <input type="text" name="email" className="container" />
        </label>
        <br />
        <label>
          <span> Contraseña: </span> <br />
          <input type="password" name="password" className="container" />
        </label>
        <br />

        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </>

  );
}

export default Login;
