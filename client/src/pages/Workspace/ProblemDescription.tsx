import React from 'react';
import { Problem } from '../../utils/types/problems';

type ProblemDescProps = {
    problem: Problem;
};

function ProblemDescription({ problem }: ProblemDescProps) {
    return (
        <div className="p-4">
            <h1 className="font-bold text-3xl mb-4">{problem.title}</h1>
            <p className="mb-4">{problem.description}</p>
            <h2 className="font-semibold text-xl mb-2">Constraints</h2>
            <p className="mb-4">{problem.constraint}</p>
            <h2 className="font-semibold text-xl mb-2">Input Format</h2>
            <p className="mb-4">{problem.inputFormat}</p>
            <h2 className="font-semibold text-xl mb-2">Output Format</h2>
            <p className="mb-4">{problem.outputFormat}</p>
            <h2 className="font-semibold text-xl mb-2">Sample Input</h2>
            <pre className="bg-gray-100 p-2 mb-4">{problem.sampleInput}</pre>
            <h2 className="font-semibold text-xl mb-2">Sample Output</h2>
            <pre className="bg-gray-100 p-2 mb-4">{problem.sampleOutput}</pre>
            <h2 className="font-semibold text-xl mb-2">Explanation</h2>
            <p className="mb-4">{problem.explanation}</p>
        </div>
    );
}

export default ProblemDescription;
