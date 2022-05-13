import React, {useState} from 'react';

export const BandAdd = ({agregarBanda}) => {
    const [valor, setValor] = useState('');

    const onSubmit = (event)  => {
        event.preventDefault();
        
        if(valor.trim().length > 0) agregarBanda(valor);

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