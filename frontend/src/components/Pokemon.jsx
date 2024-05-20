import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [abilityDetails, setAbilityDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemonData(data);


        const abilities = data.abilities.map(async (abilityInfo) => {
          const abilityResponse = await fetch(abilityInfo.ability.url);
          return abilityResponse.json();
        });

        const abilitiesData = await Promise.all(abilities);
        setAbilityDetails(abilitiesData);

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
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Types: {pokemonData.types.map(t => t.type.name).join(', ')}</p>
      <p>Stats: {pokemonData.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
      <div>
          <h2>Abilities</h2>
          {abilityDetails.map((ability, index) => (
            <div key={index}>
              <h3>{ability.name}</h3>
              <p><strong>Effect:</strong>{ability.effect_entries.find(entry => entry.language.name === 'en').effect}</p>
              <p><strong>Short effect:</strong> {ability.effect_entries.find(entry => entry.language.name === 'en').short_effect}</p>
          </div>
          ))}
        </div>
      
    </section>
    </main>

  );
};

export default Pokemon;