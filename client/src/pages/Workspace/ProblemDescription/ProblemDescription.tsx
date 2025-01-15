import React from 'react';
import { Problem } from '../../../utils/types/problems';

type ProblemDescProps = {
    problem: Problem;
};

function ProblemDescription({ problem }: ProblemDescProps) {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{problem.title}</h1>

                <div className="prose max-w-none">
                    <div className="mb-8">
                        <p className="text-gray-700 leading-relaxed">{problem.description}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Constraints</h2>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-md font-mono">{problem.constraint}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Input Format</h2>
                        <p className="text-gray-700">{problem.inputFormat}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Output Format</h2>
                        <p className="text-gray-700">{problem.outputFormat}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sample Input</h2>
                            <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto">{problem.sampleInput}</pre>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sample Output</h2>
                            <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto">{problem.sampleOutput}</pre>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Explanation</h2>
                        <p className="text-gray-700">{problem.explanation}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProblemDescription;
