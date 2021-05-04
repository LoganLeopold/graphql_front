import React from 'react'
import { useQuery, gql } from '@apollo/client';

const ActorList = (props) => {

    const allActors = gql`
        query {
            actorMany {
                _id
                Name
                Movies {
                    Name
                }
            }
        }
    `

    const { loading, error, data } = useQuery(allActors);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div class="allActors">
            {
                data.actorMany.map( actor => { 
                    let name = actor.Name
                    let movies = actor.Movies.map( movie => <li>{movie.Name}</li>)
                    return (
                        <div class="actor">
                            <h1>{name}</h1>
                            <ul>
                                {movies}
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    ) 

}

export default ActorList