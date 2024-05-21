import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SearchResults() {
  const { pokemon } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log(`Fetching data for: ${pokemon}`);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No pokemon found matching the search");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setPokemonData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [pokemon]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <header>
        <Link to="/">Home</Link>
        <Link to="/teams" className="menu-item">Teams</Link>
      </header>
      <section className="resulted_pokemon">
        {pokemonData ? (
          <Link key={pokemonData.name} to={`/pokemon/${pokemonData.name}`} className="pokemon-card">
            <div>
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
              {pokemonData.name}
              <p>#{pokemonData.id.toString().padStart(3, '0')}</p>
            </div>
          </Link>
        ) : (
          <p>No Pokemon details available</p>
        )}
      </section>
    </main>
  );
}
