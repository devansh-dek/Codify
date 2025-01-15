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
            const fetchSubmissions = await axios.get(`http://localhost:3000/api/v1/submission/5`);
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
        <div className="min-h-screen bg-gray-50 p-6">
            {!user.isAuthenticated ? (
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                        <img
                            src="/login.png"
                            alt="Login required"
                            onClick={handleLoginClick}
                            className="w-32 h-32 mx-auto mb-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Required</h1>
                        <p className="text-gray-600 mb-6">Please sign in to view your profile</p>
                        <button
                            onClick={handleLoginClick}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* User Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                            <div className="flex items-center space-x-6">
                                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {user.username[0].toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-white">
                                    <h1 className="text-2xl font-bold mb-1">{user.username}</h1>
                                    <p className="text-blue-100">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <p className="text-gray-600 text-sm mb-1">Questions Solved</p>
                                    <p className="text-2xl font-bold text-blue-600">0</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <p className="text-gray-600 text-sm mb-1">Total Submissions</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {submissions?.length || 0}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <button
                                        onClick={handleOnClick}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        Create Blog Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submissions and Heatmap Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Submissions Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Submissions</h2>
                            <div className="overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Problem</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Verdict</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {submissions?.map((submission) => (
                                                <tr key={submission.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm text-gray-900">#{submission.problemId}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${submission.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                                submission.status === 'wrong_answer' ? 'bg-red-100 text-red-800' :
                                                                    'bg-yellow-100 text-yellow-800'}`}>
                                                            {submission.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500">{submission.verdict || '-'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-500">
                                                        {new Date(submission.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Heatmap Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Heatmap</h2>
                            <Heatmap userId={user.userId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;