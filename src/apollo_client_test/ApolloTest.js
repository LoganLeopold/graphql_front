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

    const [addTodo, { data }] = useMutation(allActors, {update: result});

    addTodo()

    function result () {
     
        console.log(data)
        if (data) {
            setActorName(data.actorUpdateById.record.Name)
        } 
            
    }
 
    return <h1> {actorName} </h1>

}

export default ApolloTest