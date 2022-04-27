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
            <h3 className='text-center mt-3'>Create New Songs</h3>
            <h5>Please try your best to keep the information accurate!</h5>
            <div className='form-group'>
                <label htmlFor='composer'>Composer Name</label>
                <input type='text' name='composer' className='form-control' placeholder='Enter Composer Name' />

                {/* Select Drop Down here for era */}
                <label id='era' htmlFor='era'>Choose the Composers Era</label>
                <select onChange={(e)=>setChosen(e.target.value)}>
                {era.map(era => <option key={era.era_id} value={era.era_id}>{era.era}</option>)}
                    <option selected value='' disabled>Choose Era</option>
                </select>

                <label htmlFor='Image'>Image url</label>
                <input type='text' name='Image' className='form-control' placeholder='Image Feature will be implemented later' disabled />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />

                <input type='submit' className='btn btn-outline-dark w-100 p-3' value='Create Composer' />
            </div>
        </form>
        <div className='text-center mt-3'>
            The Example Card Era will go here. After creation will be directed to view single era
        </div>

        <div className='text-center mt-3'>
            <h3>Question or Request?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
        

    )
}