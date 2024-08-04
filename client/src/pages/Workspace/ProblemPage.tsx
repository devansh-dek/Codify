import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import { Problem } from '../../utils/types/problems';
import CodeEditor from './CodeEditor/CodeEditor';
import Split from 'react-split';

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
        <div>
            <Split className='split' minSize={0}>

                <div className='overflow-auto'>
                    <ProblemDescription problem={problem} />
                </div>
                <div className='p-4'>
                    <CodeEditor problemId={id} />
                </div>
            </Split>
        </div>
    )
};

export default ProblemPage;
