import { useState, useEffect } from "react";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { useSocket } from "./hooks/useSocket";

function App() {


  const [ bands, setBands ] = useState([]);
  const { socket, online } = useSocket('http://localhost:8080');

  useEffect( ()=> {
    
    socket.on('current-bands', (bands) => {
      setBands(bands);
    })

  }, [socket]);
  
  const votar = (id) => {
    socket.emit('votar-banda', id);
  }

  const borrarBanda = (id) => {
    socket.emit('borrar-banda', id);
  }
  const cambiarNombre = (id, nuevoNombre) => {
    socket.emit('cambiar-nombre-banda', {id, nuevoNombre});
  }

  const agregarBanda = (nombre) => {
    socket.emit('agregar-banda', nombre);
  }

  return (
    <div className="container" >
      <div className="alert">
        <p>
          Service status:&nbsp;
          {
            (online)
            ?<span className="text-success">Online</span>
            :<span className="text-danger">Offline</span>
          }
          
        </p>
      </div>

      <h1>Band names</h1>
      <hr />

      <div className="row">
        <div className="col-md-8">
          <BandList 
            bandList={bands} 
            votar={votar} 
            borrarBanda={borrarBanda}
            cambiarNombre={cambiarNombre} />
        </div>
        <div className="col-md-4">
          <BandAdd
            agregarBanda={agregarBanda}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
