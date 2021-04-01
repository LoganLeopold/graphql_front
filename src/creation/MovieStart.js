import React, { Component } from 'react';
import axios from "axios"

class MovieStart extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            director: '',
            actors: '',
            platforoms: '',
            tom_pub: '',
            tom_crit: '',
            genres: '',
        }

        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleSubmit(e) {

        e.preventDefault()

        

    }

    render() {
        return (
            <div>
                <form action="http://localhost:8000/movie/create" method="post">
                    <label>Title</label>
                    <input name="name" defaultValue='' id="movie_name" onChange={this.handleChange}/>
                    <label>Director</label>
                    <input name="director" defaultValue='' id="director_name" onChange={this.handleChange}/>
                    <label>Actors</label>
                    <input name="actors" defaultValue='' id="actor_names" onChange={this.handleChange}/>
                    <label>Platforms</label>
                    <input name="platforms" defaultValue='' id="platform_names" onChange={this.handleChange}/>
                    <label>Rotten Tomatoes Audience Score</label>
                    <input name="tom_pub" defaultValue='' id="tom_pub" onChange={this.handleChange}/>
                    <label>Rotten Tomatoes Critic Score</label>
                    <input name="tom_crit" defaultValue='' id="tom_priv" onChange={this.handleChange}/>
                    <label>Genres</label>
                    <input name="genres" defaultValue='' id="genres" onChange={this.handleChange}/>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );
    }
}

export default MovieStart;