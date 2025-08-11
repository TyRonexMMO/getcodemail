import React from 'react';
import { ResultStatus } from '../types';

interface SummaryProps {
    summary: {
        [ResultStatus.Success]: number;
        [ResultStatus.Pending]: number;
        [ResultStatus.Error]: number;
    };
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
    return (
        <div className="mt-6">
            <div className="flex items-center">
                <div className="flex-grow h-px bg-gray-200"></div>
                <div className="mx-4 text-gray-500 text-sm">សង្ខេប</div>
                <div className="flex-grow h-px bg-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{summary.success}</div>
                    <div className="text-sm text-green-700">ជោគជ័យ</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{summary.pending}</div>
                    <div className="text-sm text-blue-700">កំពុងរង់ចាំ</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{summary.error}</div>
                    <div className="text-sm text-red-700">កំហុស</div>
                </div>
            </div>
        </div>
    );
};