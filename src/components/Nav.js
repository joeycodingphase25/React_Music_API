import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';


export default function Nav(props) {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="\">MusicAPI</a>
            <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
            <div className="navbar-nav">
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/">Home</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/eras">Eras</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/keys">Key-Signatures</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/composers">Composers</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/songs">Songs</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/create-era">Create-Era</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/create-key">Create-Key</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/create-composer">Create-Composer</Link>
                <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/create-song">Create-Song</Link>
                { props.loggedIn ? (<><Link className="nav-link active" aria-current="page" to="/" onClick={props.logUserOut}>Logout</Link></>) : (
                  <>
                  <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/register">Register</Link>
                  <Link className="nav-link active" onClick={handleNavCollapse} aria-current="page" to="/login">Login</Link>
                  </>
                )}
            </div>
            </div>
        </div>
    </nav>
  )
}
