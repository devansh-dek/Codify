import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import { Problem } from '../../utils/types/problems';
// import CodeEditor from './CodeEditor'; // Assume you have a CodeEditor component

const ProblemPage = () => {
    const { id } = useParams<{ id: string }>();
    const [problem, setProblem] = useState<Problem | null>(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/problems/${id}`);
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
        <div className="flex h-screen">
            <div className="w-1/2 overflow-auto border-r">
                <ProblemDescription problem={problem} />
            </div>
            <div className="w-1/2 p-4">
                {/* <CodeEditor problemId={id} /> */}
                <h1>CODE EDITOR</h1>
            </div>
        </div>
    );
};

export default ProblemPage;
