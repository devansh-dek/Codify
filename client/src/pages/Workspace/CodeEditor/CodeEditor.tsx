import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
// interface problemId = {
//     problemId: Number
// }
const CodeEditor = ({ problemId }: any) => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [verdict, setVerdict] = useState('');
    const [loading, setLoading] = useState(false);
    let language = 'cpp';
    let type = 'Run', userId = 1, status = 'pending';
    const handleRunCode = async () => {
        setLoading(true);
        setVerdict('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/runcode', { code, input, language, type, problemId, userId, status });
            console.log("Output response is ", response);
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error running code');
        }
        setLoading(false);
    };

    const handleSubmitCode = async () => {
        setLoading(true);
        setOutput('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/submission', { code, input, language, type, problemId, userId, status });
            setVerdict(response.data.verdict);
        } catch (error) {
            console.error('Error submitting code:', error);
            setVerdict('Error submitting code');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-full p-4">
            <textarea
                className="w-full h-2/5 border p-2 mb-2"
                placeholder="Write your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
            ></textarea>
            <div className="flex mb-2">
                <div className="w-1/2 pr-1">
                    <textarea
                        className="w-full h-20 border p-2"
                        placeholder="Sample Input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>
                <div className="w-1/2 pl-1">
                    <textarea
                        className="w-full h-20 border p-2"
                        placeholder="Sample Output"
                        value={output}
                        readOnly
                    ></textarea>
                </div>
            </div>
            <div className="flex justify-between mb-2">
                <button onClick={handleRunCode} className="bg-blue-500 text-white p-2">Run</button>
                <button onClick={handleSubmitCode} className="bg-green-500 text-white p-2">Submit</button>
            </div>
            {loading && (
                <div className="flex justify-center items-center">
                    <TailSpin height="50" width="50" color="blue" ariaLabel="loading" />
                </div>
            )}
            {verdict && (
                <div className={`mt-2 p-2 ${verdict === 'Accepted' ? 'bg-green-200' : 'bg-red-200'}`}>
                    Verdict: {verdict}
                </div>
            )}
        </div>
    );
};

export default CodeEditor;
