// Using GraphQL to Mutate
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
const { returnRelatedRecords } = require('../utilities')

const ActorUpdate = (props) => {

    // const [actorData, setActorData] =  useState()
    console.log("actor update")

    const actorQ = gql`
        query {
            actorById(_id:"${props.match.params.id}") {
                name
                modelName
                movies {
                    name
                    _id
                    modelName
                }
            }
        }
    `

    let {error, loading, data} = useQuery(actorQ)

    if (loading) {return <p>Loading...</p>;}
    else if (error) {
        return <p>Error :(</p>;
    }

    console.log(data, error, loading)

    let name = <h1>{data.actorById.name}</h1>

    let movies = returnRelatedRecords(data.actorById.movies, data)

    return (
        <div>
        {name}  
        {movies}
        </div>
    )

}

export default ActorUpdate