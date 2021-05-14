// Using GraphQL to Mutate
import React from 'react'
import { useQuery, gql } from '@apollo/client';
import RelatedRecord from "../records/RelatedRecord.js"
import { PropObj } from "../utilities"

const ActorUpdate = (props) => {

    const actorQ = gql`
        query {
            actorById(_id:"${props.match.params.id}") {
                name
                movies {
                    name
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

    let name = <h1>{data.actorById.name}</h1>

    let movies = data.actorById.movies.map( (mov, i) => {
        let movieProps = new PropObj(mov.name, mov._id, props.match.params.id, "movies")
        return <RelatedRecord key={i} propObj={movieProps} />
    })

    return (
        <div>
        {name}  
        {movies}
        </div>
    )

}

export default ActorUpdate