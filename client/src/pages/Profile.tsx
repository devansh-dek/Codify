import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import userState from '../recoil/atoms/userState';
import { Button } from '../components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
    userId: any;
    username: string;
    email: string;
    isAuthenticated: boolean;
}
function Profile() {
    const user = useRecoilValue(userState);
    useEffect(async () => {
        const fetchSubmissions = await axios.get(`http://localhost:3000/api/v1/submissions`);

    }, [])
    const navigate = useNavigate();
    if (!user.isAuthenticated) {
        return <div className='font-bold w-full h-full justify-center items-center'>
            USER NOT LOGGED IN!
        </div>
    }
    const handleOnClick = (e: any) => {
        try {
            e.preventDefault();

            navigate('/createblog');
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <div className=' min-w-100 max-w-120 min-h-90 border  border-slate-950  max-h-100 m-3 p-4'>
                <h1 className='font-bold m-2 text-4xl' > USERNAME :  {user.username}</h1>
                <h1 className='font-bold m-2 text-2xl'>EMAIL : {user.email}</h1>
                <h1 className='font-bold m-2 text-2xl'>Question solved: 0</h1>
                <button className='border m-2 p-2 border-black' onClick={handleOnClick}>CREATE A BLOG</button>
            </div>
            <div className='min-w-100 border border-slate-900'>
                <h1 className='p-2 m-2 text-3xl font-bold '>Submissions</h1>
                {/* //submissions all */}


            </div>

        </div>
    )
}

export default Profile;