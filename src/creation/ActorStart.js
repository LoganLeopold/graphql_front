import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'
import axios from 'axios'

const ActorStart = (props) => {

    const [inpVal, setInpVal] = useState('')

    const handleValChange = (e) => setInpVal(e.target.value)

    const postActor = (e) => {

        e.preventDefault()

        // let res = await 
        axios({
            method: "POST",
            url: 'http://localhost:8000/actor/create',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : 'https://localhost:8000',
            },
            data: {name: inpVal}
        }).catch( err => console.log(err))

        // res.then( () => {
        //     setInpVal('')
        // })
        setInpVal('')

    }

    return (
        <div>
            <form action="http://localhost:8000/actor/create" method="post" onSubmit={postActor}>
                <input name="name" value={inpVal} id="actor_name" onChange={handleValChange}/>
                <input type="submit" value="submit" /> 
            </form>
        </div>
    );
}

export default ActorStart;