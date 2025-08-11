import React, { useState } from 'react';
import { SERVICE_TYPES, SAMPLE_DATA } from '../constants';
import { ServiceType } from '../types';
import type { Account } from '../types';

interface InputSectionProps {
    onProcess: (accounts: Account[]) => void;
    isProcessing: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onProcess, isProcessing }) => {
    const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.Facebook);
    const [accountData, setAccountData] = useState('');

    const handleProcessClick = () => {
        const lines = accountData.trim().split('\n').filter(line => line.trim());
        if (lines.length === 0) {
            alert('សូមបញ្ចូលទិន្នន័យគណនី។');
            return;
        }

        const accounts: Account[] = lines.map(line => {
            const parts = line.split('|').map(part => part.trim());
            return {
                email: parts[0] || '',
                password: parts[1] || '',
                refresh_token: parts[2] || '',
                client_id: parts[3] || '',
                type: serviceType,
            };
        });
        
        onProcess(accounts);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">បញ្ចូលទិន្នន័យគណនី</h2>
            <div className="mb-6">
                 <label className="block text-gray-700 text-sm font-medium mb-3">
                    ប្រភេទសេវាកម្ម
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {SERVICE_TYPES.map(s => (
                        <button
                            key={s.value}
                            type="button"
                            onClick={() => setServiceType(s.value)}
                            className={`flex flex-col items-center justify-center p-2.5 border rounded-lg transition-all duration-200 ${
                                serviceType === s.value
                                    ? 'bg-primary/10 border-primary ring-2 ring-primary text-primary'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                            }`}
                            title={s.label}
                        >
                            <i className={`${s.icon} text-xl mb-1 ${serviceType !== s.value ? s.color : ''}`}></i>
                            <span className="text-xs font-medium truncate">{s.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="data">
                    បិទភ្ជាប់ទិន្នន័យគណនី (ទម្រង់: Email|Pass|refresh_token|client_id)
                </label>
                <textarea 
                    id="data" 
                    rows={8} 
                    value={accountData}
                    onChange={(e) => setAccountData(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm scrollbar-hide transition"
                    placeholder="user1@example.com|password1|refresh_token_here|client_id_here
user2@example.com|password2|refresh_token_here|client_id_here
user3@example.com|password3|refresh_token_here|client_id_here"
                />
                <p className="text-xs text-gray-500 mt-2">បញ្ចូលមួយគណនីក្នុងមួយបន្ទាត់។ ទិន្នន័យនឹងត្រូវបានកាត់ដោយស្វ័យប្រវត្តិ។</p>
            </div>
            
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={() => setAccountData('')} className="text-gray-500 hover:text-gray-700 mr-4 transition-colors">
                        <i className="fas fa-trash-alt mr-1"></i> សម្អាត
                    </button>
                    <button onClick={() => setAccountData(SAMPLE_DATA)} className="text-primary hover:text-secondary transition-colors">
                        <i className="fas fa-lightbulb mr-1"></i> ផ្ទុកគំរូ
                    </button>
                </div>
                <button 
                    onClick={handleProcessClick} 
                    disabled={isProcessing}
                    className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isProcessing ? (
                        <>
                            <i className="fas fa-spinner fa-spin mr-2"></i> កំពុងដំណើរការ...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-bolt mr-2"></i> ដំណើរការគណនី
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};