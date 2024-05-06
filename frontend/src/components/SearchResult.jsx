import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SearchResults() {
  const { pokemon } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No pokemon Found matching the Search");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      });
  }, [pokemon]);

  if (loading) return <div>Loading. </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <article>
      {pokemonData ? (
        <>
          <header>
            <h1>{pokemonData.name.toUpperCase()}</h1>
          </header>
          <figure>
            <img src="" alt="" />
            <figcaption>{pokemonData.name} appearance</figcaption>
          </figure>
          <section>
            <h2>Characteristics</h2>
            <p>Height: {pokemonData.height}</p>
            <p>Weight: {pokemonData.weight}</p>
          </section>
          <section>
            <h2>Abilities</h2>
            <ul>
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Types</h2>
            <ul>
              {pokemonData.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <p>No Pokemon details available</p>
      )}
    </article>
  );
}
