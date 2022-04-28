import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ComposerCard(props) {
    const composer = props.composer
    // const [ era, setEra] = useState()

    // // To Find the Era based off composer.era
    // useEffect(()=>{
    //     fetch(`{props.apiBaseUrl}/api/era/${composer.era_id}`)
    //         .then(res=>res.json())
    //         .then(data => setEra(data))
    // }, [composer.era_id])


    return (
      <div className="card">
          <div className="card-body">
              <Link to={`/composer/${composer.composer_id}`}>
              <h5 className="card-title text-dark">{composer.composer_name}</h5>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">Era: Work in Progress! Era #{composer.era_id} </h6>
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
