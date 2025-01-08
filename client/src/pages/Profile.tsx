import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import userState from '../recoil/atoms/userState';
import { Button } from '../components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Heatmap from './Heatmap.tsx';
interface User {
    userId: any;
    username: string;
    email: string;
    isAuthenticated: boolean;
}
interface Submission {
    id: number;
    userId: number,
    problemId: number,
    type: string,
    code: string,
    status: string,
    verdict: null,
    createdAt: string
}
function Profile() {
    const user = useRecoilValue(userState);
    const [submissions, setSubmissions] = useState<Submission[]>();

    useEffect(() => {
        const fetchSubmission = async () => {
            console.log("USer is ", user);
            const fetchSubmissions = await axios.get(`http://localhost:3000/api/v1/submission/2`);
            console.log("fetchsubmisions is ", fetchSubmissions);
            setSubmissions(fetchSubmissions.data.submissions);
        }
        if (!user.isAuthenticated) {
            console.log("user notauthenticated")
        }
        else {
            fetchSubmission();
        }

    }, [user])
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    }
    if (!user.isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50 p-10">
                <img
                    src="/login.png"
                    alt="Login required"
                    onClick={handleLoginClick}
                    className="w-32 h-32 mb-6 transition-transform duration-300 hover:scale-110"
                />
                <h1 className="text-4xl font-extrabold text-red-700 tracking-wider uppercase text-center mb-4">
                    User not logged in!
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    Please login to continue accessing the platform.
                </p>
            </div>
        );

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
                <h1 className='font-bold m-2 text-2xl'>Questions solved: 0</h1>
                <button className='border m-2 p-2 border-black' onClick={handleOnClick}>CREATE A BLOG</button>
            </div>
            <div className='flex flex-row'>
                <div className='min-w-200 border border-slate-900 m-3 w-150'>
                    <h1 className='p-2 m-2 text-3xl font-bold '>Submissions</h1>
                    <div className='p-2 m-2 h-64 overflow-y-auto rounded-md border border-slate-900'>

                        {/* //submissions all */}
                        {
                            submissions?.map((submission) => (
                                <div className='flex flex-row w-full justify-between'>
                                    <div className='m-1 border border-slate-400' >{submission.problemId}</div>
                                    <div className='m-1 border border-slate-400' >{submission.status}</div>
                                    <div className='m-1 border border-slate-400' >{submission.verdict}</div>
                                    <div className='m-1 border border-slate-400' >{submission.createdAt}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div>
                    <Heatmap userId={user.userId} />
                </div>


            </div>

        </div>
    )
}

export default Profile;