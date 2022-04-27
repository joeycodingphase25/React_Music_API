// this function is responsible for displaying the eras in a format
// the goal is to make this a reusable component in the EDIT ERA and VIEW ERA
import React from 'react'
import EraCard from '../components/EraCard'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayEras(props) {
    const [ eras, setEras ] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/api/eras`)
            .then(res=>res.json())
            .then(data => setEras(data))
    }, [])

  return (
      <>
        {eras.map(era =><EraCard era={era} key={era.era_id} />)}
      </>
  )
}

