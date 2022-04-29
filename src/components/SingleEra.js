import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComposerCard from '../cards/ComposerCard'
import EraCard from '../cards/EraCard'


export default function SingleEra(props) {
    const { eraId } = useParams()
    const [ era, setEra ] = useState([])
    // Had to use hook to avoid error here
    const [ composers, setComposers] = useState([])


    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/era/${eraId}`)
            .then(res=>res.json())
            .then(data => setEra(data))
    }, [eraId])
    
    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/era/${eraId}`)
            .then(res=>res.json())
            .then(data => setComposers(data.composers))
    }, [eraId])

    return (
        <>
        <h1 className='text-primary text-center'>Era Information</h1>
        <EraCard era={era} />
        {/* PUT COMPOSERS CARDS HERE and fetch, hook the composer all API to map  */}
        <h1 className='text-center text-dark mt-3'>Composers of This Era</h1>
        {composers.map(composer =><ComposerCard composer={composer} key={composer.composer_id} name={composer.composer_name}/>)}
        </>
    )
}
// when finished, add the COMPOSER CARDS in this display