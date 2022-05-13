import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
    
    const [ bands, setBands ] = useState([]);
    const { socket } = useContext( SocketContext );

    useEffect(() => {
        socket.on('current-bands', (data) => {
            console.log("data", data);
            setBands(data);
        })

        return ()=> socket.off('current-bands'); // solo se ejecuta al destruir componente
    },[socket])

    const cambioNombre = (event, id) => {
        const nuevoNombre = event.target.value;
        setBands( bands.map( band => {
            if(band.id === id) {
                band.name = nuevoNombre;
            }
            return band;
        }));
        console.log(bands);
    }

    const updateBandName = (id, nuevoNombre) =>{
        socket.emit('cambiar-nombre-banda', {id, nuevoNombre});
    }

    const votar = (id) => {
        socket.emit('votar-banda', id);
    }

    const borrarBanda = (id) => {
        socket.emit('borrar-banda', id);
    }


    const crearRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button className='btn btn-primary'
                            onClick={() => votar(band.id)}
                        >
                            +1
                        </button>
                    </td>
                    <td>
                        <input 
                            className = "form-control"
                            value = {band.name}
                            onChange = {(event) => cambioNombre(event, band.id)}
                            onBlur = {() => updateBandName(band.id, band.name)}
                        />
                    </td>
                    <td><h3> {band.votes} </h3></td>
                    <td>
                        <button className="btn-danger" 
                            onClick={() => borrarBanda(band.id)}
                        >
                            Borrar
                        </button>
                    </td>

                </tr>
            ))                       
        );
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>

            </table>
        </>
    )

}