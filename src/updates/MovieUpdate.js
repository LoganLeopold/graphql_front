import React, { Component } from 'react';
// import { gql } from '@apollo/client';
import axios from 'axios'
import Record from "../Record"

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
        this.getLatestDoc = this.getLatestDoc.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async getLatestDoc (id) {

        try {

            let movie = await axios({
                url: 'http://localhost:8000/graphql',
                method: 'POST',
                data: {
                  query: `
                    query {
                        movieById(_id:"${id}") {
                                _id
                            Name
                            Actors {
                            Name
                                    _id
                            }
                            Platforms{
                            Name
                            _id
                            }
                            Director
                            TomatoPublic
                            TomatoCritic
                            Genres
                        }
                    }
                `
                }
            })

            let { Name, Director, Actors, Platforms, TomatoPublic, TomatoCritic, Genres } = movie.data.data.movieById

            this.setState({
                name: Name,
                director: Director,
                actors: Actors,
                platforms: Platforms,
                tom_pub: TomatoPublic,
                tom_crit: TomatoCritic,
                genres: Genres,
            }, () => {

                console.log("latestDoc SetState fired")

            })

        } catch (err) {

            console.log(err)

        }

    }

    async componentDidMount() {

        this.getLatestDoc(this.props.match.params.id)

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
                actors: this.state.actor,
                platforms: this.state.platform,
                tom_pub: this.state.tom_pub,
                tom_crit: this.state.tom_crit,
                genres: this.state.genre,
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

        let directors, actors, platforms, genres; 

        let defaultProps = {
            display: "No Records",
            nested: 0,
            top: 0,
            field: 'null',
        }

        let defaultRec = <Record key={1234234} propObj={defaultProps} />

        if (this.state.director) {
            directors = this.state.director.map( (dir, i) => {
                let testProps = {
                    display: dir.Name,
                    nested: dir._id,
                    top: this.props.match.params.id,
                    field: 'directors',
                }
                return <Record key={i} propObj={testProps} refreshParent={this.getLatestDoc}/> 
            })
        } else {
            directors = defaultRec
        }
        
        if (this.state.actors) {
            actors = this.state.actors.map( (actor, i) => {
                let testProps = {
                    display: actor.Name,
                    nested: actor._id,
                    top: this.props.match.params.id,
                    field: 'actors',
                }
                return <Record key={i} propObj={testProps} refreshParent={this.getLatestDoc} /> 
            })
        }  else {
            actors = defaultRec
        }

        if (this.state.platforms) {
            platforms = this.state.platforms.map( (plat, i) => {
                let testProps = {
                    display: plat.Name,
                    nested: plat._id,
                    top: this.props.match.params.id,
                    field: 'platforms',
                }
                return <Record key={i} propObj={testProps} refreshParent={this.getLatestDoc}/> 
            })
        }  else {
            platforms = defaultRec
        }

        if (this.state.genres) {
            genres = this.state.genres.map( (genr, i) => {
                let testProps = {
                    display: genr,
                    nested: genr._id,
                    top: this.props.match.params.id,
                    field: 'genres',
                }
                return <Record key={i} propObj={testProps} refreshParent={this.getLatestDoc}/>
            })
        } else {
            genres = defaultRec
        }
 
        let titleObj = {display: this.state.name, field: "name"}

        return (

            <div className="movie-update">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label>
                        <Record key={this.props.match.params.id} propObj={titleObj} />
                    </div>
                    <div>
                        <label>Director</label>
                        {directors}
                    </div>
                    <div>
                        <label>Actors</label>
                        {actors}
                    </div>
                    <div>
                        <label>Platforms</label>
                        {platforms}
                    </div>
                    <div>
                        <label>Rotten Tomatoes Audience Score</label>
                        <h3>{this.state.tom_pub}</h3>
                    </div>
                    <div>
                        <label>Rotten Tomatoes Critic Score</label>
                        <h3>{this.state.tom_crit}</h3>
                    </div>
                    <div>
                        <label>Genres</label>
                        {genres}
                    </div>
                </form>
            </div>
        );  
    }
}

export default MovieUpdate;