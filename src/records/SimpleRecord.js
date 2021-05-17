import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { capitalize } from '../utilities'

const SimpleRecord = (props) => {

    const [editing, openEditing] = useState(false)
    
    const { propObj: { recordData, currentModelData } } = props
    let field = Object.keys(recordData)[0]
    let value = Object.values(recordData)[0]

    const docRemove = gql`
        mutation {
            simpleMoviesDeleteHandle (movieId: "609d5e08364d2e9bc1086b9d", field:"${field}", value: "${value}") {
                _id
                name
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" onClick={revealInput}></img>
            { !editing && (<span onClick={deleteRecordEvent}>-</span>)}
        </div>
    )

}
 export default SimpleRecord
