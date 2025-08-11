
import React from 'react';
import type { ResultData, InputData } from '../types';

interface ResultRowProps {
    result: ResultData;
    onRetry: (item: InputData) => void;
    onCopy: (message: string) => void;
}

const ResultRow: React.FC<ResultRowProps> = ({ result, onRetry, onCopy }) => {

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
    
    const { status, email, code, content } = result;

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

    const renderCode = () => {
        if (status === 'success' && code) {
            return <code className="bg-gray-700 text-yellow-300 font-mono p-1 rounded">{code}</code>;
        }
        if (status === 'error') {
             return <span className="text-gray-500">{code || 'គ្មាន'}</span>
        }
        return <span className="text-gray-500">-</span>;
    };
    
    const renderContent = () => {
        if(status === 'success' || status === 'error') {
            return <span className="text-gray-400 truncate" title={content || ''}>{content || 'មិនបានទទួលមាតិកាទេ។'}</span>;
        }
        return <span className="text-gray-500">-</span>;
    }

    const renderActions = () => {
        return (
            <div className="flex items-center justify-center space-x-2">
                {status === 'success' && code && (
                    <button onClick={handleCopyCode} className="p-2 rounded-md bg-gray-600 hover:bg-gray-500 transition" title="ចម្លងលេខកូដ">
                        <i className="fas fa-copy w-4 h-4 text-white"></i>
                    </button>
                )}
                 {(status === 'error' || status === 'success') && (
                    <button onClick={() => onRetry(result)} className="p-2 rounded-md bg-blue-600 hover:bg-blue-500 transition" title="ព្យាយាមម្តងទៀត">
                         <i className="fas fa-sync-alt w-4 h-4 text-white"></i>
                    </button>
                )}
                 {(status === 'loading' || status === 'retrying') && <span className="text-gray-500">-</span>}
            </div>
        );
    }

    return (
        <tr className="bg-gray-800 border-b border-gray-700">
            <td 
                onClick={handleCopyEmail} 
                className="px-6 py-4 font-medium text-white whitespace-nowrap cursor-pointer hover:text-blue-400 transition-colors"
                title="ចុចដើម្បីចម្លងអ៊ីមែល"
            >
                {email}
            </td>
            <td className="px-6 py-4">{renderStatus()}</td>
            <td className="px-6 py-4">{renderCode()}</td>
            <td className="px-6 py-4">{renderContent()}</td>
            <td className="px-6 py-4 text-center">{renderActions()}</td>
        </tr>
    );
};


interface ResultsTableProps {
    results: ResultData[];
    onRetry: (item: InputData) => void;
    onCopy: (message: string) => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, onRetry, onCopy }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-white mb-4">៣. លទ្ធផល</h2>
            <div className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">អ៊ីមែល</th>
                                <th scope="col" className="px-6 py-3">ស្ថានភាព</th>
                                <th scope="col" className="px-6 py-3">លេខកូដ</th>
                                <th scope="col" className="px-6 py-3">មាតិកា</th>
                                <th scope="col" className="px-6 py-3 text-center">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((result) => (
                                    <ResultRow key={result.email} result={result} onRetry={onRetry} onCopy={onCopy} />
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