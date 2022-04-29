// will HAVE A BUILT IN EDIT FEATURE
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ComposerCard from '../cards/ComposerCard'



export default function SingleComposer(props) {
    const location = useLocation()
    const { composerId } = useParams()
    const [era, setEra] = useState([]) // grab the list of eras from era
    const [ composer, setComposer ] = useState({})
    const [chosen, setChosen] = useState(composer.era_id)
    const [editMode, setEditMode] = useState(false)
    
    // const { era1 } = location.state


    useEffect( () => {
        fetch(`${props.apiBaseUrl}/api/eras`)
            .then(res => res.json())
            .then(eras => setEra(eras))
    }, [])

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/composer/${composerId}`)
            .then(res=>res.json())
            .then(data => setComposer(data))
    }, [composerId])

    // to control the edit drop down menu

    const handleSubmit = (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        let myToken = localStorage.getItem('token');
        myHeaders.append('Authorization', `Bearer ${myToken}`);
        myHeaders.append('Content-Type', 'application/json');

        let composer_name = e.target.composer.value;
        let era_id = chosen;
        let image_url = null; // Implement this later
        let more_info = e.target.more_info.value;
        console.log(era_id)
    
        let data = JSON.stringify({composer_name, era_id, image_url, more_info})

            fetch(`${props.apiBaseUrl}/api/composer/update/${composerId}`, {
                method: 'PUT',
                headers: myHeaders,
                body: data
            }).then(res => res.json())
                    .then(data=>{
                        if (data.error){
                            props.flashMessage(data.error, 'warning')
                        }else{
                            setComposer(data)
                            setEditMode(false)
                            props.flashMessage(`You have successfully edited ${data.composer_name}`, 'success')

                        }
                    })
                }
    return (
        <>
        <h1 className='text-primary text-center'>Composer Information</h1>
        {/* fix era display with LINK tag pass states */}
        <ComposerCard key={composer.composer_id} composer={composer} era={composer.era_id}/>
        {/* Edit Form for COMPOSER */}
        <div className='d-flex justify-content-center'>
        <button className='btn btn-outline-dark w-100' onClick={() => setEditMode(!editMode)}>Toggle Composer Edit Form</button>
        </div>
        {editMode ? (
            <form onSubmit={handleSubmit}>
                <h3 className='text-center mt-3'>Know Something Not Displayed?</h3>
                <h5>Please try your best to keep the information accurate!</h5>
                <div className='form-group'>
                    <label htmlFor='composer'>Composer Name</label>
                <input type='text' name='composer' className='form-control' defaultValue={composer.composer_name} />

                    {/* Select Drop Down here for era */}
                    
                    <select defaultValue={composer.era_id} className='w-100' onChange={(e)=>setChosen(e.target.value)}>
                    {era.map(era => <option key={era.era_id} value={era.era_id}>{era.era}</option>)}
                    <option value='default' disabled></option>
                     </select>

                    <label htmlFor='Image'>Image url</label>
                    <input type='text' name='Image' className='form-control' placeholder={composer.image_url} disabled />

                    <label htmlFor='more_info'>Extra Info?</label>
                    <input type='text' name='more_info' className='form-control' defaultValue={composer.more_info} />

                    <input type='submit' className='btn btn-outline-dark w-100 p-3' value='Edit Composer' />
                </div>
            </form>
        ): null}
        </>
    )
}









