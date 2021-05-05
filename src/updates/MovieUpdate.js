import React, { Component } from 'react';
import axios from "axios"

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
                    acc.push(cur.Name)
                    return acc
                }, []).join(', '),
                actor: actorsRes.data.reduce( (acc, cur) => {
                    acc.push(cur.Name)
                    return acc
                }, []).join(', '),
                platform: platformRes.data.reduce( (acc, cur) => {
                    acc.push(cur.Name)
                    return acc
                }, []).join(', '),
                tom_pub: TomatoPublic,
                tom_crit: TomatoCritic,
                genre: Genres.reduce( (acc, cur) => {
                    acc.push(cur)
                    return acc
                }, []).join(', '),
            }, () => {

                const stateSnapshot = Object.entries(this.state)

                stateSnapshot.forEach( snap => document.querySelector(`[name='${snap[0]}']`).value = snap[1] )

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

        // let res = await axios({
        //     method: "PUT",
        //     url: `http://localhost:8000/movie/testAbs/${this.props.match.params.id}`,
        //     headers: {
        //         "Content-Type": "application/json",
        //         'Access-Control-Allow-Origin' : 'https://localhost:8000',
        //     },
        //     data: {
        //         name: this.state.name,
        //         director: this.state.director,
        //         actor: this.state.actor,
        //         platform: this.state.platform,
        //         tom_pub: this.state.tom_pub,
        //         tom_crit: this.state.tom_crit,
        //         genre: this.state.genre,
        //     }
        // })

        let res = await axios({
            method: "PUT",
            url: `http://localhost:8000/movie/testAbs/${this.props.match.params.id}`,
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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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

export default MovieUpdate;