import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemondata, setpokemondata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?&img&limit=9`);
        const data = await response.json();
        console.log(data);
        setpokemondata(data.results);
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
            {pokemon.name}
          </Link>
        ))}
      </section>

      <section className="explore-more">
        <h2>Explore More</h2>
        <button>
          <Link to="/pokedex">Explore Pokedex</Link>
        </button>
      </section>
    </main>
  );
}
