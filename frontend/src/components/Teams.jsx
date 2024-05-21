import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
;

export default function Teams() {
  const { teamSlug } = useParams();
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(`https://ehi8qumr.api.sanity.io/v1/data/query/production?query=${encodedQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const query = teamSlug 
      ? `*[_type == "team" && slug.current == "${teamSlug}"]{
           title, 
           image{asset->{url}}, 
           pokemons[]->{_id, name, image{asset->{url}}, pokemonNumber}
         }`
      : `*[_type == "team"]{title, slug, image{asset->{url}}}`;
    
    fetchData(query).then(data => {
      if (teamSlug) {
        setTeam(data.result[0]);
      } else {
        setTeams(data.result);
      }
      setLoading(false);
    });
  }, [teamSlug, fetchData]);

  const handlePokemonClick = (name) => {
    navigate(`/pokemon/${name}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (teamSlug && team) {
    return (
      <section>
        <h1>{team.title}</h1>
        {team.image?.asset?.url && <img src={team.image.asset.url} alt={team.title} />}
        <ul>
          {team.pokemons?.map(pokemon => (
            <li key={pokemon._id} onClick={() => handlePokemonClick(pokemon.name)}>
              <h2>{pokemon.name}</h2>
              {pokemon.image?.asset?.url && <img src={pokemon.image.asset.url} alt={pokemon.name} />}
              <p>Number: {pokemon.pokemonNumber}</p>
            </li>
          ))}
        </ul>
        <Link to="/teams">Back to Teams</Link>
      </section>
    );
  }

  return (
    <section className="teams-section">
      <h1>Teams</h1>
      <ul className="team-list">
        {teams.map(team => (
          <li key={team.slug.current} className="team-item">
            <h2>{team.title}</h2>
            <Link to={`/teams/${team.slug.current}`} className="team-link">
              {team.image?.asset?.url && (
                <img src={team.image.asset.url} alt={team.title} className="team-image" />
              )}
              
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};


