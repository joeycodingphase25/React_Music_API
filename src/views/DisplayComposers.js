// display all compsoers, maybe put a drop down to sort by name or something

import React from 'react'
import ComposerCard from '../cards/ComposerCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayComposers(props) {
    const [era, setEra] = useState([])
    // path this era somehow
    

    // console.log(composers)
    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/eras`)
            .then(res=>res.json())
            .then(data => setEra(data))

    }, [])

  return (
      <>
        <h1>List of All Composers:</h1>
        {/* map the eras */}
        {era.map(era => era.composers.map(composer =><ComposerCard composer={composer} key={composer.composer_id} name={composer.composer_name} era={era.era}/>))}
        {/* {composers.map(composer =><ComposerCard composer={composer} key={composer.composer_id} name={composer.composer_name}/>)} */}
      </>
  )
}































