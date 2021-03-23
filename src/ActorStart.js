import React, { Component } from 'react';
import axios from 'axios'

class ActorStart extends Component {
    constructor () {
        super()
        this.state = {}

        this.componentDidMount = this.componentDidMount.bind(this)
        this.onClickHandl = this.onClickHandl.bind(this)
    }


    componentDidMount() {
        console.log("Mounted")
    }

    onClickHandl(e) {

        // e.preventDefault()

        // let name = document.getElementById('actor_name').value
        // // let body = encodeURIComponent(name)

        // axios({
        //     method: 'post',
        //     url: 'http://localhost:8000/actor/create',
        //     headers: {
        //     "Content-Type":"application/x-www-form-urlencoded",
        //     },
        //     data: name
        // }).then( res => console.log(res))

    }

    render() {
        return (
            <div>
                <form action="http://localhost:8000/actor/create" method="post">
                    <input name="name" value={this.value} id="actor_name"/>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );
    }
}

export default ActorStart;