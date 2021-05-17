import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const SimpleRecord = (props) => {

    const [editing, openEditing] = useState(false)
    
    const { propObj: { recordData, currentModelData } } = props
    let field = currentModelData ? Object.keys(recordData)[0] : "No Records"
    let value = currentModelData ? Object.values(recordData)[0] : "No Records"

    // console.log(field, value)

    const docRemove = gql`
        mutation {
            simpleMoviesDeleteHandle (movieId: "${currentModelData}", field:"${field}", value: "${value}") {
                _id
                name
                genres
            }   
        } 
    `

    const [deleteDoc, { deleteLoading, deleteError }] = useMutation(docRemove, {
        onCompleted(data) {
            if (data) {    
                console.log(data)
            } else if (deleteLoading) {
                console.log("loading")
            } else if (deleteError) {
                console.log(deleteError)
            }   
        }
    });

    const deleteRecordEvent = async (e) => {
        deleteDoc()
    }

    // const mutTest = gql`
    //     hold
    // `
    
    // const [testMut, { updateLoading, updateError }] = useMutation( mutTest, {
    //     onCompleted(data) {
    //         if (data) {
    //             console.log(data)
    //         } else if (updateLoading) {
    //             console.log("loading")
    //         } else if (updateError) {
    //             console.log(updateError)
    //         }   
    //     }
    // })
    
    // const updateRecordEvent = async (e) => {
    //     e.preventDefault()
    //     testMut()
    // }

    const revealInput = (e) => {
        openEditing(!editing)
    }
    
    return (
        <div className="record">
            <h3 >{value}</h3>
            { editing && (<input /> )}
            {/* { editing && (<input type="submit" value="+" onSubmit={updateRecordEvent} />)} */}
            { docRemove && <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt="Pencil for edit" onClick={revealInput}></img>}
            { !editing && currentModelData && (<span onClick={deleteRecordEvent}>-</span>)}
        </div>
    )

}

export default SimpleRecord
