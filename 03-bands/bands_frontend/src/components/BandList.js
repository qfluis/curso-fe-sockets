import React, { useEffect, useState } from 'react';

export const BandList = ({bandList, votar, borrarBanda, cambiarNombre}) => {
    
    const [bands, setBands] = useState(bandList);

    useEffect(() => {
        setBands( bandList );
    },[bandList])

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

    const onBlur = (id, nombre) =>{
        cambiarNombre(id, nombre);
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
                            onBlur = {(event) => onBlur(band.id, band.name)}
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