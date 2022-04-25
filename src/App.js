import Nav from "./components/Nav"
import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from "./views/Register";
import AlertMessage from "./components/AlertMessage";
import Login from "./views/Login";
import Home from "./views/Home";

export default class App extends Component{
  constructor(props){
      super(props);
      this.state = {
          name: null,
          message: null,
          category: null,
          loggedIn: localStorage.getItem('token') ? true : false
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
    return (
      <> 
        <Nav loggedIn={this.state.loggedIn} logUserOut={this.logout}/>
        <div className="container">
        {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="register" element={<Register flashMessage={this.flashMessage}/>}/>
            <Route path="login" element={<Login flashMessage={this.flashMessage} login={this.login}/>}/>
            <Route path="login" element={<Login flashMessage={this.flashMessage} login={this.login}/>}/>
            
          </Routes>

        </div>
      </> // This is the parent tag, a marker for content to be read, not functional
    ) // this is the return App content closer
  } // this curly bracket is the App() function closer
}
