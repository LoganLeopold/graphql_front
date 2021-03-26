import './App.css';
import React, { Component } from 'react';
import { Link, Route} from "react-router-dom";
import ActorStart from "./creation/ActorStart"
import DirectorStart from "./creation/DirectorStart"
import MovieStart from "./creation/MovieStart"
import PlatformStart from "./creation/PlatformStart"

class App extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render () {

    console.log(this)

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
        </nav>   
          
        <main>
            <Route path="/actor" exact render={routerProps => <ActorStart {...routerProps} {...this.state}/>} /> 
            <Route path="/director" exact render={routerProps => <DirectorStart {...routerProps} {...this.state}/>} /> 
            <Route path="/movie" exact render={routerProps => <MovieStart {...routerProps} {...this.state}/>} /> 
            <Route path="/platform" exact render={routerProps => <PlatformStart {...routerProps} {...this.state}/>} /> 
        </main> 
  
      </div>
    );

  }

}

export default App;
