import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import userState from '../recoil/atoms/userState';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formValue = {
                username,
                email,
                password,
            };
            console.log("form value is ", formValue);
            const response = await axios.post('http://localhost:3000/api/v1/login', formValue, { withCredentials: true });
            console.log(response, "Is our response");

            if (response.data.exist === false) {
                console.log("User doesn't exist");
                return;
            }

            if (response.data.success === true) {
                console.log("Came HERE");
                const userLogged = {
                    userId: response.data.response.id,
                    username: response.data.response.username,
                    email: response.data.response.email,
                    isAuthenticated: true
                }
                console.log("User logged are ", userLogged);
                setUser(userLogged);
                navigate('/blogs');

                // Handle redirection or other actions on successful login
            }

            console.log(response.data);
        } catch (error: any) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r px-4">
            <div className="relative w-full max-w-md p-8 bg-gray-600 rounded-xl shadow-2xl md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <form onSubmit={handleSubmit} className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Login</h2>
                    <div className="mb-6">
                        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <FaUserAlt className="mr-2 text-teal-400" /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-4 border border-transparent rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <FaUserAlt className="mr-2 text-teal-400" /> Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="p-4 border border-transparent rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <FaLock className="mr-2 text-teal-400" /> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-4 border border-transparent rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                <div className='p-2 m-2 flex justify-center'>Dont have a account ,
                    <Link to="/register" className='font-bold'>
                        Register!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
