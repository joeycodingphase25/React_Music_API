import React from 'react'
import { Link } from 'react-router-dom'


export default function EraCard(props) {
    const era = props.era
  return (
    <div className="card">
        <div className="card-body">
            <Link to={`/era/${era.era_id}`}>
            <h5 className="card-title text-dark">{era.era}</h5>
            </Link>
            <h6 className="card-subtitle mb-2 text-muted">Time Period: {era.date} </h6>
            <p>{era.about}</p>
            <hr></hr>
            <p className="card-text">{era.about_era}</p>
        </div>
    </div>
  )
}
