import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '../recoil/atoms/userState';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Blog {
    id: number;
    title: string;
    user: string;
    description: string;
    upvotes: number;
    downvotes: number;
}

const BlogsPage: React.FC = () => {
    const user = useRecoilValue(userState);
    const userId = user.userId;
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/blogs?page=${currentPage}`);
                setBlogs(response.data.blogs);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [currentPage]);

    const handleVote = async (blogId: number, voteType: 'upvote' | 'downvote') => {


        try {
            if (!user.isAuthenticated) {
                toast.error("Login to vote");
                console.log("LOGIN TO ");
                return;
            }
            await axios.patch(`http://localhost:3000/api/v1/blogs/${blogId}/${voteType}`, { userId }, { withCredentials: true });
            // Refresh blogs after voting
            const response = await axios.get(`http://localhost:3000/api/v1/blogs?page=${currentPage}`, { withCredentials: true });
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Blogs</h1>
                    <p className="text-lg text-gray-600">Explore insights and experiences from our community</p>
                </div>

                <div className="space-y-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-600">
                                            By <span className="font-medium text-blue-600">{blog.user}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <button
                                            onClick={() => handleVote(blog.id, 'upvote')}
                                            className="group flex flex-col items-center"
                                        >
                                            <FaArrowUp className="text-2xl text-gray-400 group-hover:text-green-500 transition-colors" />
                                            <span className="text-sm text-gray-500 group-hover:text-green-500 transition-colors">
                                                Upvote
                                            </span>
                                        </button>
                                        <span className="text-2xl font-bold text-gray-700">{blog.upvotes - blog.downvotes}</span>
                                        <button
                                            onClick={() => handleVote(blog.id, 'downvote')}
                                            className="group flex flex-col items-center"
                                        >
                                            <FaArrowDown className="text-2xl text-gray-400 group-hover:text-red-500 transition-colors" />
                                            <span className="text-sm text-gray-500 group-hover:text-red-500 transition-colors">
                                                Downvote
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{blog.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:shadow-md transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-gray-600 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:shadow-md transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;
