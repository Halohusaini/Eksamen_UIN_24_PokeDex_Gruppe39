import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function Type() {
    const { type } = useParams();
    const [pokemons, setPokemons] = useState([])
    // const [loading, setloading] = useState(false)
    // const [error, setError]= useState('');


    useEffect(() => {
        const fetchPokemonsByType = async () => {
            // setloading(true);
            // setError('');
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`) 
                const data = await response.json()
                setPokemons(data.pokemon.map(p => p.pokemon));
            } catch (error) {
                console.error('There was an error fetching the pokemons by type:', error)
            }
        }
        fetchPokemonsByType()
    }, [type]);

    return (
        <section>
            <h1>Pokemons of Type {type}</h1>
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon.name}>
                        <Link to={`/pokemons/${pokemon.name}`}>{pokemon.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/">Back to Home</Link>
        </section>
    )
}