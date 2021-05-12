import React from 'react'
import { useMutation, gql } from '@apollo/client';

const Record = (props) => {


    console.log(props)
    // Remove current doc from record's array
    const docRemove = gql`
        mutation {
            actorUpdateByIdCascade( _id:"${props.recordId}", modelId: "${props.modelId}") {
                _id
            }
        }
    `

    // Remove record from current doc's corresponding array
    const recordRemove = gql`
        mutation {
            actorUpdateByIdCascade( _id:"${props.recordId}", modelId: "${props.modelId}") {
                _id
            }
        }
    `

    const valueChange = gql`
        mutation {
            actorUpdateByIdCascade( _id:"${props.recordId}", modelId: "${props.modelId}") {
                _id
            }
        }
    `

    /*

    We'll use ActorUpdate to think.

    Resolver needs to know what id to update, the update field, and update data

    We can use recordId to check for need to resolve relationships. 

    Data types from state: {
        [objectID],
        objectID,
        [],
        Int,
        String
    }

    if  recordID:
        if [objectID]
        if else  objectID
    else 
        if []
        else if Int
        else if String

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
