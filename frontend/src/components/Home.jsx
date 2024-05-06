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

        const poketypes= await fetch('https://pokeapi.co/api/v2/type')
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
      <header>
        <h1>Pokemon collection</h1>
        <p>Discover Pokemons</p>
      </header>

      <section className="featured-pokemon">
        <h2>Featured Pokémons</h2>
        {pokemondata.map((pokemon) => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
            <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                {pokemon.name}
            </div>
            
          </Link>
        ))}
      </section>

      <section className="explore-more">
        <h2>Explore More</h2>
        <button>
          <Link to="/pokedex">Explore Pokedex</Link>
        </button>
      </section>
      <section className="pokemon-types">
        <h2>Explore Pokémon by Type</h2>
        <ul>
          {types.map(type => (
            <li key={type}>
              <Link to={`/type/${type}`}>{type}</Link>
            </li>
          ))}
        </ul>
    </section>
    </main>
  );
}
