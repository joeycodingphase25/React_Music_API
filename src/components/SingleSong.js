// Put a card that holds song information to populate on a view page
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SongCard from '../cards/SongCard'
import { useNavigate as navigate } from 'react-router-dom';

export default function SingleSong(props) {
    const { songId } = useParams()
    const [ song, setSong ] = useState([])
    
    // hooks for handling COMPOSER, DIFFICULTY and KEY_SIG
    const [composers, setComposers] = useState([])
    const [chosenComp, setChosenComp] = useState('')
    const [difficulty, setDifficulty] = useState([1,2,3,4,5,6,7,8,9,10])
    const [chosenDifficulty, setChosenDifficulty] = useState(null)
    const [keys, setKeys] = useState([])
    const [chosenKey, setChosenKey] = useState('')
    const [editMode, setEditMode] = useState(false)

    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/song/${songId}`)
            .then(res=>res.json())
            .then(data => setSong(data))
    }, [songId])

    // edit features
    // GRAB THE COMPOSER ON DIDMOUNT
    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/composers`)
        .then(res=>res.json())
        .then(data => setComposers(data))
    }, [])
    // GRAB THE KEY_sig ON DIDMOUNT
    useEffect(()=>{
        fetch(`${props.apiBaseUrl}/api/key-signatures`)
            .then(res=>res.json())
            .then(data => setKeys(data))
    }, [])
    // difficulty is hard coded 1-10


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

        fetch(`${props.apiBaseUrl}/api/song/update/${songId}`, {
            method: "PUT",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                }else {
                    props.flashMessage(`The song ${data.song_name} has been Edited`, 'success')
                    navigate('/songs')
                }
            })

    }

    return (
        <>
        <div className='row text-center justify-content-center'>

        <SongCard song={song} />
        </div>
        {/* log in to edit feature */}
        {props.loggedIn ? (
            <div className='d-flex justify-content-center'>
        <button className='btn btn-outline-dark w-100' onClick={() => setEditMode(!editMode)}>Toggle Song Edit Form</button>
        </div>
            ): <div className='text-center'><Link to={'/login'}><button className='btn btn-outline-danger mt-3 text-center w-75'>You Must Have an Account to Edit!</button></Link></div>}
                

        {editMode ? (
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mt-3'>Edit this song!</h3>
            <h5>Please try your best to keep the information accurate!</h5>
            <div className='form-group'>
                
                {/* grab the composer from the api, and then use to hook to change status */}

                <label htmlFor='song_name'>Song Name (Be Sure to Check it's not a duplicate!)</label>
                <input type='text' name='song_name' className='form-control' placeholder='Name of the song (ex. Op 28 No 7, "song name")' />

                <select defaultValue='default' onChange={(e)=>setChosenComp(e.target.value)}>
                {composers.map(composer => <option key={composer.composer_id} value={composer.composer_id}>{composer.composer_name}</option>)}
                    <option value='default' disabled>Composer: {song.composer_id}</option>
                </select>

                
                {/* <label htmlFor='difficulty'>Difficulty</label> */}
                <select defaultValue='default' onChange={(e)=>setChosenDifficulty(e.target.value)}>
                {difficulty.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                    <option value='default' disabled>Difficulty: {song.difficulty ? song.difficulty : 'noValue Yet'}</option>
                </select>

                {/* <label htmlFor='key-sig'>Key Signature</label> */}
                <select defaultValue='default' onChange={(e)=>setChosenKey(e.target.value)}>
                {keys.map(key => <option key={key.key_id} value={key.key_id}>{key.key_signature}</option>)}
                    <option value='default' disabled>Song Key: {song.keysignature_id}</option>
                </select>

                <label htmlFor='song_info'>Song Information</label>
                <input type='text' name='song_info' className='form-control' defaultValue={song.song_info} />

                <label htmlFor='song_link'>Song Link</label>
                <input type='text' name='song_link' className='form-control' defaultValue={song.song_link} />

                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' defaultValue={song.more_info} />

                <input type='submit' className='btn btn-outline-dark w-100 p-3' value='Edit Song' />
            </div>
        </form>) : null}
        <div className='text-center mt-3'>
            <a href='https://www.henle.de/us/about-us/levels-of-difficulty-piano/'>What is the Henle Difficulty</a><br></br>
            The Example Card Song will go here. After creation will be directed to view single song
        </div>
        <hr></hr>
        <div className='text-center mt-3'>
            <h3>Question or Request?</h3><button className="btn btn-outline-danger"onClick={()=>navigate('/email')}>Email Me!</button>
        </div>
        </>
    )
}

