// for keys to be diplayed on, and to pass upwards

import React from 'react'
import { Link } from 'react-router-dom'

export default function KeyCard(props) {
    const key_sig = props.key_sig
    return (
      <div className="card">
          <div className="card-body">
              <Link to={`/key/${key_sig.key_id}`}>
              <h5 className="card-title text-dark">{key_sig.key_signature}</h5>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">Keys In Signature: {key_sig.keys} </h6>
              <p>{key_sig.body}</p>
              <hr></hr>
              <p className="card-text">More Info: {key_sig.more_info}</p>
          </div>
      </div>
    )
  }
