// Using GraphQL to Mutate
import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import SimpleRecord from '../records/SimpleRecord'
import axios from 'axios'
const { returnRelatedRecords, SimplePropObj } = require('../utilities')


const ActorUpdate = (props) => {
    
    const [refresh, refreshState] = useState(0); 
    
    const getLatestDoc = (id) => {
        return () => refreshState(refresh => refresh + 1); 
    }

    // let getLatestDoc = async (id) => {
        
        // try {

        //     let actorMovies = await axios({
        //         url: 'http://localhost:8000/graphql',
        //         method: 'POST',
        //         data: {
        //           query: `
        //             query {
        //                 actorById(_id:"${id}") {
        //                     _id
        //                     name
        //                     modelName
        //                     movies {
        //                         _id
        //                         name
        //                         modelName
        //                     }
        //                 }
        //             }
        //         `
        //         }
        //     })

        //     let { data: { data } } = actorMovies
        //     dataState(data)

        // } catch (err) {
        //     console.log(err)
        // }

    // }

    const actorQ = gql`
        query {
            actorById(_id:"${props.match.params.id}") {
                _id
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

    let { error, loading, data } = useQuery(actorQ)
    
    if (loading) {return <p>Loading...</p>;}
    else if (error) {
        return <p>Error :(</p>;
    } 

    let { _id, name, modelName, movies } = data.actorById
    let actorMovies = returnRelatedRecords(movies, data.actorById)

    return (
        <div className="actor-update">
            <h1>{name}</h1>
            <label>Name</label>
            <SimpleRecord propObj={new SimplePropObj({name: name}, data.actorById)} refreshParent={getLatestDoc}/>
            <label>Movies</label>
            {actorMovies}
        </div>
    )

}

export default ActorUpdate