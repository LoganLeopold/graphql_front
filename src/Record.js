import React from 'react'
import { useMutation, gql } from '@apollo/client';
import axios from 'axios';

const Record = (props) => {

    const actorU = gql`
        mutation {
            actorUpdateByIdCascade( _id:"${props.recordId}", modelId: "${props.modelId}")
        }
    `

    const [deleteMovie, { loading, error }] = useMutation(actorU, {
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

    const deleteRecord = async (e) => {
        deleteMovie()
        // let movieTest = await axios({
        //     method: "GET",
        //     url: `http://localhost:8000/movie/${props.recordId}`,
        //     headers: {
        //         "Content-Type": "application/json",
        //         'Access-Control-Allow-Origin' : 'https://localhost:8000',
        //     },
        // })
    }

    return (
        <div className="record">
            <h3>{props.name}</h3>
            <p onClick={deleteRecord}>-</p>
        </div>
    )

}
 export default Record
