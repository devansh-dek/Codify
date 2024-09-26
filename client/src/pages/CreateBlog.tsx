import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from '../recoil/atoms/userState';

function CreateBlog() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formValue = {
                title, description, user: user.username
            };
            console.log("form value is ", formValue);
            const response = await axios.post('http://localhost:3000/api/v1/blogs', formValue);
            console.log(response, "Is our response");

            navigate('/blogs');

            console.log(response.data);
        } catch (error: any) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }

    }

    return (
        <div className='min-h-screen bg-slate-100 flex items-center justify-center'>
            <div className='bg-white p-2 w-full max-w-lg h-full max-h-lg '>
                <h1 className='font-bold text-4xl text-center'>Create a new blog</h1>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <label className='font-semibold block text-2xl text-center m-2' htmlFor="title">Title</label>
                        <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue m-2' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Blog Title' />

                    </div>
                    <div>
                        <label className='font-semibold block text-2xl text-center m-2' htmlFor="Description">Description</label>
                        <input className='w-full p-3 border h-32 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue m-2' type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Blog description' />

                    </div>
                    <button type="submit" className='border border-black w-full  rounded-md m-2'>Create Blog</button>
                </form>

            </div>



        </div>
    )
}

export default CreateBlog