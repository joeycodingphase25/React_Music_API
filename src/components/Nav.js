import React from 'react'
import { Link } from 'react-router-dom'



export default function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="\">MusicAPI</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="\navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                <Link className="nav-link active" aria-current="page" to="/eras">Eras</Link>
                <Link className="nav-link active" aria-current="page" to="/keys">Key-Signatures</Link>
                <Link className="nav-link active" aria-current="page" to="/composers">Composers</Link>
                <Link className="nav-link active" aria-current="page" to="/create-era">Create-Era</Link>
                <Link className="nav-link active" aria-current="page" to="/create-key">Create-Key</Link>
                <Link className="nav-link active" aria-current="page" to="/create-composer">Create-Composer</Link>
                <Link className="nav-link active" aria-current="page" to="/create-song">Create-Song</Link>
                { props.loggedIn ? (<><Link className="nav-link active" aria-current="page" to="/" onClick={props.logUserOut}>Logout</Link></>) : (
                  <>
                  <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                  </>
                )}
            </div>
            </div>
        </div>
    </nav>
  )
}
