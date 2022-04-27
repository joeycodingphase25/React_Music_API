// This is for ease of udating my own database
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function CreateEra(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create a post', 'danger')
            navigate('/login')
        }
    }, [loggedIn, flashMessage, navigate])


    const handleSubmit = (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        let myToken = localStorage.getItem('token');
        myHeaders.append('Authorization', `Bearer ${myToken}`);
        myHeaders.append('Content-Type', 'application/json');

        let key_signature = e.target.key_signature.value;
        let keys = e.target.keys.value;
        let about = e.target.about.value;
        let more_info = e.target.more_info.value;

        let data = JSON.stringify({key_signature, keys, about, more_info})

        fetch(`${props.apiBaseUrl}/api/key-signature/create`, {
            method: "POST",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    // props.flashMessage(`An entry error has occured, please review and try again`, 'danger')
                    console.error(data.error)
                }else {
                    props.flashMessage(`The Key Signature ${data.key_signature} has been created`, 'success')
                    navigate('/keys')
                }
            })

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mt-3'>Create New Key Signatures!</h3>
            <h5>Please try your best to keep the information accurate!</h5>
            <div className='form-group'>
                <label htmlFor='key_signature'>Key Signature Name</label>
                <input type='text' name='key_signature' className='form-control' placeholder='Enter Key Signature Name' />

                <label htmlFor='keys'>Keys</label>
                <input type='text' name='keys' className='form-control' placeholder='E Major Format Example (e, f-sharp, g-sharp, a, b, c-sharp, d-sharp, e)' />

                <label htmlFor='about'>About</label>
                <input type='text' name='about' className='form-control' placeholder='Enter Key signature facts, creation, uses, etc' />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />
                <input type='submit' className='btn btn-outline-dark w-100 p-3' value='Create Key Signature' />
            </div>
        </form>
        <div className='text-center mt-3'>
            The Example Card Key will go here. After creation will be directed to view single Key
        </div>
        <hr></hr>
        <div className='text-center mt-3'>
            <h3>Question or Request?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
        

    )
}