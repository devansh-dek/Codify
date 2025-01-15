import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import userState from '../../../recoil/atoms/userState';
const socket = io('http://localhost:3000', {
    transports: ['websocket'],
});
interface CodeEditorProps {
    problemId: string
}
const CodeEditor: React.FC<CodeEditorProps> = ({ problemId }) => {
    const user = useRecoilValue(userState);
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [verdict, setVerdict] = useState('');
    const [loading, setLoading] = useState(false);
    const [submissionId, setSubmissionId] = useState<string | null>(null);

    let language = 'cpp';
    let type = 'Run';
    let userId = user.userId;
    let status = 'pending';

    useEffect(() => {
        if (submissionId) {
            console.log("Listening for code execution results...");
            const handleCodeExecuted = (data: any) => {
                if (data.submissionId === submissionId) {
                    setOutput(data.output);
                    setLoading(false);
                    setSubmissionId(null);
                }
            };

            const handleSubmissionVerdict = (data: any) => {
                if (data.submissionId === submissionId) {
                    setVerdict(data.verdict);
                    setLoading(false);
                    setSubmissionId(null);
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
        if (!user.isAuthenticated) {
            toast.error("Login to run code!");
            return;
        }
        type = 'Run';
        setLoading(true);
        setVerdict('');
        setOutput('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/runcode', { code, input, language, type, problemId, userId, status }, { withCredentials: true });
            console.log("Run code response is ", response.data);
            setSubmissionId(response.data.response.id);
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error running code');
            setLoading(false);
        }
    };

    const handleSubmitCode = async () => {
        if (!user.isAuthenticated) {
            toast.error("Login to run code!");
            console.log("LOGIN TO ");
            return;
        }
        type = "Submission";
        setLoading(true);
        setOutput('');
        setVerdict('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/submission', { code, input, language, type, problemId, userId, status }, { withCredentials: true });
            console.log("Submit code response is ", response.data);
            setSubmissionId(response.data.response.id);
        } catch (error) {
            console.error('Error submitting code:', error);
            setVerdict('Error submitting code');
            setLoading(false);
        }
    };

    return (
        <div className="h-full bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
                <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-sm text-gray-500">main.cpp</span>
                    </div>
                </div>

                <textarea
                    className="flex-grow p-4 font-mono text-sm bg-gray-50 border-0 focus:ring-0"
                    placeholder="Write your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border-t border-gray-200">
                    <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Input</div>
                        <textarea
                            className="w-full h-24 font-mono text-sm bg-white p-3 rounded-lg border border-gray-200"
                            placeholder="Enter input..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Output</div>
                        <div className="w-full h-24 font-mono text-sm bg-white p-3 rounded-lg border border-gray-200 overflow-auto">
                            {output || 'No output yet...'}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 p-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRunCode}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            Run
                        </button>
                        <button
                            onClick={handleSubmitCode}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Submit
                        </button>
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center">
                            <TailSpin height="30" width="30" color="#3B82F6" ariaLabel="loading" />
                        </div>
                    )}

                    {verdict && (
                        <div className={`px-4 py-2 rounded-md ${verdict === 'Accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {verdict}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
