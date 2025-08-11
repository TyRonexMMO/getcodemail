
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ServiceSelector } from './components/ServiceSelector';
import { InputSection } from './components/InputSection';
import { ResultsTable } from './components/ResultsTable';
import { Toast } from './components/Toast';
import { SERVICES } from './constants';
import type { Service, InputData, ResultData, ApiResult, ResultStatus } from './types';

const API_URL = 'https://tools.dongvanfb.net/api/get_code_oauth2';

const App: React.FC = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [inputText, setInputText] = useState<string>('');
    const [results, setResults] = useState<ResultData[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const parseInput = useCallback((text: string): InputData[] => {
        return text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.includes('|'))
            .map((line): InputData | null => {
                const parts = line.split('|');
                if (parts.length < 4) return null;
                return {
                    email: parts[0].trim(),
                    password: parts[1].trim(),
                    refreshToken: parts[2].trim(),
                    clientId: parts[3].trim(),
                    raw: line,
                };
            })
            .filter((item): item is InputData => item !== null);
    }, []);

    const getCode = useCallback(async (item: InputData, type: string): Promise<ApiResult> => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: item.email,
                    refresh_token: item.refreshToken,
                    client_id: item.clientId,
                    type: type,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
                return { status: false, code: 'Error', content: errorData.message };
            }
            return await response.json();
        } catch (error) {
            console.error('API Call Error:', error);
            return { status: false, code: 'Error', content: 'Network error or CORS issue.' };
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!selectedService) {
            showToast('សូមជ្រើសរើសប្រភេទផ្លេតហ្វមជាមុនសិន។');
            return;
        }
        const dataToProcess = parseInput(inputText);
        if (dataToProcess.length === 0) {
            setResults([]);
            showToast('រកមិនឃើញទិន្នន័យត្រឹមត្រូវទេ។ សូមពិនិត្យមើលការបញ្ចូលរបស់អ្នក។');
            return;
        }

        setIsProcessing(true);
        const initialResults: ResultData[] = dataToProcess.map(item => ({ ...item, status: 'loading' }));
        setResults(initialResults);

        const promises = initialResults.map(item => getCode(item, selectedService.name));
        const apiResults = await Promise.all(promises);

        const finalResults = initialResults.map((item, index) => {
            const res = apiResults[index];
            const newStatus: ResultStatus = res.status ? 'success' : 'error';
            return {
                ...item,
                status: newStatus,
                code: res.code,
                content: res.content,
            };
        });

        setResults(finalResults);
        setIsProcessing(false);
    }, [selectedService, inputText, parseInput, getCode]);

    const handleRetry = useCallback(async (itemToRetry: InputData) => {
        if (!selectedService) {
            showToast('សូមជ្រើសរើសប្រភេទផ្លេតហ្វមជាមុនសិន។');
            return;
        }

        setResults(prev => prev.map(r => r.email === itemToRetry.email ? { ...r, status: 'retrying' } : r));

        const result = await getCode(itemToRetry, selectedService.name);
        const newStatus: ResultStatus = result.status ? 'success' : 'error';

        setResults(prev => prev.map(r =>
            r.email === itemToRetry.email
                ? {
                    ...r,
                    status: newStatus,
                    code: result.code,
                    content: result.content
                }
                : r
        ));
    }, [selectedService, getCode]);
    
    const handleCopy = (message: string) => {
        showToast(message);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <Header />
                <main className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-gray-900 p-4 sm:p-8">
                    <ServiceSelector
                        services={SERVICES}
                        selectedService={selectedService}
                        onSelect={setSelectedService}
                    />
                    <InputSection
                        inputText={inputText}
                        onInputChange={(e) => setInputText(e.target.value)}
                        onSubmit={handleSubmit}
                        isProcessing={isProcessing}
                        isServiceSelected={!!selectedService}
                    />
                    <ResultsTable
                        results={results}
                        onRetry={handleRetry}
                        onCopy={handleCopy}
                    />
                </main>
                <footer className="text-center mt-8 text-gray-500 text-sm">
                    <p>ផ្ទាំងគ្រប់គ្រងទំនើបដោយ Dongvanfb.net</p>
                </footer>
            </div>
            <Toast message={toastMessage} />
        </div>
    );
};

export default App;
