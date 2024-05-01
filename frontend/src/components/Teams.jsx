import { useEffect, useState } from "react";

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = () => {
            try {
                const result = await fetch('Sanity-api-url skal hit')
                const data = await result.json()
                setTeams(data)
              } catch (error) {
                console.error('Error fetching teams:', error)
                setError(error)
              } 
              setloading(false)
        }
        fetchData();
    }, [])

    if (loading) return <p>Loading teams</p>
    if (error) return <p>Error loading teams</p>

    return (
        <section>
            <h1>Teams</h1>
            <ul>
                {teams.map(team => (
                    <li key={team.slug}>
                        <Link to={`/teams/${team.slug}`}>
                            <img src={team.image} alt={team.title} />
                            <h2>{team.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}