import React, { Component } from 'react';

class ActorStart extends Component {
    constructor () {
        super()
        this.state = {}

        this.componentDidMount = this.componentDidMount.bind(this)
        // this.onClickSub = this.onClickSub.bind(this)
    }


    componentDidMount() {
        console.log("Mounted")
    }

    // onClickSub() {
    //     let 
    // }

    render() {
        return (
            <div>
                <form action="http://localhost/8000/actor/create" method="post">
                    <input name="name"/>
                    <input type="submit" value="submit"/> 
                </form>
            </div>
        );
    }
}

export default ActorStart;