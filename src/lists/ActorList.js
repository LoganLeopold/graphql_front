import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';

const ActorList = (props) => {

    const allActors = gql`
        query {
            actorMany {
                _id
                name
                movies {
                    name
                }
            }
        }
    `

    const { loading, error, data } = useQuery(allActors);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="allActors">
            {
                data.actorMany.map( actor => { 
                    let name = actor.name
                    let movies = actor.movies.map( movie => <li key={movie.name}>{movie.name}</li>)
                    return (
                        <div key={actor._id} className="actor">
                            <h1>{name}</h1>
                            <ul>
                                {movies}
                            </ul>
                            <Link to={`/actors/update/${actor._id}`}>
                                <button>Update Actor</button>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    ) 

}

export default ActorList