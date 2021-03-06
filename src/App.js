import Nav from "./components/Nav"
import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from "./main/Register";
import AlertMessage from "./components/AlertMessage";
import Login from "./main/Login";
import Home from "./main/Home";
import CreateEra from "./models/CreateEra";
import CreateKey from "./models/CreateKey";
import CreateSong from "./models/CreateSong";
import CreateComposer from "./models/CreateComposer";
import DisplayEras from "./views/DisplayEras"
import DisplayKeys from "./views/DisplayKeys";
import "./css/styles.css"
import SingleEra from "./components/SingleEra";
import SingleKey from "./components/SingleKey";
import DisplayComposers from "./views/DisplayComposers";
import SingleComposer from "./components/SingleComposer";
import DisplaySongs from "./views/DisplaySongs";
import SingleSong from "./components/SingleSong";
import CreateDirector from "./views/CreateDirector";


export default class App extends Component{
  constructor(props){
      super(props);
      this.state = {
          name: null,
          message: null,
          category: null,
          loggedIn: localStorage.getItem('token') ? true : false,
          apiBaseUrl: window.location.origin === 'http://localhost:3000/' ? 'http://127.0.0.1:5000': 'https://music-api-community.herokuapp.com/'
      }
  }


  flashMessage = (message, category) => {
    this.setState({message,category})
}

  login = () => {
    this.setState({loggedIn: true})
  }

  logout = () => {
    localStorage.removeItem('token');
    this.flashMessage('You have Logged Out', 'secondary')
    this.setState({loggedIn: false})
  }

  
  render() {
    console.log(window.location.origin)
    return (
      <> 
        <Nav loggedIn={this.state.loggedIn} logUserOut={this.logout}/>
        {/* Put a Background image of a piano landscape to prettify the home page  */}
        
        {/* className='container' sets it to a container width!! */}
        <div className="container">
        {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
          <Routes>
            <Route path="/" element={<Home flashMessage={this.flashMessage} loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl} />}/>
            <Route path="register" element={<Register flashMessage={this.flashMessage} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="login" element={<Login flashMessage={this.flashMessage} login={this.login} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="create" element={<CreateDirector flashMessage={this.flashMessage} login={this.login} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="create-era" element={<CreateEra flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="create-key" element={<CreateKey flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="create-composer" element={<CreateComposer flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="create-song" element={<CreateSong flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="eras" element={<DisplayEras flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="era/:eraId" element={<SingleEra flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="keys" element={<DisplayKeys flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="key/:keyId" element={<SingleKey flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            {/* /composers */}
            <Route path="composers" element={<DisplayComposers flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="composer/:composerId" element={<SingleComposer flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            {/* /composer/:composerId/songs  **displays all songs for composer */}
            {/* /songs */}
            <Route path="songs" element={<DisplaySongs flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            <Route path="song/:songId" element={<SingleSong flashMessage={this.flashMessage}  loggedIn={this.state.loggedIn} apiBaseUrl={this.state.apiBaseUrl}/>}/>
            {/* /song/:songId */}
          </Routes>

        </div>
      </> // This is the parent tag, a marker for content to be read, not functional
    ) // this is the return App content closer
  } // this curly bracket is the App() function closer
}
