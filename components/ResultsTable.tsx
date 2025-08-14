
import React from 'react';
import { EyeIcon } from './icons';
import type { ResultData, InputData, Message } from '../types';

interface ResultRowProps {
    result: ResultData;
    onRetry: (item: ResultData) => void;
    onCopy: (message: string) => void;
    onViewMessages: (messages: Message[], email: string) => void;
}

const ResultRow: React.FC<ResultRowProps> = ({ result, onRetry, onCopy, onViewMessages }) => {

    const handleCopyCode = () => {
        if (result.code) {
            navigator.clipboard.writeText(result.code);
            onCopy('បានចម្លងលេខកូដទៅក្ដារតម្បៀតខ្ទាស់!');
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(result.email);
        onCopy('បានចម្លងអ៊ីមែលរួចរាល់!');
    };
    
    const { status, email, code, content, messages } = result;
    const isSuccess = status === 'success';
    const isMessagesResult = isSuccess && messages && messages.length > 0;
    const isCodeResult = isSuccess && code;

    const renderStatus = () => {
        switch (status) {
            case 'loading':
            case 'retrying':
                return (
                    <span className="flex items-center text-yellow-400">
                        <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full spinner mr-2"></div>
                        {status === 'loading' ? 'ដំណើរការ...' : 'កំពុងព្យាយាមម្តងទៀត...'}
                    </span>
                );
            case 'success':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">ជោគជ័យ</span>;
            case 'error':
                 return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">បរាជ័យ</span>;
            default:
                return null;
        }
    };

    const renderResult = () => {
        if (isMessagesResult) {
            return <span className="font-semibold">{messages.length} សារ</span>
        }
        if (isCodeResult) {
            return <code className="bg-gray-700 text-yellow-300 font-mono p-1 rounded">{code}</code>;
        }
        if (status === 'error') {
             return <span className="text-red-400">{code || 'Error'}</span>
        }
        return <span className="text-gray-500">-</span>;
    };
    
    const renderDetails = () => {
        if(isMessagesResult) {
            const firstMessage = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            const detailText = `ពី៖ ${firstMessage.from[0]?.name || 'N/A'} | ប្រធានបទ៖ ${firstMessage.subject || 'N/A'}`;
            return <span className="text-gray-400 truncate" title={detailText}>{detailText}</span>;
        }
        if (isCodeResult && content) {
            return <span className="text-gray-400 truncate" title={content}>{content}</span>;
        }
        if (status === 'error' && content) {
             return <span className="text-gray-400 truncate" title={content}>{content}</span>;
        }
        return <span className="text-gray-500">-</span>;
    }

    const renderActions = () => {
        return (
            <div className="flex items-center justify-center space-x-2">
                {isMessagesResult && (
                     <button onClick={() => onViewMessages(messages, email)} className="p-2 rounded-md bg-green-600 hover:bg-green-500 transition" title="មើលសារ">
                        <EyeIcon />
                    </button>
                )}
                {isCodeResult && (
                    <button onClick={handleCopyCode} className="p-2 rounded-md bg-gray-600 hover:bg-gray-500 transition" title="ចម្លងលេខកូដ">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </button>
                )}
                 {(status === 'error' || status === 'success') && (
                    <button onClick={() => onRetry(result)} className="p-2 rounded-md bg-blue-600 hover:bg-blue-500 transition" title="ព្យាយាមម្តងទៀត">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4a12 12 0 0116 16M20 20a12 12 0 01-16-16"></path></svg>
                    </button>
                )}
                 {(status === 'loading' || status === 'retrying') && <span className="text-gray-500">-</span>}
            </div>
        );
    }

    return (
        <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
            <td 
                onClick={handleCopyEmail} 
                className="px-6 py-4 font-medium text-white whitespace-nowrap cursor-pointer hover:text-blue-400 transition-colors"
                title="ចុចដើម្បីចម្លងអ៊ីមែល"
            >
                {email}
            </td>
            <td className="px-6 py-4">{renderStatus()}</td>
            <td className="px-6 py-4">{renderResult()}</td>
            <td className="px-6 py-4 max-w-xs truncate">{renderDetails()}</td>
            <td className="px-6 py-4 text-center">{renderActions()}</td>
        </tr>
    );
};


interface ResultsTableProps {
    results: ResultData[];
    onRetry: (item: ResultData) => void;
    onCopy: (message: string) => void;
    onViewMessages: (messages: Message[], email: string) => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, onRetry, onCopy, onViewMessages }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-white mb-4">៤. លទ្ធផល</h2>
            <div className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">អ៊ីមែល</th>
                                <th scope="col" className="px-6 py-3">ស្ថានភាព</th>
                                <th scope="col" className="px-6 py-3">លទ្ធផល</th>
                                <th scope="col" className="px-6 py-3">ព័ត៌មានលម្អិត</th>
                                <th scope="col" className="px-6 py-3 text-center">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((result) => (
                                    <ResultRow key={result.email} result={result} onRetry={onRetry} onCopy={onCopy} onViewMessages={onViewMessages} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 px-6 text-gray-500">
                                        លទ្ធផលនឹងបង្ហាញនៅទីនេះ...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
