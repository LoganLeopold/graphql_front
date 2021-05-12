import React from 'react'
import { useMutation, gql } from '@apollo/client';

const Record = (props) => {

    // Remove current doc from record's array
    const docRemove = gql`
        mutation {
            actorUpdateByIdCascade( _id:"${props.recordId}", modelId: "${props.modelId}") {
                _id
            }
        }
    `

    // Remove record from current doc's corresponding array

    /*

    If this is to truly adapt, we need two mutations. We'll use ActorUpdate to think.

    Data types from state: {
        [objectID],
        objectID,
        [],
        Int,
        String
    }

    Resolver needs to know

    We can use recordId to check for need to resolve relationships. 

    1 Delete
        A - if record is related Model
            a) Use movie ID to remove actor from movie
            b) Delete movie record from actor 
        B - if record is simple value
            a) Use movie ID to remove
    */

    const [deleteDoc, { loading, error }] = useMutation(docRemove, {
        onCompleted(data) {
            if (data) {    
                console.log(data)
            } else if (loading) {
                console.log("loading")
            } else if (error) {
                console.log(error)
            }   
        }
    });

    const deleteRecordEvent = async (e) => {
        deleteDoc()
    }

    return (
        <div className="record">
            <h3>{props.display}</h3>
            <p onClick={deleteRecordEvent}><span>edit</span><span>-</span></p>
        </div>
    )

}
 export default Record
