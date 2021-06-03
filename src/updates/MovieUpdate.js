import React, { Component } from 'react';
import axios from 'axios'
import SimpleRecord from "../records/SimpleRecord"
import NewRecords from "../records/NewRecords"
import { SimplePropObj, returnRelatedRecords, NewRecPropObj } from "../utilities"

class MovieUpdate extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            directors: [],
            actors: [],
            platforms: [],
            tom_pub: '',
            tom_crit: '',
            genres: [],
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.getLatestDoc = this.getLatestDoc.bind(this)

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

    render() {

        let directors, actors, platforms, genres; 

        // Default for no record
        let defaultProps = new SimplePropObj({placehold: "No records"}, null)
        let defaultRec = <SimpleRecord propObj={defaultProps} />

        // Director
        if (this.state.directors) {
            directors = returnRelatedRecords(this.state.directors, this.state, [["refreshParent", this.getLatestDoc]])
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

        return (
            <div className="movie-update">
                    <div>
                        <label>Title</label>
                        <SimpleRecord propObj={titleProps} refreshParent={this.getLatestDoc}/>
                    </div>
                    <div className="relatedGroup"> 
                        <div>
                            <label> Director </label> 
                            <NewRecords propObj={new NewRecPropObj('directors', this.state)} refreshParent={this.getLatestDoc}/> 
                        </div>
                        {directors} 
                    </div>
                    <div className="relatedGroup"> 
                        <div>
                            <label> Actors </label> 
                            <NewRecords propObj={new NewRecPropObj('actors', this.state)} refreshParent={this.getLatestDoc}/> 
                        </div>
                        {actors} 
                    </div>
                    <div className="relatedGroup"> 
                        <div>
                            <label> Platforms </label> 
                            <NewRecords propObj={new NewRecPropObj('platforms', this.state)} refreshParent={this.getLatestDoc}/>  
                        </div>
                        {platforms} 
                    </div>
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
                        {genres}
                    </div>
            </div>
        );  
    }
}

export default MovieUpdate;