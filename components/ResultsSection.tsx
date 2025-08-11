import React, { useCallback, useState } from 'react';
import type { Result } from '../types';
import { ResultStatus } from '../types';
import { ResultRow } from './ResultRow';
import { Summary } from './Summary';

interface ResultsSectionProps {
    results: Result[];
    summary: {
        [ResultStatus.Success]: number;
        [ResultStatus.Pending]: number;
        [ResultStatus.Error]: number;
    };
    onRetry: (id: string) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results, summary, onRetry }) => {
    const [isAllCopied, setIsAllCopied] = useState(false);

    const handleCopyAll = useCallback(() => {
        const successfulResults = results.filter(r => r.status === ResultStatus.Success && r.code);
        if (successfulResults.length === 0) {
            alert('គ្មានកូដជោគជ័យដើម្បីចម្លងទេ។');
            return;
        }

        const textToCopy = successfulResults
            .map(r => `${r.email}: ${r.code}`)
            .join('\n');
            
        navigator.clipboard.writeText(textToCopy);
        setIsAllCopied(true);
        setTimeout(() => setIsAllCopied(false), 2000);
    }, [results]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">លទ្ធផល</h2>
                <div className="flex items-center">
                    <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {results.length} គណនី
                    </span>
                    <button 
                        onClick={handleCopyAll} 
                        className="ml-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                        {isAllCopied ? (
                            <><i className="fas fa-check mr-1"></i> បានចម្លង!</>
                        ) : (
                            <><i className="fas fa-copy mr-1"></i> ចម្លងកូដទាំងអស់</>
                        )}
                    </button>
                </div>
            </div>
            
            <div className="overflow-hidden flex-grow">
                <div className="h-[380px] overflow-y-auto scrollbar-hide border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">អ៊ីមែល</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ស្ថានភាព</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">កូដ</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {results.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-12 text-center">
                                        <div className="text-gray-400 mb-2">
                                            <i className="fas fa-inbox text-3xl"></i>
                                        </div>
                                        <p className="text-gray-500">លទ្ធផលដែលបានដំណើរការនឹងបង្ហាញនៅទីនេះ</p>
                                    </td>
                                </tr>
                            ) : (
                                results.map((result) => (
                                    <ResultRow key={result.id} result={result} onRetry={onRetry} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Summary summary={summary} />
        </div>
    );
};