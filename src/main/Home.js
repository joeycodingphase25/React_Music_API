import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            keys: ['C Major', 'G Major', 'A Major', 'E Major', 'B Major', 'F-Sharp Major', 'C-Sharp Major', 'F Major', 'B-Flat Major', 'E-Flat Major', 'A-Flat Major', 'C-Flat major', 'G-Flat Major', 'D-Flat Major']
        }
    }

    handleAdd = () => {
        if (this.props.loggedIn) {
            this.setState({redirect:'/create'})
        }else{
            this.setState({redirect:'/register'})
        }
    }
    render() {
        return (
            this.state.redirect ? <Navigate to={this.state.redirect} /> :
            <div className='bg-info'>
                <div className='text-start fw-bold mt-3'>
                        <h1>Welcome To The Music API</h1>
                </div>
                <div className='text-end fw-bold mt-3'>
                        <h1>Everyone Can Add To the API!</h1>
                </div>
                <div className='text-start fw-bold mt-3'>
                    <h1>Explore Each component of Music!</h1>
                </div>
                <div className='d-flex justify-content-around'>
                    <select onChange={(e) => this.setState({redirect: `/${e.target.value}`})}>
                        <option value='Renaissance'>Renaissance</option>
                        <option value='Baroque'>Baroque</option>
                        <option value='Classical'>Classical</option>
                        <option value='Romantic'>Romantic</option>
                        <option selected value='' disabled>Choose Era</option>
                    </select>
                    <select onChange={(e) => this.setState({redirect: `/${e.target.value}`})}>
                        {this.state.keys.map(key => <option value={key}>{key}</option>)}
                        <option selected value='' disabled>Choose Key Signature</option>
                    </select>
                    <select onChange={(e) => this.setState({redirect: `/${e.target.value}`})}>
                        {/* Fectch the data from the API do this later */}
                        <option selected value='' disabled>Composer(Coming Soon!)</option>
                    </select>
                </div>

                <div className='text-start fw-bold mt-4 pt-4'>
                    <button onClick={this.handleAdd} className='btn btn-danger w-100'>Add to the Database!</button>   
                </div>
            </div>
            
        )
    }
}
