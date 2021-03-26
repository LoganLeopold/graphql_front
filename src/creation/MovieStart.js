import React, { Component } from 'react';

class MovieStart extends Component {
    render() {
        return (
            <div>
                <form action="http://localhost:8000/movie/create" method="post">
                    <input name="name" value={this.value} id="movie_name"/>
                    <input name="director" value={this.value} id="director_name"/>
                    <input name="actors" value={this.value} id="actor_names"/>
                    <input name="platforms" value={this.value} id="platform_names"/>
                    <input name="tom_pub" value={this.value} id="tom_pub"/>
                    <input name="tom_priv" value={this.value} id="tom_priv"/>
                    <input name="genres" value={this.value} id="genres"/>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );
    }
}

export default MovieStart;