import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EraCard from '../cards/EraCard'


export default function SingleEra(props) {
    const { eraId } = useParams()
    const [ era, setEra ] = useState([])


    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/era/${eraId}`)
            .then(res=>res.json())
            .then(data => setEra(data))
    }, [eraId])

    return (
        <>
        <EraCard era={era} />
        {/* PUT COMPOSERS CARDS HERE and fetch, hook the composer all API to map  */}
        </>
    )
}
// when finished, add the COMPOSER CARDS in this display