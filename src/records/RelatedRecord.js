import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';

const RelatedRecord = (props) => {

    const { propObj: { subDoc, currentDocData } } = props

    const docRemove = gql`
        mutation {              
            simple${subDoc.modelName}DeleteHandle (${subDoc.modelName}Id: "${subDoc._id}", docId: "${currentDocData._id}", docModel: ${currentDocData.modelName}) { 
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
        // send delete mutation to delete this subDoc from the currentDocData
        deleteDoc()
        props.refreshParent(currentDocData._id)
    }
    
    return (
        <div className="record">
            <h3 >{subDoc.name}</h3> 
            <Link to={`/${subDoc.modelName}/update/${subDoc._id}`} target="_blank">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt={"Pencil For Edit"}></img>
            </Link>
            <span onClick={deleteRecordEvent}>-</span>
        </div>
    )

}
 export default RelatedRecord
