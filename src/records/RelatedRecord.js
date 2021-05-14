import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
import { depluralize } from '../utilities'

const RelatedRecord = (props) => {

    const { propObj } = props

    // Remove record from current doc's corresponding array

    const docRemove = gql`
        mutation {
            nested${"Model Name Placehold"}DeleteHandle (actorId: "${propObj.nested}", docId: "${propObj.top}", docModel: "${propObj.field}") {
                name
                _id
            } 
        }
    `

    const [deleteDoc, { loading, error }] = useMutation(docRemove, {
        onCompleted(data) {
            if (data) {    
                console.log(data)
            } else if (loading) {
                console.log("loading")
            } else if (error) {
                console.log(error)
            }   
        }
    });
    
    const deleteRecordEvent = async (e) => {
        deleteDoc()
        props.refreshParent(props.propObj.top)
    }
    
    return (
        <div className="record">
            <h3 >{propObj.display}</h3> 
            <Link to={`/${depluralize(propObj.field)}/update/${propObj.nested}`} target="_blank">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg"></img>
            </Link>
            <span onClick={deleteRecordEvent}>-</span>
        </div>
    )

}
 export default RelatedRecord
