import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ProblemDetail {
    id: number;
    title: string;
    description: string;
    difficulty: number;
}

const ProblemPage = () => {
    const { id } = useParams<{ id: string }>();
    const [problem, setProblem] = useState<ProblemDetail | null>(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/problems/${id}`);
                console.log("response is ", response)
                setProblem(response.data.response);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [id]);

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className='font-bold p-2 m-2 text-4xl'>{problem.title}</h1>
            <p className='text-lg p-2 m-2'>{problem.description}</p>
            <p className='text-lg p-2 m-2'>Difficulty: {problem.difficulty}</p>
        </div>
    );
};

export default ProblemPage;
