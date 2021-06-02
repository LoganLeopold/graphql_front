import React, { useEffect, useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { capitalize } from '../utilities';

const SimpleRecord = (props) => {

    const { propObj: { subDoc, currentDocData } } = props
    let field = currentDocData ? Object.keys(subDoc)[0] : "No Records"
    let initialValue = currentDocData ? Object.values(subDoc)[0] : "No Records"
    let currentDocModel = currentDocData.modelName ? capitalize(currentDocData.modelName, 0, 1) : "placehold"
    const [editing, openEditing] = useState(false)
    const [inputValue, changeValue] = useState(initialValue)
    
    let recUpdate = gql`
    mutation simple${currentDocModel}UpdateHandle ($movieId:MongoID!, $field: String!, $value: String!) {
        simple${currentDocModel}UpdateHandle (movieId: $movieId, field: $field, value: $value) {
            _id
            name
            genres
        }   
    } 
    `
    
    const handleChange = (e) => {
        changeValue(e.target.value)
    }
    // useEffect( () => {}, [inputValue])
    
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
        updateRecord({ variables: {
            movieId: currentDocData._id,
            field: field,
            value: inputValue,
            }
        })
    }

    const revealInput = (e) => {
        openEditing(!editing)
    }
    
    return (
        <form className="record" onSubmit={updateRecordEvent}>
            <h3 >{initialValue}</h3>
            { editing && currentDocData && (<input onChange={handleChange} defaultValue={initialValue} /> )}
            { editing && currentDocData && (<input type="submit" value="+" />)}
            { currentDocData && <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={revealInput}></img>}
        </form>
    )

}

export default SimpleRecord
