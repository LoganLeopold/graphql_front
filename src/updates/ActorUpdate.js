// Using GraphQL to Mutate
import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client';

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

    // console.log(data)
    let name = <h1>{data.actorById.Name}</h1>

    // let movies = data.actorById.Movies.forEach( mov => {
    //     return <h1 data-id={`${mov._id}`}>{mov.Name}</h1>
    // })

    let movies = <h1 data-id={`${data.actorById.Movies[0]._id}`}>{data.actorById.Movies[0].Name}</h1>

    return (
        <div>
        {name}  
        { movies }
        </div>
    )

}

export default ActorUpdate