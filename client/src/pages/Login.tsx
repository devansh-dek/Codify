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
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <h2 className="mt-6 text-4xl font-extrabold text-white">Welcome Back!</h2>
                    <p className="mt-2 text-sm text-blue-200">Sign in to continue your coding journey</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
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
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-blue-200/50 text-white"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
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
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-blue-200/50 text-white"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/register"
                            className="text-sm font-medium text-blue-200 hover:text-white transition-colors"
                        >
                            Don't have an account? Create one →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
