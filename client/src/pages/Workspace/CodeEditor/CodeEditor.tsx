import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
    transports: ['websocket'], // Ensure websocket transport is used
});

const CodeEditor = ({ problemId }) => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [verdict, setVerdict] = useState('');
    const [loading, setLoading] = useState(false);
    const [submissionId, setSubmissionId] = useState<string | null>(null);

    let language = 'cpp';
    let type = 'Run';
    let userId = 1;
    let status = 'pending';

    useEffect(() => {
        if (submissionId) {
            console.log("Listening for code execution results...");
            const handleCodeExecuted = (data) => {
                if (data.submissionId === submissionId) {
                    setOutput(data.output);
                    setLoading(false);
                    setSubmissionId(null); // Reset submissionId to stop listening for this specific event
                }
            };

            const handleSubmissionVerdict = (data) => {
                if (data.submissionId === submissionId) {
                    setVerdict(data.verdict);
                    setLoading(false);
                    setSubmissionId(null); // Reset submissionId to stop listening for this specific event
                }
            };

            socket.on('codeExecuted', handleCodeExecuted);
            socket.on('submissionVerdict', handleSubmissionVerdict);

            return () => {
                socket.off('codeExecuted', handleCodeExecuted);
                socket.off('submissionVerdict', handleSubmissionVerdict);
            };
        }
    }, [submissionId]);

    const handleRunCode = async () => {
        type = 'Run';
        setLoading(true);
        setVerdict('');
        setOutput('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/runcode', { code, input, language, type, problemId, userId, status });
            console.log("Run code response is ", response.data);
            setSubmissionId(response.data.response.id); // Assuming the response contains the submission id
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error running code');
            setLoading(false);
        }
    };

    const handleSubmitCode = async () => {
        type = "Submission";
        setLoading(true);
        setOutput('');
        setVerdict('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/submission', { code, input, language, type, problemId, userId, status });
            console.log("Submit code response is ", response.data);
            setSubmissionId(response.data.response.id); // Assuming the response contains the submission id
        } catch (error) {
            console.error('Error submitting code:', error);
            setVerdict('Error submitting code');
            setLoading(false);
        }
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
