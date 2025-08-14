import React from 'react';
import type { ActionType } from '../types';

interface InputSectionProps {
    inputText: string;
    onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    isProcessing: boolean;
    isServiceSelected: boolean;
    actionType: ActionType;
}

export const InputSection: React.FC<InputSectionProps> = ({ inputText, onInputChange, onSubmit, isProcessing, isServiceSelected, actionType }) => {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">៣. បិទភ្ជាប់ទិន្នន័យរបស់អ្នក</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <textarea
                        value={inputText}
                        onChange={onInputChange}
                        rows={10}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y whitespace-nowrap overflow-x-auto"
                        placeholder="Email|Pass|refresh_token|client_id... (មួយជួរក្នុងមួយធាតុ)"
                    ></textarea>
                </div>
                <div className="md:col-span-1 flex flex-col justify-between">
                    <div className="bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg p-4 text-sm text-gray-400 h-full">
                        <h3 className="font-semibold text-white mb-2">ការណែនាំ</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>បិទភ្ជាប់ទិន្នន័យក្នុងទម្រង់៖<br /><code className="text-xs bg-gray-800 p-1 rounded">Email|Pass|refresh_token|client_id</code></li>
                            <li>ធាតុនីមួយៗត្រូវតែនៅលើបន្ទាត់ថ្មី។</li>
                            <li>ប្រអប់អត្ថបទនឹងមិនរុំអក្សរទេ។</li>
                            <li>ជ្រើសរើសសកម្មភាព និងសេវាកម្មមុនពេលបញ្ជូន។</li>
                        </ul>
                    </div>
                    <button
                        onClick={onSubmit}
                        disabled={isProcessing || !isServiceSelected}
                        className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isProcessing ? 'ដំណើរការ...' : (actionType === 'getCode' ? 'ទទួលយកលេខកូដ' : 'ទទួលយកសារ')}
                    </button>
                </div>
            </div>
        </div>
    );
};
