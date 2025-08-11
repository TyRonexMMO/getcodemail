import React, { useState, useCallback } from 'react';
import type { Result } from '../types';
import { ResultStatus } from '../types';

interface ResultRowProps {
    result: Result;
    onRetry: (id: string) => void;
}

const StatusBadge: React.FC<{ status: ResultStatus }> = ({ status }) => {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    switch (status) {
        case ResultStatus.Success:
            return <span className={`${baseClasses} bg-green-100 text-green-800`}>ជោគជ័យ</span>;
        case ResultStatus.Error:
            return <span className={`${baseClasses} bg-red-100 text-red-800`}>កំហុស</span>;
        case ResultStatus.Pending:
            return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>កំពុងដំណើរការ...</span>;
        default:
            return null;
    }
};

export const ResultRow: React.FC<ResultRowProps> = ({ result, onRetry }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        if (result.code) {
            navigator.clipboard.writeText(result.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [result.code]);

    const handleRetry = useCallback(() => {
        onRetry(result.id);
    }, [onRetry, result.id]);

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 truncate" title={result.email}>{result.email}</div>
                <div className="text-xs text-gray-500">{result.date || '-'}</div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={result.status} />
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-mono font-bold text-gray-900">{result.code || '-'}</div>
                <div className="text-xs text-gray-500 truncate max-w-xs" title={result.content}>{result.content || '-'}</div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm">
                <button 
                    onClick={handleCopy}
                    disabled={!result.code || isCopied}
                    className={`text-white px-3 py-1 rounded-lg text-xs mr-2 transition-all duration-200 transform hover:scale-105 focus:outline-none ${isCopied ? 'bg-green-500' : 'bg-primary hover:bg-secondary'} disabled:bg-gray-300 disabled:scale-100 disabled:cursor-not-allowed`}
                >
                    <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
                </button>
                <button 
                    onClick={handleRetry}
                    disabled={result.status === ResultStatus.Pending}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs transition-colors transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-wait"
                >
                    <i className="fas fa-redo"></i>
                </button>
            </td>
        </tr>
    );
};