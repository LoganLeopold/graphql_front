import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
// import { capitalize } from '../utilities'

const NewRecord = (props) => {

    const [editing, openEditing] = useState(false)

    const { propObj: { recordData, currentData }} = props 

    let update;

    let update = recordData.modelName ? 
    // If model, do ref update
    gql`
        mutation {
            // with ref doc
        }
    `
    // If no model, do simple update
    gql`
        mutation {
            // simple update 
        }
    `

    let 

    const [updateDoc, { loading, error }] = useMutation(update, {
        onCompleted(data) {
            if (data) {    
                console.log(data)
            } else if (deleteLoading) {
                console.log("loading")
            } else if (deleteError) {
                console.log(deleteError)
            }   
        }
    })

    const revealInput = (e) => {
        openEditing(!editing)
    }

    const submitUpdate = (e) => {
        
    }

    return (
        <div className="new-record">
            {!editing && <span onClick={revealInput}>+</span>}
            {editing && <span onClick={revealInput}>Cancel</span>}
            {editing && <input />}
            {editing && <input onClick={submitUpdate} type="submit" value="Update"/>}
        </div>
    )

}

export default NewRecord