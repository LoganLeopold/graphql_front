import React, { Component } from 'react';
// import { gql } from '@apollo/client';
import axios from 'axios'
import Record from "../Record"
import { PropObj } from '../utilities'

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
            genres: [],
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
                            name
                            actors {
                                name
                                _id
                            }
                            platforms{
                                name
                                _id
                            }
                            director
                            tomatoublic
                            tomatoritic
                            genres
                        }
                    }
                `
                }
            })

            let { name, director, actors, platforms, tomatopublic, tomatocritic, genres } = movie.data.data.movieById

            this.setState({
                name: name,
                director: director,
                actors: actors,
                platforms: platforms,
                tom_pub: tomatopublic,
                tom_crit: tomatocritic,
                genres: genres,
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

        // Default for no record
        let defaultProps = new PropObj("No Records", 0, 0, "null")
        let defaultRec = <Record key={1234234} propObj={defaultProps} />

        // Directors
        if (this.state.director) {
            directors = this.state.director.map( (dir, i) => {
                let propsObject = new PropObj(dir.Name, dir._id, this.props.match.params.id, 'director')
                return <Record key={i} propObj={propsObject} refreshParent={this.getLatestDoc}/> 
            })
        } else {
            directors = defaultRec
        }
        
        // Actors
        if (this.state.actors) {
            actors = this.state.actors.map( (actor, i) => {
                let propsObject = new PropObj(actor.Name, actor._id, this.props.match.params.id, "actors")
                return <Record key={i} propObj={propsObject} refreshParent={this.getLatestDoc} /> 
            })
        }  else {
            actors = defaultRec
        }

        // Platforms
        if (this.state.platforms) {
            platforms = this.state.platforms.map( (plat, i) => {
                let propsObject = new PropObj(plat.Name, plat._id, this.props.match.params.id, 'platform')
                return <Record key={i} propObj={propsObject} refreshParent={this.getLatestDoc}/> 
            })
        }  else {
            platforms = defaultRec
        }

        // Genres
        if (this.state.genres) {
            genres = this.state.genres.map( (genr, i) => {
                let propsObject = new PropObj(genr, 0, this.props.match.params.id, 'genres')
                return <Record key={i} propObj={propsObject} refreshParent={this.getLatestDoc}/>
            })
        } else {
            genres = defaultRec
        }
 
        // Setup for Title
        let titleProps = new PropObj(this.state.name, 0, 0, "name")
        let tomPubProps = new PropObj(this.state.tom_pub, 0, 0, "tomatopublic")
        let tomCritProps = new PropObj(this.state.tom_crit, 0, 0, "tomatocritc")

        return (

            <div className="movie-update">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label>
                        <Record key={this.props.match.params.id} propObj={titleProps} />
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
                        <Record key={this.state.tom_pub} propObj={tomPubProps} />
                    </div>
                    <div>
                        <label>Rotten Tomatoes Critic Score</label>
                        <Record key={this.state.tom_crit} propObj={tomCritProps} />
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