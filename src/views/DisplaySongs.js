
/// FORMAT LIKE THIS

// TABLE STYLE 4 rows and EACH SONG HYPER LINKED
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongCard from '../cards/SongCard';

export default function DisplaySongs(props) {
    const [composers, setComposers ] = useState([]);
    
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/composers`)
            .then(res=>res.json())
            .then(data => setComposers(data))
    }, [])

  return (
      <>
        <h1>List of All Songs:</h1>
        <div className='row'> 
            {composers.map(composer => composer.songs.map(song=><SongCard song={song} key={song.song_id} name={composer.composer_name} />))}

            {/* {songs.map(song=><SongCard song={song} key={song.song_id} />)}  THIS CODE IS A RELIC*/}
        </div>
      </>
  )
}










// ALSO INCLUDE A SEARCH BAR, AND A DROP DOWN BY (title name, time period, and difficulty)