// Put a card that holds song information to populate on a view page
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SongCard from '../cards/SongCard'


export default function SingleSong(props) {
    const { songId } = useParams()
    const [ song, setSong ] = useState([])
    const [editMode, setEditMode] = useState(false)
    

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/song/${songId}`)
            .then(res=>res.json())
            .then(data => setSong(data))
    }, [songId])


    return (
        <>
        <SongCard song={song} />
        {/* PUT SONG CARDS HERE */}
        </>
    )
}

