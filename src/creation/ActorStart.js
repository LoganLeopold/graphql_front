import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

class ActorStart extends Component {
    constructor () {
        super()
        this.state = {
            //
        }

        // this.componentDidMount = this.componentDidMount.bind(this)
        this.postActor = this.postActor.bind(this)
    }

    async postActor(e) {

        e.preventDefault()

        let actorValue = document.querySelector('#actor_name').value

        let res = await axios({
            method: "POST",
            url: 'http://localhost:8000/actor/create',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : 'https://localhost:8000',
            },
            data: {name: actorValue}
        })
        


    }

    render() {
        return (
            <div>

                <form action="http://localhost:8000/actor/create" method="post" onSubmit={this.postActor}>
                    <input name="name" value={this.value} id="actor_name"/>
                    <input type="submit" value="submit" /> 
                </form>

            </div>
        );
    }
}

export default ActorStart;