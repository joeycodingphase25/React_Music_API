import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KeyCard from '../cards/KeyCard'


export default function SingleKey(props) {
    const { keyId } = useParams()
    const [ key_sig, setKey_sig ] = useState([])
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/key/${keyId}`)
            .then(res=>res.json())
            .then(data => setKey_sig(data))
    }, [keyId])


    return (
        <>
        <KeyCard key_sig={key_sig} />
        {/* PUT SONG CARDS HERE */}
        </>
    )
}





















// when finished, add the COMPOSER CARDS in this display