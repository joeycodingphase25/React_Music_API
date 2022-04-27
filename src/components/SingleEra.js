import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EraCard from './EraCard'


export default function SingleEra(props) {
    const { eraId } = useParams()
    const [ era, setEra ] = useState([])
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/api/era/${eraId}`)
            .then(res=>res.json())
            .then(data => setEra(data))
    }, [eraId])

    // const handleEditSubmit = (e) => {
    //     e.preventDefault()

    //     if (!props.loggedIn){
    //         props.flashMessage('You must be logged in to edit an era', 'danger')
    //         navigate('/login')
    //     }

    //     let myHeaders = new Headers();
    //     let myToken = localStorage.getItem('token')
    //     myHeaders.append('Authorization', `Bearer ${myToken}`)
    //     myHeaders.append('Content-Type', 'application/json')


    //     let title = e.target.title.value;
    //     let body = e.target.body.value;

    //     let data = JSON.stringify({title, body})

    //     fetch(`http://127.0.0.1:5000/api/edit-posts/${postId}`, {
    //         method: 'PUT',
    //         headers: myHeaders,
    //         body: data
    //     }).then(res => res.json())
    //             .then(data=>{
    //                 if (data.error){
    //                     props.flashMessage(data.error, 'warning')
    //                 }else{
    //                     setPost(data)
    //                     setEditMode(false)
    //                     props.flashMessage(`${data.title}You have successfully edited your post`, 'success')

    //                 }
    //             })
    // }


    return (
        <>
        <EraCard era={era} />
        {/* PUT COMPOSERS CARDS HERE */}
        </>
    )
}
// when finished, add the COMPOSER CARDS in this display