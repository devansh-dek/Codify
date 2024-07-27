import React from 'react'
import { useRecoilValue } from 'recoil';
import userState from '../recoil/atoms/userState'; // Adjust path as needed

interface User {
    userId: any;
    username: string;
    email: string;
    isAuthenticated: boolean;
}
function Profile() {
    const user = useRecoilValue(userState);
    if (!user.isAuthenticated) {
        return <div className='font-bold w-full h-full justify-center items-center'>
            USER NOT LOGGED IN!
        </div>
    }

    return (
        <div>
            <div className='bg-slate-500 min-w-100 max-w-120 min-h-90 max-h-100 m-3 p-4'>
                <h1 className='font-bold text-4xl' > USERNAME :  {user.username}</h1>
                <h1 className='font-bold text-2xl'>EMAIL : {user.email}</h1>

            </div>

        </div>
    )
}

export default Profile;