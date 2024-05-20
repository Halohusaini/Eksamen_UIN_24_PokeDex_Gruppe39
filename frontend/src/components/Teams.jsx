import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Teams() {
  const { teamSlug } = useParams();
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const query = teamSlug
          ? `*[_type == "team" && slug.current == "${teamSlug}"]{..., pokemons[]->{name, image, type, stats, abilities}}`
          : `*[_type == "team"]{title, slug, image{asset->{url}}}`;
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
          `https://ehi8qumr.api.sanity.io/v1/data/query/production?query=${encodedQuery}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (teamSlug) {
          setTeam(data.result[0]);
        } else {
          setTeams(data.result);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [teamSlug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (teamSlug && team) {
    // Render team details view
    return (
      <section>
        <h1>{team.title}</h1>
        {team.image?.asset?.url && (
          <img src={team.image.asset.url} alt={team.title} />
        )}
        <ul>
          {team.pokemons.map((pokemon) => (
            <li key={pokemon._id}>
              <h2>{pokemon.name}</h2>
              {pokemon.image && (
                <img src={pokemon.image.asset.url} alt={pokemon.name} />
              )}
              <p>Type: {pokemon.type.join(", ")}</p>
              <p>HP: {pokemon.stats.hp}</p>
              <p>Attack: {pokemon.stats.attack}</p>
              <p>Defense: {pokemon.stats.defense}</p>
              <p>Abilities: {pokemon.abilities.join(", ")}</p>
            </li>
          ))}
        </ul>
        <Link to="/teams">Back to Teams</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.slug.current}>
            <Link to={`/teams/${team.slug.current}`}>
              {team.image?.asset?.url && (
                <img src={team.image.asset.url} alt={team.title} />
              )}
              <h2>{team.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
