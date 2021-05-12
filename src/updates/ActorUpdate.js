// Using GraphQL to Mutate
import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Record from "../Record"

const ActorUpdate = (props) => {

    const actorQ = gql`
        query {
            actorById(_id:"${props.match.params.id}") {
                Name
                Movies {
                    Name
                    _id
                }
            }
        }
    `

    let {error, loading, data} = useQuery(actorQ)

    if (loading) {return <p>Loading...</p>;}
    else if (error) {
        return <p>Error :(</p>;
    }

    let name = <h1>{data.actorById.Name}</h1>

    let movies = data.actorById.Movies.map( (mov, i) => {
        return <Record key={i} name={mov.Name} nested={mov._id} top={props.match.params.id} />
    })

    return (
        <div>
        {name}  
        {movies}
        </div>
    )

}

export default ActorUpdate