import './App.css';
import React, { Component } from 'react';
import { Link, Route} from "react-router-dom";
import ActorList from "./lists/ActorList"
import DirectorList from "./lists/DirectorList"
import PlatformList from "./lists/PlatformList"
import ApolloTest from "../src/apollo_client_test/ApolloTest"
import ActorUpdate from "./updates/ActorUpdate"
import MovieList from "./lists/MovieList"
import MovieUpdate from "./updates/MovieUpdate"

class App extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render () {

    return (
      <div className="App">
  
        <nav className='top' style={{display: 'flex'}}>
          <h1> <Link className='homepage' to='/'>Home</Link></h1>
          <br></br> 
          <h2> <Link to={'/actor/'}>Artists</Link></h2> 
          <br></br> 
          <h2> <Link to={'/director/'}>Directors</Link></h2> 
          <br></br> 
          <h2> <Link to={'/movie/'}>Movies</Link></h2> 
          <br></br> 
          <h2> <Link to={'/platform/'}>Platforms</Link></h2> 
          <br></br> 
          <h2> <Link to={'/apollo/'}>Apollo</Link></h2> 
          <br></br>
        </nav>   
          
        <main>
            <Route path="/director" exact render={routerProps => <DirectorList {...routerProps} {...this.state}/>} /> 
            <Route path="/platform" exact render={routerProps => <PlatformList {...routerProps} {...this.state}/>} /> 
            <Route path="/apollo" exact render={routerProps => <ApolloTest {...routerProps} {...this.state}/>} /> 
            
            <Route path="/actor" exact render={routerProps => <ActorList {...routerProps} {...this.state}/>} /> 
            <Route path="/actor/:id" exact render={routerProps => <ActorUpdate {...routerProps} {...this.state} />} />
            
            <Route path="/movie" exact render={routerProps => <MovieList {...routerProps} {...this.state}/>} /> 
            <Route path="/movie/update/:id"  render={routerProps => <MovieUpdate {...routerProps} {...this.state} />} />
        </main> 
  
      </div>
    );

  }

}

export default App;
