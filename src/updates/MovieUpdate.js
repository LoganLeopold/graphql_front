import React, { Component } from 'react';
import axios from 'axios'
import SimpleRecord from "../records/SimpleRecord"
import NewRecord from "../records/NewRecord"
import { SimplePropObj, returnRelatedRecords } from "../utilities"

class MovieUpdate extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            directors: '',
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
                            modelName
                            actors {
                              name
                              _id
                              modelName
                            }
                            platforms {
                              name
                              _id
                              modelName
                            }
                            directors {
                              _id
                              name
                              modelName
                            }
                            tomatopublic
                            tomatocritic
                            genres
                          }
                    }
                `
                }
            })
            
            let { _id, name, directors, actors, platforms, tomatopublic, tomatocritic, genres, modelName } = movie.data.data.movieById

            this.setState({
                _id: _id,
                name: name,
                directors: directors,
                actors: actors,
                platforms: platforms,
                tom_pub: tomatopublic,
                tom_crit: tomatocritic,
                genres: genres,
                modelName: modelName,
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
            url: `http://localhost:8000/movies/update/${this.props.match.params.id}`,
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
        let defaultProps = new SimplePropObj({placehold: "No records"}, null)
        let defaultRec = <SimpleRecord propObj={defaultProps} />

        // Director
        if (this.state.directors) {
            returnRelatedRecords(this.state.directors, this.state, [["refreshParent", this.getLatestDoc]])
        } else {
            directors = defaultRec
        }
        
        // Actors
        if (this.state.actors) {
            actors = returnRelatedRecords(this.state.actors, this.state, [["refreshParent", this.getLatestDoc]])
        } else {
            actors = defaultRec
        }

        // Platforms
        if (this.state.platforms) {
            platforms = returnRelatedRecords(this.state.platforms, this.state, [["refreshParent", this.getLatestDoc]])
        } else {
            platforms = defaultRec
        }

        // Genres
        if (this.state.genres) {
            genres = this.state.genres.map( (genr, i) => {
                let propsObject = new SimplePropObj({genres: genr}, this.state)
                return <SimpleRecord key={i} propObj={propsObject} refreshParent={this.getLatestDoc}/>
            })
        } else {
            genres = defaultRec
        }
 
        // Setup for simple object props
        let titleProps = new SimplePropObj({name: this.state.name}, this.state)
        let tomPubProps = new SimplePropObj({tomatopublic: this.state.tom_pub}, this.state)
        let tomCritProps = new SimplePropObj({tomatocritic: this.state.tom_crit}, this.state)

        // Setup for new record props
        // let newGenreProps = new NewPropObj()

        return (
            <div className="movie-update">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label>
                        <SimpleRecord propObj={titleProps} refreshParent={this.getLatestDoc}/>
                    </div>
                    <div> <label> Director </label> {directors} </div>
                    <div> <label> Actors </label> {actors} </div>
                    <div> <label> Platforms </label> {platforms} </div>
                    <div>
                        <label>Rotten Tomatoes Audience Score</label>
                        <SimpleRecord key={this.state.tom_pub} propObj={tomPubProps} refreshParent={this.getLatestDoc} />
                    </div>
                    <div>
                        <label>Rotten Tomatoes Critic Score</label>
                        <SimpleRecord key={this.state.tom_crit} propObj={tomCritProps} refreshParent={this.getLatestDoc} />
                    </div>
                    <div>
                        <label>Genres</label>
                        {/* <NewRecord propObj={newGenreProps} /> */}
                        {genres}
                    </div>
                </form>
            </div>
        );  
    }
}

export default MovieUpdate;