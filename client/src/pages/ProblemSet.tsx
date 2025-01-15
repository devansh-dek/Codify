import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Circle, CheckCircle, AlertCircle } from 'lucide-react';


//fetching all problems
interface Problem {
    id: number,
    title: string,
    discription: string,
    difficulty: number
}

function ProblemSet() {
    const [problems, setProblems] = useState<Problem[]>();
    const [pages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/problems?page=${currentPage}`);
                console.log("response is ", response.data.response.problems);
                setProblems(response.data.response.problems);
                console.log("PRobelms are ", problems);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchProblems();
    }, [currentPage]);
    const getDifficultyColor = (difficulty: number) => {
        if (difficulty <= 1000) return 'text-green-500';
        if (difficulty <= 2000) return 'text-blue-500';
        return 'text-red-500';
    };

    const getDifficultyBadge = (difficulty: number) => {
        if (difficulty <= 1000) return <CheckCircle className="w-5 h-5 text-green-500" />;
        if (difficulty <= 2000) return <Circle className="w-5 h-5 text-blue-500" />;
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Problem Set</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 py-3 px-4">
                    <div className="col-span-1 font-semibold text-gray-600">#</div>
                    <div className="col-span-8 font-semibold text-gray-600">Title</div>
                    <div className="col-span-3 font-semibold text-gray-600 text-center">Difficulty</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {problems?.map((problem) => (
                        <Link
                            key={problem.id}
                            to={`${problem.id}`}
                            className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <div className="col-span-1 text-gray-500">{problem.id}</div>
                            <div className="col-span-8 text-gray-900 font-medium hover:text-blue-600">
                                {problem.title}
                            </div>
                            <div className="col-span-3 flex items-center justify-center space-x-2">
                                {getDifficultyBadge(problem.difficulty)}
                                <span className={`${getDifficultyColor(problem.difficulty)} font-medium`}>
                                    {problem.difficulty}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default ProblemSet;