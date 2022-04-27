
/// FORMAT LIKE THIS

// TABLE STYLE 4 rows and EACH SONG HYPER LINKED
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongCard from '../cards/SongCard';

export default function DisplaySongs(props) {
    const [songs, setSongs ] = useState([]);
    
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/songs`)
            .then(res=>res.json())
            .then(data => setSongs(data))
    }, [])

  return (
      <>
        {songs.map(song=><SongCard song={song} key={song.song_id} />)}
      </>
  )
}










// ALSO INCLUDE A SEARCH BAR, AND A DROP DOWN BY (title name, time period, and difficulty)