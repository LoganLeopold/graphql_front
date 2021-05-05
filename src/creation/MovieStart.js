import React, { Component } from 'react';
import axios from "axios"

class MovieStart extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            director: '',
            actor: '',
            platform: '',
            tom_pub: '',
            tom_crit: '',
            genre: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    async handleSubmit(e) {

        e.preventDefault()

        let res = await axios({
            method: "POST",
            url: 'http://localhost:8000/movie/create',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : 'https://localhost:8000',
            },
            data: {
                name: this.state.name,
                director: this.state.director,
                actor: this.state.actors,
                platform: this.state.platforms,
                tom_pub: this.state.tom_pub,
                tom_crit: this.state.tom_crit,
                genre: this.state.genres,
            }
        })

        if (res.status === 200) {
            console.log(res)
        } else {
            console.log(`Post failed with error ${res.status}.`)
        }

    }

    render() {
        return (
            <div>
                <form action="http://localhost:8000/movie/create" method="post" onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input name="name" defaultValue='' id="movie_name" onChange={this.handleChange}/>
                    <label>Director</label>
                    <input name="director" defaultValue='' id="director_name" onChange={this.handleChange}/>
                    <label>Actors</label>
                    <input name="actor" defaultValue='' id="actor_names" onChange={this.handleChange}/>
                    <label>Platforms</label>
                    <input name="platform" defaultValue='' id="platform_names" onChange={this.handleChange}/>
                    <label>Rotten Tomatoes Audience Score</label>
                    <input name="tom_pub" defaultValue='' id="tom_pub" onChange={this.handleChange}/>
                    <label>Rotten Tomatoes Critic Score</label>
                    <input name="tom_crit" defaultValue='' id="tom_priv" onChange={this.handleChange}/>
                    <label>Genres</label>
                    <input name="genre" defaultValue='' id="genres" onChange={this.handleChange}/>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );
    }
}

export default MovieStart;