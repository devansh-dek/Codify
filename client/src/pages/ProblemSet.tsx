import axios from 'axios';
import React, { useEffect, useState } from 'react'


//fetching all problems
interface Problem {
    id: number,
    title: string,
    difficulty: string
}

function ProblemSet() {
    const [problems, setProblems] = useState<Problem[]>();
    const [pages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/problem?page=${currentPage}`);
                console.log("response is ", response);
                setProblems(response.data.response);
                console.log("PRobelms are ", problems);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchProblems();
    }, [currentPage]);
    return (
        <>
            <div className='font-bold p-2 m-2 text-4xl'>ProblemSet</div>
            {/* //list of all problems */}
            <div className='grid grid-cols-12 w-screen justify-between'>
                <h1 className='text-2xl col-span-1 border border-slate-400 font-medium m-1 p-4'>Id</h1>
                <h1 className='text-2xl col-span-9 border border-slate-400 font-medium m-1 p-4'>Title</h1>
                <h1 className='text-2xl col-span-2 border border-slate-400 font-medium m-1 p-4'>Difficulty</h1>

            </div>
            {/* //title rating submission */}
            <div>
                {problems?.map((problem) => (
                    <div className='grid grid-cols-12 w-screen justify-between'>
                        <div className='text-pretty font-semibold col-span-1 p-2 m-2 text-xl border border-slate-400'>{problem.id}</div>
                        <div className='text-pretty font-semibold col-span-9 p-2 m-2 text-xl border border-slate-400'>{problem.title}</div>
                        <div className='text-pretty font-semibold col-span-2 p-2 m-2 text-xl border border-slate-400'>{problem.difficulty}</div>
                    </div>
                ))}
            </div>

        </>

    )
}

export default ProblemSet;