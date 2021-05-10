import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client';

const Record = (props) => {

    const actorU = gql`
    mutation {
        actorUpdateByIdCascade( _id:"${props.recordId}", modelId: "${props.modelId}")
    }
`

    const deleteRecord = (e) => {
        console.log(props)
    }

    return (
        <div className="record">
            <h3>{props.name}</h3>
            <p onClick={deleteRecord}>-</p>
        </div>
    )

}
 export default Record
