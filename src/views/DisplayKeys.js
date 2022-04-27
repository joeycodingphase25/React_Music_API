// display all songs, maybe a drop down to search by nameimport React from 'react'
import KeyCard from '../cards/KeyCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayKeys(props) {
    const [ keys, setKeys ] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/api/key-signatures`)
            .then(res=>res.json())
            .then(data => setKeys(data))
    }, [])

  return (
      <>
        {keys.map(key_sig=><KeyCard key_sig={key_sig} key={key_sig.key_id} />)}
      </>
  )
}
