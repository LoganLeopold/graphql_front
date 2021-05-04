import React, { Component } from 'react';
import axios from "axios"

class MovieUpdate extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            director: '',
            actors: '',
            platforms: '',
            tom_pub: '',
            tom_crit: '',
            genres: '',
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async componentDidMount() {

        let movieRes = await axios({
            method: "GET",
            url: `http://localhost:8000/movie/${this.props.match.params.id}`,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : 'https://localhost:8000',
            }
        })

        // Need separate requests to fetch conditional on movie id
        //Actors
        //Directors
        //Platforms
        console.log(res)

    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    async handleSubmit(e) {

        e.preventDefault()

        let res = await axios({
            method: "PUT",
            url: `http://localhost:8000/movie/update/${this.props.match.params.id}`,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : 'https://localhost:8000',
            },
            data: {
                name: this.state.name,
                director: this.state.director,
                actors: this.state.actors,
                platforms: this.state.platforms,
                tom_pub: this.state.tom_pub,
                tom_crit: this.state.tom_crit,
                genres: this.state.genres,
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
                <form onSubmit={this.handleSubmit}>
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

export default MovieUpdate;