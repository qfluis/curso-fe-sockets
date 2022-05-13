import React, {useContext, useState} from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {
    const [valor, setValor] = useState('');
    //const { socket } = useSocket('http://localhost:8080');
    const { socket } = useContext(SocketContext);

    const onSubmit = (event)  => {
        event.preventDefault();
        
        if(valor.trim().length > 0) socket.emit('agregar-banda', valor);//agregarBanda(valor);

        setValor('');
    }

    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={onSubmit}>
                <input 
                    className="form-control"
                    placeholder="nombre banda"
                    value={valor}
                    onChange={(ev) => setValor(ev.target.value)}
                />
            </form>
        </>
    )

}