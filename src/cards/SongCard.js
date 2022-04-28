// for songs to display nicely
import React from 'react'
import { Link } from 'react-router-dom'
// ADD COMPOSER TRICKERY
export default function SongCard(props) {
    const song = props.song
    return (
        <>
      {/* <div className="card">
          <div className="card-body">
              <Link to={`/song/${song.song_id}`}>
              <h5 className="card-title text-dark">Song - {song.song_name}</h5>
              </Link>
              <p>Info: {song.song_info}</p>
              <p>Composer Name: *workinprogress -- Composer #{song.composer_id}</p>
              <hr></hr>
              <h6 className="card-subtitle mb-2 text-muted">Link To a Video: <a href={song.song_link}>{song.song_link ? song.song_link : 'Not Yet Added'}</a> </h6>
              <p className="card-text">More Info: {song.more_info}</p>
          </div>
      </div> */}
        {/* practce card */}
        {/* Put Songs To be diaplayed here, this way in display all composers it will have song drop down */}
        
            <div className="col-sm-4 mt-3">
                <div className="card" style={{width: '20em'}}>
                    <div className="card-block">
                        <Link to={`/song/${song.song_id}`}>
                            <h5 className="card-title text-dark">{song.song_name}</h5></Link>
                            <Link to={`/composer/${song.composer_id}`}>
                                <h5>{song.composer_id}</h5>
                            </Link>
                        <p className="card-text">
                            Song Info: {song.song_info}
                        </p><hr></hr>
                        <p>extra info: {song.more_info}</p>
                        <h6 className="card-subtitle mb-2 text-muted">Link To a Video: <a href={song.song_link}>{song.song_link ? song.song_link : 'Not Yet Added'}</a> </h6>
                        {props.loggedIn ? (

                            <Link to={`/song/${song.song_id}`}>
                        <button className="btn btn-outline-dark w-100">
                            Edit this Song?
                        </button></Link>
                            ): null}
                    </div>
                </div>
            </div>
        

          {/* song card end */}
        
        
        
        </>
    )
  }
