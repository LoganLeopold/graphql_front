import React, { Component } from 'react';

class DirectorStart extends Component {
    render() {
        return (
            <div>
                <form action="http://localhost:8000/director/create" method="post">
                    <input name="name" value={this.value} id="director_name"/>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );
    }
}

export default DirectorStart;