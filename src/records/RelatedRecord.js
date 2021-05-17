import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
import { capitalize, depluralize } from "../utilities"

const RelatedRecord = (props) => {

    // console.log(props)

    const { propObj: { recordData, currentModelData } } = props

    let rDataArray = Object.entries(recordData)
    let mDataArray = Object.entries(currentModelData)

    console.log(rDataArray)

    // const docRemove = gql`
    //     mutation {
    //         simple${currentModelData.modelName}UpdateHandle (recordData: ${rDataArray}, currentModelData: ${mDataArray}) {
    //             name
    //             _id
    //         } 
    //     }
    // `

    // const [deleteDoc, { loading, error }] = useMutation(docRemove, {
    //     onCompleted(data) {
    //         if (data) {    
    //             console.log(data)
    //         } else if (loading) {
    //             console.log("loading")
    //         } else if (error) {
    //             console.log(error)
    //         }   
    //     }
    // });
    
    // const deleteRecordEvent = async (e) => {
    //     deleteDoc()
    //     props.refreshParent(currentModelData._id)
    // }
    
    return (
        <div className="record">
            <h3 >{recordData.name}</h3> 
            <Link to={`/${depluralize(recordData.modelName)}/update/${recordData._id}`} target="_blank">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Ei-pencil.svg" alt={"Pencil For Edit"}></img>
            </Link>
            {/* <span onClick={deleteRecordEvent}>-</span> */}
        </div>
    )

}
 export default RelatedRecord
