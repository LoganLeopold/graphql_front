import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'
import axios from 'axios'

const ActorStart = (props) => {

    const [inpVal, setInpVal] = useState('')

    const handleValChange = (e) => setInpVal(e.target.value)

    const postActor = async (e) => {

        e.preventDefault()

        let res = await axios({
            method: "POST",
            url: 'http://localhost:8000/actor/create',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : 'https://localhost:8000',
            },
            data: {name: inpVal}
        })

        if (res.status === 200) {
            console.log(res)
            setInpVal('')
        } else {
            console.log(`Post failed with error ${res.status}.`)
        }

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