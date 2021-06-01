import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const SimpleRecord = (props) => {

    const [editing, openEditing] = useState(false)
    const [inputValue, changeValue] = useState()
    
    const { propObj: { recordData, currentModelData } } = props
    let field = currentModelData ? Object.keys(recordData)[0] : "No Records"
    let initialValue = currentModelData ? Object.values(recordData)[0] : "No Records"
    
    let recUpdate = gql`
        mutation {
            simple${currentModelData.modelName}UpdateHandle (movieId: $movieId, field: $field, value: $newValue) {
                _id
                name
                genres
            }   
        } 
    `

    const handleChange = (e) => {
        changeValue(e.target.value)
    }
    
    const [updateRecord, { updateLoading, updateError }] = useMutation( recUpdate, {
        onCompleted(data) {
            if (data) {
                console.log(data)
            } else if (updateLoading) {
                console.log("loading")
            } else if (updateError) {
                console.log(updateError)
            }   
        }
    })

    const updateRecordEvent = (event) => {
        event.preventDefault()
        console.log(event.target     )
        if (typeof event.target.value == 'number') {
            console.log("it was a number. sick.")
            updateRecord({variables: {
                movieId: currentModelData._id,
                field: field,
                value: inputValue,
                }
            })
        } else {
            console.log("not a number. not cool bro.")
            event.target.value = 0;
            event.target.placeholder = "Number required"
        }
    }

    const revealInput = (e) => {
        openEditing(!editing)
    }
    
    return (
        <form className="record" onSubmit={updateRecordEvent}>
            <h3 >{initialValue}</h3>
            { editing && currentModelData && (<input onChange={handleChange}/> )}
            { editing && currentModelData && (<input type="submit" value="+" />)}
            { currentModelData && <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={revealInput}></img>}
        </form>
    )

}

export default SimpleRecord
