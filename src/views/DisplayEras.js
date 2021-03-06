// this function is responsible for displaying the eras in a format
// the goal is to make this a reusable component in the EDIT ERA and VIEW ERA
import React from 'react'
import EraCard from '../cards/EraCard'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayEras(props) {
    const [ eras, setEras ] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/eras`)
            .then(res=>res.json())
            .then(data => setEras(data))
    }, [])

  return (
      <>
        <h1>List of All Eras:</h1>
        {eras.map(era =><EraCard era={era} key={era.era_id} />)}
      </>
  )
}

