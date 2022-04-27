import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ComposerCard(props) {
    const composer = props.composer

    // To Find the Era based off composer.era
    // useEffect(()=>{
    //     fetch(`{props.apiBaseUrl}/api/era/${eraId}`)
    //         .then(res=>res.json())
    //         .then(data => setEra(data))
    // }, [eraId])


    return (
      <div className="card">
          <div className="card-body">
              <Link to={`/composer/${composer.composer_id}`}>
              <h5 className="card-title text-dark">{composer.composer_name}</h5>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">Era: {composer.era} </h6>
              <p>{composer.more_info}</p>
              <hr></hr>
              {/* How to display songs just for this composer? */}
              <Link to={`/composer/${composer.composer_id}`}>
              <p className="card-text">Songs: Click Me!</p>
              </Link>
              
          </div>
      </div>
    )
  }
