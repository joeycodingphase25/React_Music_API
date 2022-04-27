import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import "../css/styles.css"


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            keys: [],
            // keys: ['C Major', 'G Major', 'A Major', 'E Major', 'B Major', 'F-Sharp Major', 'C-Sharp Major', 'F Major', 'B-Flat Major', 'E-Flat Major', 'A-Flat Major', 'C-Flat major', 'G-Flat Major', 'D-Flat Major']
            era: [],
            composers: []
        }
    }

    handleAdd = () => {
        if (this.props.loggedIn) {
            this.setState({redirect:'/create'})
        }else{
            this.setState({redirect:'/register'})
        }
    }
    //get key sigs for drop down
    getKeys = () => {
        fetch('http://127.0.0.1:5000/api/key-signatures')
            .then(res => res.json())
            .then(data => {
                this.setState({keys: data })
            })
    }

    // get eras for drop down
    getEras = () => {
        fetch('http://127.0.0.1:5000/api/eras')
            .then(res => res.json())
            .then(data => {
                this.setState({era: data})

            })
    }
    // get eras for drop down
    getComposers = () => {
        fetch('http://127.0.0.1:5000/api/composers')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                this.setState({composers: data})
            })
        }


    render() {
        return (
            this.state.redirect ? <Navigate to={this.state.redirect} /> :
            <>
                <div className='hero-image text-center text-white'>
                    <h1>Music API</h1>
                    <h6 className='mt-3'>A Community Project</h6>
                </div>
                <div className='d-flex justify-content-around mt-3'>
                    <select defaultValue='era' onClick={this.getEras} onChange={(e) => this.setState({redirect: `/era/${e.target.value}`})}>
                        {this.state.era.map(era => <option key={era.era_id} value={era.era_id}>{era.era}</option>)}
                        <option value='era' disabled>Choose Era</option>
                    </select>
                    <select defaultValue='key' onClick={this.getKeys} onChange={(e) => this.setState({redirect: `/key/${e.target.value}`})}>
                        {this.state.keys.map(key => <option key={key.key_id} value={key.key_id}>{key.key_signature}</option>)}
                        <option value='key' disabled>Choose Key Signature</option>
                    </select>
                    <select defaultValue='composer' onClick={this.getComposers} onChange={(e) => this.setState({redirect: `/composer/${e.target.value}`})}>
                        {this.state.composers.map(composer => <option key={composer.composer_id} value={composer.composer_id}>{composer.composer_name}</option>)}
                        <option value='composer' disabled>Composers</option>
                    </select>
                </div>

                <div className='text-start fw-bold mt-4 pt-4'>
                    <button onClick={this.handleAdd} className='btn btn-outline-dark w-100'>Contribute Your Knowledge!</button>   
                </div>
            
            </>
            
        )
    }
}
