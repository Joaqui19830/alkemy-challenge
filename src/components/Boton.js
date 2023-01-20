function Boton() {
    var cuerpoweb = document.body; 
 
// Obtengo el valor actual de la key 'modo' en localStorage 
var modocolor = localStorage.getItem("modo");

function cargarModo() {    
 
    if (modocolor === "oscuro") {               
        cuerpoweb.classList.add("oscuro");
    } else {
        cuerpoweb.classList.add("claro");
    }
 
}

// Cuando el usuario presiona el botón, llama a la función que corresponde
// ya sea para activar el modo claro o el modo oscuro
var btnpresionado = false;
 
function cambiarModo() {
 
    if (btnpresionado) { // Si No es presionado el botón 
        cuerpoweb.classList.remove("oscuro");
        localStorage.setItem("modo", "claro");
        cuerpoweb.classList.add("claro");
        btnpresionado = false;
    } else { // Si es presionado el botón 
 
        if (modocolor === "oscuro") {
            resetear(); 
            btnpresionado = true;           
        } else {
 
            cuerpoweb.classList.remove("claro");
            localStorage.setItem("modo", "oscuro");
            cuerpoweb.classList.add("oscuro");        
            btnpresionado = true;
 
        }        
    }
}

function resetear() {
 
    localStorage.removeItem('modo');
    location.reload();
 
}


  return (
    <>
      <button type="button" class="btn btn-dark mb-3" onClick={cambiarModo}>
        Claro / Oscuro
      </button>

      <button
        type="button"
        class="btn btn-secondary mb-3"
        onClick={resetear}
      >
        Resetear
      </button>
    </>
  );
}

export default Boton;
