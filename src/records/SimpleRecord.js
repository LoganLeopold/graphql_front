import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { capitalize } from '../utilities'

const SimpleRecord = (props) => {

    const [editing, openEditing] = useState(false)

    const { propObj } = props

    console.log(propObj.nested, propObj.top, propObj.field, )

    // Remove current doc from record's array
    const docRemove = gql`
        mutation {
            nested${"ModelName placehold"}DeleteHandle (actorId: "${propObj.nested}", docId: "${propObj.top}", docModel: "${propObj.field}") {
                name
                _id
            } 
        }
    `

    const [deleteDoc, { loading, error }] = useMutation(docRemove, {
        onCompleted(data) {
            if (data) {    
                props.refreshParent(props.propObj.top)
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
 export default SimpleRecord
