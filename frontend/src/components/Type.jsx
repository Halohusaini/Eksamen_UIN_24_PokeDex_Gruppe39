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
                const pokemonList = data.pokemon.map(p => p.pokemon);

                const pokemonDetailsPromises = pokemonList.map(pokemon =>
                  fetch(pokemon.url).then(response => response.json())
              );

              const detailedPokemons = await Promise.all(pokemonDetailsPromises);
              setPokemons(detailedPokemons);

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

    const getTypeColor = (type) => {
        switch (type) {
          case 'normal':
            return '#dce1e6';
          case 'fighting':
            return '#f0c3d0';
          case 'flying':
            return '#dce4f4';
          case 'poison':
            return '#e6caf2';
          case 'ground':
            return '#f2c8b4';
          case 'rock':
            return '#f7eed4';
          case 'bug':
            return '#eaf4d3';
          case 'ghost':
            return '#d0d9f4';
          case 'steel':
            return '#d4edf7';
          case 'fire':
            return '#f4d5bf';
          case 'water':
            return '#cbe1f9';
          case 'grass':
            return '#cdf9c8';
          case 'electric':
            return '#f4eab8';
          case 'psychic':
            return '#f2c2c4';
          case 'ice':
            return '#d6f9f3';
          case 'dragon':
            return '#c6dff4';
          case 'dark':
            return '#d3cae3';
          case 'fairy':
            return '#f9dbf6';
          default:
            return '#ffffff';
        }
    }
    return (
        <main>
            <header className='type_header'>
                <button><Link to="/">Home</Link></button>
                <h1><img className='type_header_img'src={`/type symboler/${type}.png`} alt={type} />
                {type}
                </h1>
            </header>

        <section className="typestyle">
            
            <ul>
                {pokemons.map(pokemon => (
                    <li style={{ backgroundColor: getTypeColor(type) }}>
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                        <div>
                          {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                          <p>#{pokemon.id.toString().padStart(3, '0')}</p>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </section>
        
        </main>
    )
}