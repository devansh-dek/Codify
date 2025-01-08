import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import userState from '../recoil/atoms/userState';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/login',
                { email, password },
                { withCredentials: true }
            );

            if (!response.data.success) {
                setError(response.data.message || 'Login failed. Please try again.');
                return;
            }

            const userLogged = {
                userId: response.data.response.id,
                username: response.data.response.username,
                email: response.data.response.email,
                isAuthenticated: true,
            };
            setUser(userLogged);
            navigate('/blogs');
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r px-4">
            <div className="relative w-full max-w-md p-8 bg-gray-600 rounded-xl shadow-2xl">
                <form onSubmit={handleSubmit} className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Login</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mb-6">
                        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <FaUserAlt className="mr-2 text-teal-400" /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-4 border rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your email"
                            aria-label="Email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <FaLock className="mr-2 text-teal-400" /> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-4 border rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your password"
                            aria-label="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-transform transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <div className="p-2 m-2 flex justify-center">
                    Don’t have an account?{' '}
                    <Link to="/register" className="font-bold">
                        Register!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
