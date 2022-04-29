import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SongCard from './SongCard'

export default function ComposerCard(props) {
    const composer = props.composer
    const [songMode, setSongMode] = useState(false)
    const name = props.name
    const era = props.era
    const composer_id = `/composer/${composer.composer_id}`
    return (
      <>
      <div className="card mt-3">
          <div className="card-body">
              <Link to={{
                pathname: composer_id,
                state: {
                  era1: era
                }
              }}><h5 className="card-title text-dark">{composer.composer_name}</h5>
              
              </Link>
              {/* <Link to={`/composer/${composer.composer_id}`} era1={era}>
              <h5 className="card-title text-dark">{composer.composer_name}</h5>
              </Link> */}
              <h6 className="card-subtitle mb-2 text-muted">{era} Era</h6>
              <p>{composer.more_info}</p>
              <hr></hr>
              {/* How to display songs just for this composer? */}
              <button onClick={() => setSongMode(!songMode)} className="btn btn-outline-dark w-100 m-0 p-3">View Composers Songs!</button>
              {songMode ? (
              <div className='row'>
                {composer.songs.map(song => <SongCard key={song.id} song={song} name={name}/>)}
              </div>) : null}
          </div>
      </div>
        <div>
          
        </div>

      </>
    )
  }
