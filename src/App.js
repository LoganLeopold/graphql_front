import './App.css';
import React, { Component } from 'react';
import { Link, Route} from "react-router-dom";
import ActorList from "./lists/ActorList"
import DirectorList from "./lists/DirectorList"
import PlatformList from "./lists/PlatformList"
import ActorUpdate from "./updates/ActorUpdate"
import MovieList from "./lists/MovieList"
import MovieUpdate from "./updates/MovieUpdate"
import MovieStart from './creation/MovieStart';

class App extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render () {

    return (
      <div className="App">
  
        <nav className='top' style={{display: 'flex', flexWrap: "wrap"}}>
          <h1> <Link className='homepage' to='/'>Home</Link></h1>
          <br></br> 
          <h2> <Link to={'/actors/'}>Actors</Link></h2> 
          <br></br> 
          <h2> <Link to={'/directors/'}>Directors</Link></h2> 
          <br></br> 
          <h2> <Link to={'/movies/'}>Movies</Link></h2> 
          <h2> <Link to={'/movies/create'}>Movie Create</Link></h2> 
          <br></br>
          <br></br> 
          <h2> <Link to={'/platforms/'}>Platforms</Link></h2> 
          <br></br> 
        </nav>   
          
        <main>
            <Route path="/directors" exact render={routerProps => <DirectorList {...routerProps} {...this.state}/>} /> 
            <Route path="/platforms" exact render={routerProps => <PlatformList {...routerProps} {...this.state}/>} /> 
            
            <Route path="/actors" exact render={routerProps => <ActorList {...routerProps} {...this.state}/>} /> 
            <Route path="/actors/update/:id" exact render={routerProps => <ActorUpdate {...routerProps} {...this.state} />} />
            
            <Route path="/movies" exact render={routerProps => <MovieList {...routerProps} {...this.state}/>} /> 
            <Route path="/movies/create" exact render={routerProps => <MovieStart {...routerProps} {...this.state}/>} /> 
            <Route path="/movies/update/:id"  render={routerProps => <MovieUpdate {...routerProps} {...this.state} />} />
        </main> 
  
      </div>
    );

  }

}

export default App;
