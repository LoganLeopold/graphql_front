import React, { Component } from 'react';

class MovieStart extends Component {
    render() {
        return (
            <div>
                <form action="http://localhost:8000/movie/create" method="post">
                    <label>Title</label>
                    <input name="name" value={this.value} id="movie_name"/>
                    <label>Director</label>
                    <input name="director" value={this.value} id="director_name"/>
                    <label>Actors</label>
                    <input name="actors" value={this.value} id="actor_names"/>
                    <label>Platforms</label>
                    <input name="platforms" value={this.value} id="platform_names"/>
                    <label>Rotten Tomatoes Audience Score</label>
                    <input name="tom_pub" value={this.value} id="tom_pub"/>
                    <label>Rotten Tomatoes Critic Score</label>
                    <input name="tom_crit" value={this.value} id="tom_priv"/>
                    <label>Genres</label>
                    <input name="genres" value={this.value} id="genres"/>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );
    }
}

export default MovieStart;