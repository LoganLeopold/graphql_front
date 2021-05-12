import React, { Component } from 'react';
import axios from "axios"
import Record from "../Record"

class MovieUpdate extends Component {
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

        this.componentDidMount = this.componentDidMount.bind(this)
        this.getLatestDoc = this.getLatestDoc.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async getLatestDoc () {

        try {

            let movieRes = await axios({
                method: "GET",
                url: `http://localhost:8000/movie/${this.props.match.params.id}`,
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin' : 'https://localhost:8000',
                }
            })

            const { Genres, Name, TomatoCritic, TomatoPublic } = movieRes.data

            let actorsRes = await axios({
                method: "GET",
                url: `http://localhost:8000/actor/many/${movieRes.data._id}`,
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin' : 'https://localhost:8000',
                },
            })
            let directorRes = await axios({
                method: "GET",
                url: `http://localhost:8000/director/many/${movieRes.data._id}`,
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin' : 'https://localhost:8000',
                },
            })
            let platformRes = await axios({
                method: "GET",
                url: `http://localhost:8000/platform/many/${movieRes.data._id}`,
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin' : 'https://localhost:8000',
                },
            })

            this.setState({
                name: Name,
                director: directorRes.data.reduce( (acc, cur) => {
                    acc.push(cur)
                    return acc
                }, []),
                actor: actorsRes.data.reduce( (acc, cur) => {
                    acc.push(cur)
                    return acc
                }, []),
                platform: platformRes.data.reduce( (acc, cur) => {
                    acc.push(cur)
                    return acc
                }, []),
                tom_pub: TomatoPublic,
                tom_crit: TomatoCritic,
                genre: Genres.reduce( (acc, cur) => {
                    acc.push(cur)
                    return acc
                }, []).join(', '),
            }, () => {

                console.log("latestDoc SetState fired")

            })

        } catch (err) {

            console.log(err)

        }

    }

    async componentDidMount() {

        this.getLatestDoc()

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
                actor: this.state.actor,
                platform: this.state.platform,
                tom_pub: this.state.tom_pub,
                tom_crit: this.state.tom_crit,
                genre: this.state.genre,
            }
        })

        if (res.status === 200) {
            console.log(res)
            this.getLatestDoc()
        } else {
            console.log(`Post failed with error ${res.status}.`)
        }

    }

    render() {

        let directors, actors, platforms; 

        if (this.state.director.length > 0) {
            directors = this.state.director.map( (dir, i) => <Record key={i} display={dir.Name} recordId={dir._id} modelId={this.props.match.params.id} /> )
        }
        
        if (this.state.actor.length > 0) {
            actors = this.state.actor.map( (actor, i) => <Record key={i} display={actor.Name} recordId={actor._id} modelId={this.props.match.params.id}/> )
        }

        if (this.state.platform.length > 0) {
            platforms = this.state.platform.map( (plat, i) => <Record key={i} display={plat.Name} recordId={plat._id} modelId={this.props.match.params.id}/> )
        }

        return (
            <div className="movie-update">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label>
                        <Record key={this.props.match.params.id} display={this.state.name} />
                        {/* <input name="name" defaultValue='' id="movie_name" onChange={this.handleChange}/> */}
                        </div>
                    <div>
                        <label>Director</label>
                        {directors}
                        </div>
                    <div>
                        <label>Actors</label>
                        <input name="actor" defaultValue='' id="actor_names" onChange={this.handleChange}/>
                        {actors}
                        </div>
                    <div>
                        <label>Platforms</label>
                        {platforms}
                        </div>
                    <div>
                        <label>Rotten Tomatoes Audience Score</label>
                        <h3>{this.state.tom_pub}</h3>
                        <input name="tom_pub" defaultValue='' id="tom_pub" onChange={this.handleChange}/>
                        </div>
                    <div>
                        <label>Rotten Tomatoes Critic Score</label>
                        <h3>{this.state.tom_crit}</h3>
                        <input name="tom_crit" defaultValue='' id="tom_priv" onChange={this.handleChange}/>
                        </div>
                    <div>
                        <label>Genres</label>
                        <h3>{this.state.genre}</h3>
                        <input name="genre" defaultValue='' id="genres" onChange={this.handleChange}/>
                    </div>
                    <input type="submit" value="submit" /> 
                </form>
            </div>
        );  
    }
}

export default MovieUpdate;