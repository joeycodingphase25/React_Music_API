// WILL BECOME EDIT ERA, THIS IS FOR ME ONLY
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

        let era = e.target.era.value;
        let about_era = e.target.about_era.value;
        let date = e.target.date.value;
        let more_info = e.target.more_info.value;

        let data = JSON.stringify({era, about_era, date, more_info})

        fetch('http://127.0.0.1:5000/api/era/create', {
            method: "POST",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                }else {
                    props.flashMessage(`The post ${data.era} has been created`, 'success')
                    navigate('/eras')
                }
            })

    }
    return (
        <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Create New Eras</h3>
            <div className='form-group'>
                <label htmlFor='era'>Era Name</label>
                <input type='text' name='era' className='form-control' placeholder='Enter Era Name' />
                <label htmlFor='about_era'>About the Era</label>
                <input type='text' name='about_era' className='form-control' placeholder='Enter Era instruments, common practices, etc.' />
                <label htmlFor='date'>Era Time-Line</label>
                <input type='text' name='date' className='form-control' placeholder='Enter Era instruments, common practices, etc.' />
                <label htmlFor='more_info'>Extra Info?</label>
                <input type='text' name='more_info' className='form-control' placeholder='Enter Some Facts/or myths that are fun! verified or not' />
                <input type='submit' className='btn btn-outline-dark w-100' value='Create Era' />
            </div>
        </form>
    )
}
