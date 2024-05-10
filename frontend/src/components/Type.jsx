import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import React from 'react';



export default function Type() {
    const { type } = useParams();
    const [pokemons, setPokemons] = useState([])
    const [loading, setloading] = useState(false)
    const [error, setError]= useState('');


    useEffect(() => {
        const fetchPokemonsByType = async () => {
            setloading(true);
            setError('');
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`) 
                if (!response.ok){
                    throw new error('HTTP ERROR! status:${response.status}')
                }
                const data = await response.json()
                setPokemons(data.pokemon.map(p => p.pokemon));
            } catch (error) {
                console.error('There was an error fetching the pokemons by type:', error)
                setError(error.toString())
            } finally {
                setloading(false)
            }
        }
        fetchPokemonsByType()
    }, [type]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error){
        return <div>error:{error}</div>
    }

    return (
        <main>
            <section>
                <button><Link to="/">Home</Link></button>
            </section>

        <section>
            <h1>Pokemons of Type {type}</h1>
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                       
                    </li>
                ))}
            </ul>
        </section>
        </main>
    )
}