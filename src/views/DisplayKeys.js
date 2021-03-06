// display all songs, maybe a drop down to search by nameimport React from 'react'

import KeyCard from '../cards/KeyCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayKeys(props) {
    const [ keys, setKeys ] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/key-signatures`)
            .then(res=>res.json())
            .then(data => setKeys(data))
    }, [])

  return (
      <>
        <h1>List of All keys:</h1>
        {keys.map(key_sig=><KeyCard key_sig={key_sig} key={key_sig.key_id} />)}
      </>
  )
}
