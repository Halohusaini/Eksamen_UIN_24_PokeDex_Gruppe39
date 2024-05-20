import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Home() {
  const [pokemondata, setpokemondata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

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

        const poketypes= await fetch('https://pokeapi.co/api/v2/type?limit=18')
        const typedata= await poketypes.json()
        setTypes(typedata.results.map(type => type.name));

      } catch (error) {
        console.error("Error fetching data:", error);
        setpokemondata([]);
      }
    };

    fetchData(); 
  }, []); 

  const handleSearch = () => {
    navigate(`/search/${searchTerm.toLowerCase()}`);
};

  

  return (
    <main className="home">
      <header className="header">
        <Link to="/" className="logo">UIN POKEDEX</Link>
        <nav>
          <Link to="/teams">Teams</Link>
          <div className="search-container">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={handleSearch}>
              <img src="/" alt="Search" />
            </button>
          </div>
        </nav>
      </header>

      <section className="featured-pokemon">
        
        {pokemondata.map((pokemon) => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className="pokemon-card">
            <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                {pokemon.name}
                <p>#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
            
          </Link>
        ))}
      </section>

      <section className="pokemon-types">
        <h2>Explore Pokémon by Type</h2>
        <ul>
          {types.map(type => (
            <li key={type}  className={type.toLowerCase().replace(" ", "")}>
              <Link to={`/type/${type}`}>{type}</Link>
              <img src={`/type symboler/${type}.png`} alt={type} />
            </li>
          ))}
        </ul>
    </section>
    </main>
  );
}
