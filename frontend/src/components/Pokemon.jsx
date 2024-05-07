import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemonData) {
    return <div>No data found</div>;
  }

  return (
    <main>

    <section>
      <h1>{pokemonData.name}</h1>
      <p>Types: {pokemonData.types.map(t => t.type.name).join(', ')}</p>
      <p>Stats: {pokemonData.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
      <p>Abilities: {pokemonData.abilities.map(a => a.ability.name).join(', ')}</p>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
    </section>
    </main>

  );
};

export default Pokemon;