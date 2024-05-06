
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'


export default function Home() {
    const [pokemondata, setpokemondata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=>{
        const fetchData= async () =>{
            try{
            const response= await fetch (`https://pokeapi.co/api/v2/pokemon?limit=9&name=${searchTerm}`)
            const data = await response.json();
            setpokemondata(data.results);
            } catch(error){
                console.error('Error fetching data:', error);
                setpokemondata([])
            }
            
        };

        if (searchTerm){
            fetchData
        }
        [searchTerm]
    });
    return ( 
        <main className="home">
            <header>
            <h1>Pokemon collection</h1>
            <p>Discover Pokemons</p>
            </header>

            <section className="featured-pokemon">
                <h2>Fueatered pokemons</h2>
                {pokemondata.map((pokemon, index)=>(
                    <div key={index}>
                        <h3>{pokemon.name}</h3>
                        <Link to={`/pokemon/${pokemon.name}`}>view details</Link>
                    </div>
                ))}
            </section>

            <section className="explore-more">
                <h2>Explore More</h2>
                <button><Link to="/pokedox"></Link></button>
            </section>
        </main>

        
    )
}