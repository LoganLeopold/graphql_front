import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const SimpleRecord = (props) => {

    const [editing, openEditing] = useState(false)
    
    const { propObj: { recordData, currentModelData } } = props
    let field = currentModelData ? Object.keys(recordData)[0] : "No Records"
    let value = currentModelData ? Object.values(recordData)[0] : "No Records"
    
    const recUpdate = gql`
        mutation {
            simple${currentModelData.modelName}UpdateHandle (movieId: "${currentModelData._id}", field:"${field}", value: "${value}") {
                _id
                name
                genres
            }   
        } 
    `

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

    const updateRecordEvent = async (e) => {
        e.preventDefault()
        updateRecord()
    }

    const revealInput = (e) => {
        openEditing(!editing)
    }
    
    return (
        <div className="record">
            <h3 >{value}</h3>
            { editing && currentModelData && (<input /> )}
            { editing && currentModelData && (<input type="submit" value="+" onSubmit={updateRecordEvent} />)}
            { currentModelData && <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={revealInput}></img>}
        </div>
    )

}

export default SimpleRecord
