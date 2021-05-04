import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';

const ActorList = (props) => {

    const [actorList, setActorList] = useState([])

    const allActors = gql`
        mutation {
            actorMany {
                record {
                    Name
                    _id
                    Movies
                }
            }
        }
    `

 
    return (
        <div>
            <label>New Name</label>
            <input id="matt-name" />
            <input type="submit" onClick={addTodo}/>
            <h1> {actorName} </h1>
        </div>
    ) 

}

export default ActorList