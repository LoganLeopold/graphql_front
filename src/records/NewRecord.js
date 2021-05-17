import React, { useState } from 'react'
// import { useMutation, gql } from '@apollo/client';
// import { capitalize } from '../utilities'

const NewRecord = (props) => {

    const [editing, openEditing] = useState(false)

    const revealInput = (e) => {
        openEditing(!editing)
    }

    const submitUpdate = (e) => {
        
    }

    return (
        <div className="new-record">
            {!editing && <span onClick={revealInput}>+</span>}
            {editing && <span onClick={revealInput}>Cancel</span>}
            {editing && <input />}
            {editing && <input onClick={submitUpdate} type="submit" value="Update"/>}
        </div>
    )

}

export default NewRecord