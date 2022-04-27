import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function CreateComposer(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    // handles era dropdown
    const [era, setEra] = useState([]) // grab the list of eras from era
    const [chosen, setChosen] = useState(0)

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create an Era', 'danger')
            navigate('/login')
        }
    }, [loggedIn, flashMessage, navigate])

    useEffect( () => {
        fetch('http://127.0.0.1:5000/api/eras')
            .then(res => res.json())
            .then(eras => setEra(eras))
    }, [])


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
        console.log(chosen)
        let data = JSON.stringify({composer_name, era_id, image_url, more_info})
        
        fetch('http://127.0.0.1:5000/api/composer/create', {
            method: "POST",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                }else {
                    props.flashMessage(`The Composer ${data.composer_name} has been created`, 'success')
                    navigate('/composers')
                }
            })

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mt-3'>Create New Composers</h3>
            <h5>Please try your best to keep the information accurate!</h5>
            <div className='form-group'>
                <label htmlFor='composer'>Composer Name</label>
                <input type='text' name='composer' className='form-control' placeholder='Enter Composer Name' />

                {/* Select Drop Down here for era */}
                
                <select defaultValue='default' className='w-100'onChange={(e)=>setChosen(e.target.value)}>
                {era.map(era => <option key={era.era_id} value={era.era_id}>{era.era}</option>)}
                    <option value='default' disabled>Choose Era</option>
                </select>

                <label htmlFor='Image'>Image url</label>
                <input type='text' name='Image' className='form-control' placeholder='Image Feature will be implemented later' disabled />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />

                <input type='submit' className='btn btn-outline-dark w-100 p-3' value='Create Composer' />
            </div>
        </form>
        <div className='text-center mt-3'>
            The Example Card Composer will go here. After creation will be directed to view single Composer
        </div>
        <hr></hr>
        <div className='text-center mt-3'>
            <h3>Question or Request?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
    )
}
