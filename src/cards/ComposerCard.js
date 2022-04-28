import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SongCard from './SongCard'

export default function ComposerCard(props) {
    const composer = props.composer
    const [songMode, setSongMode] = useState(false)

    return (
      <>
      <div className="card mt-3">
          <div className="card-body">
              <Link to={`/composer/${composer.composer_id}`}>
              <h5 className="card-title text-dark">{composer.composer_name}</h5>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">Era: Work in Progress! Era #{composer.era_id} </h6>
              <p>{composer.more_info}</p>
              <hr></hr>
              {/* How to display songs just for this composer? */}
              <button onClick={() => setSongMode(!songMode)} className="btn btn-outline-dark w-100 m-0 p-3">Song Preview!</button>
              {songMode ? (
              <div className='row'>
                {composer.songs.map(song => <SongCard key={song.id} song={song}/>)}
              </div>) : null}
          </div>
      </div>
        <div>
          
        </div>

      </>
    )
  }
