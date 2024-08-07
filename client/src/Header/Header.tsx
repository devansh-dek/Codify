import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '../recoil/atoms/userState'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface User {
  userId: any;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

const Header: React.FC = () => {

  const navigate = useNavigate();
  const user = useRecoilValue(userState) as User; // Type assertion to User
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/isAuthenticated', { withCredentials: true });
        console.log("fetchuser response is ", response);
        setUser({
          userId: response.data.response.id,
          username: response.data.response.username,
          email: response.data.response.email,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, [setUser]);
  const ClickedLogin = async () => {
    console.log("CLICKED");
    if (user.isAuthenticated) navigate('/profile');
    else navigate('/Login')
  }
  console.log('user is ', user);
  return (
    <header className='bg-gray-900 p-4 shadow-md'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='m-1 p-1 font-bold text-3xl text-white md:text-4xl'>
          Codify
        </h1>
        <Navbar />
        <h1 className='text-xl font-bold text-white md:text-2xl mt-4 md:mt-0' onClick={ClickedLogin}>
          {user.isAuthenticated ? user.username : "LOGIN"}
        </h1>
      </div>
    </header>
  );
}

export default Header;
