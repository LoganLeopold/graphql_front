// Using GraphQL to Mutate
import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client';
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

    let movies = data.actorById.Movies.map( mov => {
        return <Record name={mov.Name} recordId={mov._id} modelId={props.match.params.id} />
    })

    return (
        <div>
        {name}  
        {movies}
        </div>
    )

}

export default ActorUpdate