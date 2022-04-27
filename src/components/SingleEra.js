import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EraCard from '../cards/EraCard'


export default function SingleEra(props) {
    const { eraId } = useParams()
    const [ era, setEra ] = useState([])
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/era/${eraId}`)
            .then(res=>res.json())
            .then(data => setEra(data))
    }, [eraId])

    return (
        <>
        <EraCard era={era} />
        {/* PUT COMPOSERS CARDS HERE */}
        </>
    )
}
// when finished, add the COMPOSER CARDS in this display