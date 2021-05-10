import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client';

const Record = (props) => {

    const deleteRecord = (e) => console.log(e.target.dataset._id)

    return (
        <div class="record">
            <h3>{props.name}</h3>
            <p data-_id={props._id} onClick={deleteRecord}>-</p>
        </div>
    )

}
 export default Record
