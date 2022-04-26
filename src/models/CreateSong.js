// This is a tricky model
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function CreateEra(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;
    // hooks for handling COMPOSER, DIFFICULTY and KEY_SIG
    const [composer, setComposer] = useState('')
    const [difficulty, setDifficulty] = useState(null)
    const [key, setKey] = useState('')

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
        // COMPOSER_NAME IS A DROP DOWN ** NEED A FETCH FOR THAT
        // DIFFICULTY IS A DROP DOWN
        // 
        let composer_name = e.target.composer_name.value; 
        let difficulty = e.target.difficulty.value;
        let key_signature = e.target.key_signature.value;
        let more_info = e.target.more_info.value;
        let song_info = e.target.msong_info.value;
        let song_link = e.target.song_link.value;
        let song_name = e.target.song_name.value;

        let data = JSON.stringify({key_signature, keys, about, more_info})

        fetch('http://127.0.0.1:5000/api/song/create', {
            method: "Put",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                }else {
                    props.flashMessage(`The post ${data.key_signature} has been Edited`, 'success')
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
                <label htmlFor='composer_name'>Composer Name</label>
                <input type='text' name='key_signature' className='form-control' placeholder='Enter Key Signature Name' />

                <label htmlFor='keys'>Keys</label>
                <input type='text' name='keys' className='form-control' placeholder='format (e, f-sharp, g-sharp, etc)' />

                <label htmlFor='about'>About</label>
                <input type='text' name='about' className='form-control' placeholder='Enter Key signature facts, creation, uses, etc' />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />
                <input type='submit' className='btn btn-outline-dark w-100' value='Create Key Signature' />
            </div>
        </form>
        <div className='text-center mt-3'>
            The Example Card Song will go here. After creation will be directed to view single Song
        </div>

        <div className='text-center mt-3'>
            <h3>Question or Requests?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
        

    )
}