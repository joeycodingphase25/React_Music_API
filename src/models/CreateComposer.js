import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function CreateComposer(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    // handles era dropdown
    const [era, setEra] = useState([]) // grab the list of eras from era

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

        let composer_name = e.target.composer_name.value;
        let era = document.getElementById("eras").value;
        let image_url = null; // Implement this later
        let more_info = e.target.more_info.value;

        let data = JSON.stringify({composer_name, era, image_url, more_info})

        fetch('http://127.0.0.1:5000/api/composer/create', {
            method: "POST",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                }else {
                    props.flashMessage(`The post ${data.composer_name} has been created`, 'success')
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
                <label htmlFor='era'>Choose the Composers Era</label>
                <select id='eras'>
                        {era.map(era => <option value={era.id}>{era.era}</option>)}
                        <option selected value='' disabled>Choose Era</option>
                </select>

                <label htmlFor='Image'>Image url</label>
                <input type='text' name='Image' className='form-control' placeholder='Image Feature will be implemented later' disabled />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />
                <input type='submit' className='btn btn-outline-dark w-100' value='Create Composer' />
            </div>
        </form>
        <div className='text-center mt-3'>
            The Example Card Era will go here. After creation will be directed to view single era
        </div>

        <div className='text-center mt-3'>
            <h3>Question or Concern?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
    )
}
