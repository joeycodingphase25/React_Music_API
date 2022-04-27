// display all compsoers, maybe put a drop down to sort by name or something

import React from 'react'
import ComposerCard from '../cards/ComposerCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayComposers(props) {
    const [ composers, setComposers ] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/composers`)
            .then(res=>res.json())
            .then(data => setComposers(data))
    }, [])

  return (
      <>
        {composers.map(composer =><ComposerCard composer={composer} key={composer.composer_id} />)}
      </>
  )
}































