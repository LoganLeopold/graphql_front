import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { capitalize, depluralize } from '../utilities';

const SimpleRecord = (props) => {

    const { propObj: { subDoc, currentDocData } } = props
    let field = currentDocData ? Object.keys(subDoc)[0] : "No Records"
    let initialValue = currentDocData ? Object.values(subDoc)[0] : "No Records"
    let currentDocId = currentDocData ? currentDocData._id : "No Records"
    let currentDocModel = currentDocData.modelName ? capitalize(currentDocData.modelName, 0, 1) : "placehold"
    let currentDocIdName = currentDocData.modelName ? depluralize(currentDocData.modelName) : "placehold"
    const [editing, openEditing] = useState(false)
    const [inputValue, changeValue] = useState(initialValue)
   
    const handleChange = (e) => {
       changeValue(e.target.value)
    }
   
    const revealInput = (e) => {
       openEditing(!editing)
    }

    let recUpdate, currentUpdate;
    recUpdate = currentUpdate = gql`
        mutation simple${currentDocModel}UpdateHandle ($${currentDocIdName}Id: MongoID!, $field: String!, $deleteValue: String!, $newValue: String) {
            simple${currentDocModel}UpdateHandle (${currentDocIdName}Id: $${currentDocIdName}Id, field: $field, deleteValue: $deleteValue, newValue: $newValue) {
                _id
                name
                genres
            }   
        } 
    `

    /* Right now, the only model with fields that this would apply to is movies, on the field "genres" */
    let recDelete = gql`
        mutation simple${currentDocModel}UpdateHandle ($${currentDocIdName}Id: MongoID!, $field: String!, $deleteValue: String!) {
            simple${currentDocModel}UpdateHandle (${currentDocIdName}Id: $${currentDocIdName}Id, field: $field, deleteValue: $deleteValue) {
                _id
                name
                genres
            }   
        } 
    `

    const [updateRecord, { updateLoading, updateError }] = useMutation( currentUpdate, {
        onCompleted(data) {
            if (data) {
                openEditing(false)
                props.refreshParent(currentDocData._id)
            } else if (updateLoading) {
                console.log("loading")
            } else if (updateError) {
                console.log(updateError)
            }   
        }
    })

    let updateVars = { 
        variables: {
            [`${currentDocIdName}Id`]: currentDocId,
            field: field,
            deleteValue: Object.values(subDoc)[0],
            newValue: inputValue,
        }
    }
    let deleteVars = { 
        variables: {
            [`${currentDocIdName}Id`]: currentDocId,
            field: field,
            deleteValue: Object.values(subDoc)[0],
        }
    }
        
    const updateRecordEvent = (event) => {
        event.preventDefault()
        currentUpdate = recUpdate
        if (inputValue !== Object.values(subDoc)[0]) {
            updateRecord(updateVars)
        }
    }

    const deleteRecordEvent = (event) => {
        currentUpdate = recDelete
        event.preventDefault()
        updateRecord(deleteVars)
    }

    return (
        <form className="record" onSubmit={updateRecordEvent}>
            <h3 >{initialValue}</h3>
            { !editing && currentDocData && <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={revealInput}></img>}
            { editing && currentDocData && (<input onChange={handleChange} defaultValue={initialValue} /> )}
            { editing && currentDocData && (<input type="submit" value="+" />)}
            { editing && currentDocData && <span onClick={revealInput}>Cancel</span>}
            { !editing && <span onClick={deleteRecordEvent}>-</span>}
        </form>
    )

}

export default SimpleRecord
