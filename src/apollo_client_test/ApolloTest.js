import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const ApolloTest = (props) => {

    const [actorName, setActorName] = useState('No Update')

    const test = "Matthew Damon"

    const allActors = gql`
        mutation {
            actorUpdateById(_id:"606b4a0f86b9b68d59f576e5", record: {Name: "${test}"}) {
                record {
                    Name,
                    _id
                }
            }
        }
    `

    const [addTodo, { loading, error }] = useMutation(allActors, {
        onCompleted(data) {
            if (data) {
                setActorName(data.actorUpdateById.record.Name)
            } else if (loading) {
                console.log(actorName)
            } else if (error) {
                setActorName(error)
            }
        }
    });
 
    return (
        <div>
            <label>New Name</label>
            <input id="matt-name" />
            <input type="submit" onClick={addTodo}/>
            <h1> {actorName} </h1>
        </div>
    ) 

}

export default ApolloTest