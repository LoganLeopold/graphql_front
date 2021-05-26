import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';

const RelatedRecord = (props) => {

    const { propObj: { recordData, currentModelData } } = props

    const docRemove = gql`
        mutation {              
            simple${recordData.modelName}DeleteHandle (${recordData.modelName}Id: "${recordData._id}", docId: "${currentModelData._id}", docModel: ${currentModelData.modelName}) { 
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
        // send delete mutation to delete this recordData from the currentModelData
        deleteDoc()
        props.refreshParent(currentModelData._id)
    }
    
    return (
        <div className="record">
            <h3 >{recordData.name}</h3> 
            <Link to={`/${recordData.modelName}/update/${recordData._id}`} target="_blank">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt={"Pencil For Edit"}></img>
            </Link>
            <span onClick={deleteRecordEvent}>-</span>
        </div>
    )

}
 export default RelatedRecord
