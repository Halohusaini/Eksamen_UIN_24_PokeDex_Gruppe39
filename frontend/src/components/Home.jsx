import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  const [pokemondata, setpokemondata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9`);
        const data = await response.json();
        const promises= data.results.map(async(pokemon) => {
            const response= await fetch(pokemon.url);
            return response.json();
        });
        const results= await Promise.all(promises);
        setpokemondata(results)
        // fetching av pokemon types

        const poketypes= await fetch('https://pokeapi.co/api/v2/type?limit=18')
        const typedata= await poketypes.json()
        setTypes(typedata.results.map(type => type.name));

      } catch (error) {
        console.error("Error fetching data:", error);
        setpokemondata([]);
      }
    };

    fetchData(); // Call fetchData unconditionally for initial load
  }, []); // Correct dependency array

  return (
    <main className="home">
      <header className="header">
        <h1>Pokemon collection</h1>
        <h2>MAIN POKEMONS</h2>
      </header>

      <section className="featured-pokemon">
        
        {pokemondata.map((pokemon) => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className="pokemon-card">
            <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                {pokemon.name}
            </div>
            
          </Link>
        ))}
      </section>

      <section className="pokemon-types">
        <h2>Explore Pokémon by Type</h2>
        <ul>
          {types.map(type => (
            <li key={type}  className={type.toLowerCase().replace(" ", "")}>
              <Link to={`/type/${type}`}>{type}</Link>
              <img src={`/type symboler/${type}.png`} alt={type} />
            </li>
          ))}
        </ul>
    </section>
    </main>
  );
}
