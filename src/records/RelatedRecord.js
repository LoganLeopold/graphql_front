import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';

const RelatedRecord = (props) => {

    const { propObj: { subDoc, currentDocData } } = props

    let deleteRec = gql`
        mutation ${currentDocData.modelName}DeleteRelatedRecHandle ($recId: MongoID!, $recModel: String!, $movieId: MongoID!) {
            ${currentDocData.modelName}DeleteRelatedRecHandle (recId: $recId, recModel: $recModel, movieId: $movieId) {
                _id,
                name
            }
        }
    `

    const [deleteRecord, { deleteLoading, deleteError }] = useMutation( deleteRec, {
        onCompleted(data) {
            if (data) {
                props.refreshParent(currentDocData._id)
            } else if (deleteLoading) {
                console.log("loading")
            } else if (deleteError) {
                console.log(deleteError)
            }
            
        }
    })
    
    const deleteRecordEvent = async (e) => {
        deleteRecord({ variables: {
            recId: subDoc._id,
            recModel: subDoc.modelName,
            movieId: currentDocData._id,
            }
        })
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
