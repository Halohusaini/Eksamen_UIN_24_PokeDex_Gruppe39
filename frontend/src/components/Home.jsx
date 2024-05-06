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
            <li><Link to="/type/fire">Fire</Link></li>
            <li><Link to="/type/water">Water</Link></li>
            <li><Link to="/type/grass">Grass</Link></li>
            {/* More types as needed */}
        </ul>
    </section>
    </main>
  );
}
