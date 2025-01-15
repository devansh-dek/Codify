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
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="mt-6 text-4xl font-extrabold text-white">Create Account</h2>
                    <p className="mt-2 text-sm text-indigo-200">Join our community of developers</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-indigo-200 mb-2">
                                <div className="flex items-center">
                                    <FaUserAlt className="mr-2" />
                                    Username
                                </div>
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-indigo-200/50 text-white"
                                placeholder="Choose a username"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-2">
                                <div className="flex items-center">
                                    <FaUserAlt className="mr-2" />
                                    Email Address
                                </div>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-indigo-200/50 text-white"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-2">
                                <div className="flex items-center">
                                    <FaLock className="mr-2" />
                                    Password
                                </div>
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-indigo-200/50 text-white"
                                placeholder="Create a strong password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-indigo-200 hover:text-white transition-colors"
                        >
                            Already have an account? Sign in →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
