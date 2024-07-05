import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function TypFinder() {
    const [pokemon, setPokemon] = useState('');
    const [typedPokemon, setTypedPokemon] = useState('');
    const [typen, setTypen] = useState([]);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleInputChange = (e) => {
        setPokemon(e.target.value);
    };

    const fetchData = async () => {
        setHasSearched(true);
        if (!pokemon) {
            setError('Fehler beim Laden der Typen.');
            setTypen([]);
            setTypedPokemon('');
            return;
        }
        try {
            setError('');
            const response = await axios.get(`http://localhost:8080/api/typen/${pokemon}`);
            if (response.data.length === 0) {
                setError(`Kein Pokemon mit dem Namen ${pokemon} gefunden`);
                setTypedPokemon('');
                setTypen([]);
            } else {
                setTypen(response.data);
                setTypedPokemon(pokemon);
            }
        } catch (error) {
            setError('Fehler beim Laden der Typen.');
            setTypen([]);
            setTypedPokemon('');
            console.error('Fehler beim Laden der Typen:', error);
        }
    };

    let longestArray = typen.reduce((acc, curr) => {
        return curr.length > acc.length ? curr : acc;
    }, []);

    return (
        <div className="Container d-flex align-items-center justify-content-center text-center p-5">
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Pokémon Stärken / Schwächen Finder</h1>
                    <h6 className='mb-5'>Example: Enter "Pikachu"</h6>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control text-center rounded"
                            placeholder="Gib ein Pokémon ein"
                            value={pokemon}
                            onChange={handleInputChange} />
                        <div className="input-group-append">
                            <button className="btn btn-secondary btn-outline-dark" onClick={fetchData} type="button">Typen finden</button>
                        </div>
                    </div>

                    {
                        hasSearched && (
                            error ?
                                <p style={{ color: 'red' }}>{error}</p>
                                :
                                typedPokemon && typen.length > 0 ?
                                    <table className="table table-borderless table-dark table-fixed mt-5">
                                        <thead>
                                            <tr className='border'>
                                                <th scope="col" colSpan="6">{typedPokemon}</th>
                                            </tr>
                                            <tr>
                                                <td className='border'>0x</td>
                                                <td className='border'>1/4x</td>
                                                <td className='border'>1/2x</td>
                                                <td className='border'>1x</td>
                                                <td className='border'>2x</td>
                                                <td className='border'>4x</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {longestArray.map((_item, index) => (
                                                <tr key={index}>
                                                    {typen.map((typ, i) => (
                                                        <td key={i} className={typ[index]}>{typ[index]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :
                                    <p style={{ color: 'red' }}>Kein Pokemon mit dem Namen {pokemon} gefunden</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
