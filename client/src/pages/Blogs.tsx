import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useRecoilValue } from 'recoil';
// import { userIdState } from '../recoil/atoms';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Blog {
    id: number;
    title: string;
    user: string;
    description: string;
    upvotes: number;
    downvotes: number;
}

const BlogsPage: React.FC = () => {
    const userId = 1;
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
            await axios.patch(`http://localhost:3000/api/v1/blogs/${blogId}/${voteType}`, { userId });
            // Refresh blogs after voting
            const response = await axios.get(`http://localhost:3000/api/v1/blogs?page=${currentPage}`);
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Blogs</h1>
            <div className="space-y-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-2">By <span className="font-medium">{blog.user}</span></p>
                        <p className="text-gray-800 mb-4">{blog.description}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleVote(blog.id, 'upvote')}
                                    className="text-green-500 hover:text-green-700 transition-colors duration-300"
                                >
                                    <FaArrowUp className="text-2xl" />
                                </button>
                                <span className="text-gray-700 text-lg">{blog.upvotes - blog.downvotes}</span>
                                <button
                                    onClick={() => handleVote(blog.id, 'downvote')}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                >
                                    <FaArrowDown className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                    Previous
                </button>
                <span className="text-gray-700 text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );

};

export default BlogsPage;
