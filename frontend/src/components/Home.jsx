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
        <Link to="/teams" className="menu-item">Teams</Link>
        <nav>
          
          <div className="search-container">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
            <button onClick={handleSearch} className="search-button">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 
              376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 
              416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>  
               /* Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/
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
