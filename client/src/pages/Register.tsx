import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your registration logic here e.preventDefault();
        try {
            const formValue = {
                username: username,
                email: email,
                password: password,
            }
            console.log("form value is ", formValue);
            const response = await axios.post('http://localhost:3000/api/v1/signup', formValue, { withCredentials: true });
            if (response.exist == false) {
                console.log("Email Doesnt Exist");
            }
            //extract jwt from response.jwt

            console.log(response.data);
        } catch (error: any) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }

        navigate('/blogs');


        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r ">
            <div className="relative w-full max-w-md p-8 bg-gray-600 rounded-xl shadow-2xl">
                <form onSubmit={handleSubmit} className="relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">Register</h2>
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
                            <FaUserAlt className="mr-2 text-teal-400" /> username
                        </label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        Register
                    </button>
                </form>
                <div className='p-2 m-2 flex justify-center'>Dont have a account ,
                    <Link to="/login" className='font-bold'>
                        Login!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
