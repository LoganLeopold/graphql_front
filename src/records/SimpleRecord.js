import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { capitalize } from '../utilities';

const SimpleRecord = (props) => {

    const { propObj: { subDoc, currentDocData } } = props
    let field = currentDocData ? Object.keys(subDoc)[0] : "No Records"
    let initialValue = currentDocData ? Object.values(subDoc)[0] : "No Records"
    let currentDocModel = currentDocData.modelName ? capitalize(currentDocData.modelName, 0, 1) : "placehold"
    const [editing, openEditing] = useState(false)
    const [inputValue, changeValue] = useState(initialValue)

    // let recordTypeDataType = Array.isArray(currentDocData[`${field}`])

    /*
    
    ---------------------------------------------------------------------------
    The below mutation does not address non-related array items - edit for 
    items like "genre"
    ---------------------------------------------------------------------------

    */
   
    const handleChange = (e) => {
       changeValue(e.target.value)
    }
   
    const revealInput = (e) => {
       openEditing(!editing)
    }

    let recUpdate = gql`
        mutation simple${currentDocModel}UpdateHandle ($movieId: MongoID!, $field: String!, $deleteValue: String!, $newValue: String) {
            simple${currentDocModel}UpdateHandle (movieId: $movieId, field: $field, deleteValue: $deleteValue, newValue: $newValue) {
                _id
                name
                genres
            }   
        } 
    `

    const [updateRecord, { updateLoading, updateError }] = useMutation( recUpdate, {
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

    const updateRecordEvent = (event) => {
        event.preventDefault()
        if (inputValue !== Object.values(subDoc)[0]) {
            updateRecord({ variables: {
                movieId: currentDocData._id,
                field: field,
                deleteValue: Object.values(subDoc)[0],
                newValue: inputValue,
                }
            })
        }
    }

    /* Right now, the only model with fields that this would apply to is movies, on the field "genres" */
    let recDelete = gql`
        mutation simple${currentDocModel}UpdateHandle ($movieId: MongoID!, $field: String!, $deleteValue: String!) {
            simple${currentDocModel}UpdateHandle (movieId: $movieId, field: $field, deleteValue: $deleteValue) {
                _id
                name
                genres
            }   
        } 
    `

    const [deleteRecord, { deleteLoading, deleteError }] = useMutation( recDelete, {
        onCompleted(data) {
            if (data) {
                openEditing(false)
                props.refreshParent(currentDocData._id)
            } else if (deleteLoading) {
                console.log("loading")
            } else if (deleteError) {
                console.log(deleteError)
            }   
        }
    })

    const deleteRecordEvent = (event) => {
        event.preventDefault()
        deleteRecord({ variables: {
            movieId: currentDocData._id,
            field: field,
            deleteValue: Object.values(subDoc)[0],
            }
        })
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
