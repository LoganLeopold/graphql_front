import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const NewRecords = (props) => {

    const [editing, openEditing] = useState(false)
    const [inputValue, changeValue] = useState('')

    const { propObj: { modelName, currentDocData }} = props 

    let newRec = gql`
        mutation ${currentDocData.modelName}AddRecHandle ($newRecName: String!, $newRecModel: String!, $movieId: MongoID!) {
            ${currentDocData.modelName}AddRecHandle (newRecName: $newRecName, newRecModel: $newRecModel, movieId: $movieId) {
                _id,
                name
            }
        }
    `
    
    const [addRecord, { addLoading, addError }] = useMutation( newRec, {
        onCompleted(data) {
            if (data) {
                openEditing(false)
                props.refreshParent(currentDocData._id)
            } else if (addLoading) {
                console.log("loading")
            } else if (addError) {
                console.log(addError)
            }
            
        }
    })

    const handleChange = (e) => {
        changeValue(e.target.value)
    }

    const submitUpdate = (event) => {
        console.log("SUBMIT EVENT")
        event.preventDefault()
        addRecord({ variables: {
            newRecName: inputValue,
            newRecModel: modelName,
            movieId: currentDocData._id
        }})
    }
    
    const revealInput = (e) => {
        openEditing(!editing)
    }

    return (
        <form className="new-record" onSubmit={submitUpdate} >
            {!editing && currentDocData && <span onClick={revealInput}>+</span>}
            {editing && currentDocData && <input onChange={handleChange}/>}
            {editing && currentDocData && <input type="submit" value="Add"/>}
            {editing && currentDocData && <span onClick={revealInput}>Cancel</span>}
        </form>
    )

}

export default NewRecords