import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const Record = (props) => {

    const [editing, openEditing] = useState(false)

    const { propObj } = props

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
        props.refreshParent(props.propObj.top)
    }

    const revealInput = (e) => {
        openEditing(!editing)
    }

    const updateRecordEvent = async (e) => {

        e.preventDefault()

        if (propObj.nested && propObj.top) {
            console.log(props.propObj.nested)
            // if ([objectID]) {
            //     //
            // } else if (objectID) {
            //     //
            // }
        } else {
            console.log("direct edit")
        }
        /*
        if  recordID:
            if [objectID]
            if else  objectID
        else 
            if []
            else if Int
            else if String
        */

    }
    
    return (
        <div className="record">
            <h3 >{props.propObj.display}</h3> 
            { editing && (<input /> )}
            { editing && (<input type="submit" value="+" onSubmit={updateRecordEvent} />)}
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" onClick={revealInput}></img>
            { !editing && (<span onClick={deleteRecordEvent}>-</span>)}
        </div>
    )

}
 export default Record
