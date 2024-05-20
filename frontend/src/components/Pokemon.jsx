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
  if (!pokemonData){
    return <section>no data found</section>
  }

  return (
    <main>

    <section className="pokemon-styles">
      <h1>{pokemonData.name}</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <section className="typ">
        {pokemonData.types.map((t) => (
          <article key={t.type.name}>
          <img src={`/type-symbols/${t.type.name}.png`} alt={t.type.name} />
          </article>
    ))}
    </section>

      <article className="stats">
        Stats: {pokemonData.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}
      </article>
      
      <section className="ability">
          <h2>Abilities</h2>
          {abilityDetails.map((ability, index) => {
            const effectEntry = ability.effect_entries?.find(entry => entry.language.name === 'en');
            return (
              <div key={index}>
                <h3>{ability.name}</h3>
                {effectEntry ? (
                  <>
                    <p><strong>Effect:</strong> {effectEntry.effect}</p>
                    <p><strong>Short effect:</strong> {effectEntry.short_effect}</p>
                  </>
                ) : (
                  <p>No effect available</p>
                )}
              </div>
            );
          })}
        </section>
    </section>
    </main>

  );
};

export default Pokemon;