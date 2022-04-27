// will HAVE A BUILT IN EDIT FEATURE
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ComposerCard from '../cards/ComposerCard'


export default function SingleEra(props) {
    const { composerId } = useParams()
    const [ composer, setComposer ] = useState([])
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/composer/${composerId}`)
            .then(res=>res.json())
            .then(data => setComposer(data))
    }, [composerId])

    return (
        <>
        <ComposerCard composer={composer} />
        {/* PUT COMPOSERS CARDS HERE */}
        </>
    )
}






















// Put Composer songs displayed here