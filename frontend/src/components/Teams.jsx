import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('https://ehi8qumr.api.sanity.io/v1/data/query/production?query=*[_type == "team"]{title, slug, image{asset->{url}}}');
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const data = await result.json();
                console.log('Fetched data:', data); // Log the data for debugging
                if (Array.isArray(data.result)) {
                    setTeams(data.result); // Ensure data.result is an array
                } else {
                    throw new Error('API response is not an array');
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading teams...</p>;
    if (error) return <p>Error loading teams: {error.message}</p>;

    return (
        <section>
            <h1>Teams</h1>
            <ul>
                {teams.map(team => (
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
