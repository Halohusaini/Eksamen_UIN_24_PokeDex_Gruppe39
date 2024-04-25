import React, {useState, useEffect} from "react";

const Pokemon= () => {
    const [pokemondata, setpokemondata] = useState([]);
    const [searchTerm, setSearchTerm] = useState()

    useEffect(()=>{
        const fetchData= async () =>{
            try{
            const response= await fetch ('https://pokeapi.co/api/v2/pokemon?=${searchTerm}limit=9')
            const data = await response.json();
            setpokemondata(data.docs);
            } catch(error){
                console.error('Error fetching data:', error);
                setpokemondata([])
            }
            
        }
    
        fetchData()
        [searchTerm]
    })
}
