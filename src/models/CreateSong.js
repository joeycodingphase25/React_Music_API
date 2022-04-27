// This is a tricky model
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function CreateSong(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;
    // hooks for handling COMPOSER, DIFFICULTY and KEY_SIG
    const [composers, setComposers] = useState([])
    const [chosenComp, setChosenComp] = useState('')
    const [difficulty, setDifficulty] = useState([1,2,3,4,5,6,7,8,9,10])
    const [chosenDifficulty, setChosenDifficulty] = useState(null)
    const [keys, setKeys] = useState([])
    const [chosenKey, setChosenKey] = useState('')

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create a song', 'danger')
            navigate('/login')
        }
    }, [loggedIn, flashMessage, navigate])
    // GRAB THE COMPOSER ON DIDMOUNT
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/api/composers`)
        .then(res=>res.json())
        .then(data => setComposers(data))
    }, [])
    // GRAB THE KEY_sig ON DIDMOUNT
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/api/key-signatures`)
            .then(res=>res.json())
            .then(data => setKeys(data))
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        let myToken = localStorage.getItem('token');
        myHeaders.append('Authorization', `Bearer ${myToken}`);
        myHeaders.append('Content-Type', 'application/json');
        // COMPOSER_NAME IS A DROP DOWN ** NEED A FETCH FOR THAT
        // DIFFICULTY IS A DROP DOWN
        // 
        let composer_id = chosenComp; 
        let difficulty = chosenDifficulty;
        let keysignature_id = chosenKey;
        let more_info = e.target.more_info.value;
        let song_info = e.target.song_info.value;
        let song_link = e.target.song_link.value;
        let song_name = e.target.song_name.value;

        let data = JSON.stringify({composer_id, difficulty, keysignature_id, more_info, song_info, song_link, song_name})

        fetch('http://127.0.0.1:5000/api/song/create', {
            method: "POST",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                }else {
                    props.flashMessage(`The song ${data.song_name} has been Created`, 'success')
                    navigate('/songs')
                }
            })

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mt-3'>Create New Songs</h3>
            <h5>Please try your best to keep the information accurate!</h5>
            <div className='form-group'>
                
                {/* grab the composer from the api, and then use to hook to change status */}

                <label htmlFor='song_name'>Song Name (Be Sure to Check it's not a duplicate!)</label>
                <input type='text' name='song_name' className='form-control' placeholder='Name of the song (ex. Op 28 No 7, "song name")' />

                <select defaultValue='default' onChange={(e)=>setChosenComp(e.target.value)}>
                {composers.map(composer => <option key={composer.composer_id} value={composer.composer_id}>{composer.composer_name}</option>)}
                    <option value='default' disabled>Choose Composer</option>
                </select>

                
                {/* <label htmlFor='difficulty'>Difficulty</label> */}
                <select defaultValue='default' onChange={(e)=>setChosenDifficulty(e.target.value)}>
                {difficulty.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                    <option value='default' disabled>Henle Difficulty</option>
                </select>

                {/* <label htmlFor='key-sig'>Key Signature</label> */}
                <select defaultValue='default' onChange={(e)=>setChosenKey(e.target.value)}>
                {keys.map(key => <option key={key.key_id} value={key.key_id}>{key.key_signature}</option>)}
                    <option value='default' disabled>Choose Key Signature</option>
                </select>

                <label htmlFor='song_info'>Song Information</label>
                <input type='text' name='song_info' className='form-control' placeholder='Put Basic Information on the story of the song' />

                <label htmlFor='song_link'>Song Link</label>
                <input type='text' name='song_link' className='form-control' placeholder='Link Song to YouTube Performance of your choosing' />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />

                <input type='submit' className='btn btn-outline-dark w-100 p-3' value='Create Song' />
            </div>
        </form>
        <div className='text-center mt-3'>
            Add Link To Henle WebSite Here --
            The Example Card Song will go here. After creation will be directed to view single song
        </div>
        <hr></hr>
        <div className='text-center mt-3'>
            <h3>Question or Request?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
        

    )
}