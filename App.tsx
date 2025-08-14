
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ServiceSelector } from './components/ServiceSelector';
import { InputSection } from './components/InputSection';
import { ResultsTable } from './components/ResultsTable';
import { Toast } from './components/Toast';
import { SERVICES } from './constants';
import * as Icons from './components/icons';
import type { Service, InputData, ResultData, ApiResult, ResultStatus, ActionType, Message } from './types';

const API_URLS: Record<ActionType, string> = {
    getCode: 'https://tools.dongvanfb.net/api/get_code_oauth2',
    getMessages: 'https://tools.dongvanfb.net/api/get_messages_oauth2',
};

const ActionSelector: React.FC<{ selectedAction: ActionType; onSelect: (action: ActionType) => void; }> = ({ selectedAction, onSelect }) => {
    const actions: { id: ActionType; label: string; icon: React.FC }[] = [
        { id: 'getCode', label: 'Get Code', icon: Icons.CodeIcon },
        { id: 'getMessages', label: 'Get Messages', icon: Icons.MessagesIcon },
    ];
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">១. ជ្រើសរើសសកម្មភាព</h2>
            <div className="flex items-center bg-gray-700 rounded-lg p-1 space-x-1">
                {actions.map(action => (
                    <button
                        key={action.id}
                        onClick={() => onSelect(action.id)}
                        className={`w-full flex items-center justify-center space-x-2 rounded-md py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            selectedAction === action.id ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        <action.icon />
                        <span>{action.id === 'getCode' ? 'ទទួលយកលេខកូដ' : 'ទទួលយកសារ'}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const MessageModal: React.FC<{ data: {messages: Message[], email: string}; onClose: () => void }> = ({ data, onClose }) => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const { messages, email } = data;

    const sortedMessages = useMemo(() => {
        return [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [messages]);

    const handleSelectMessage = (message: Message) => setSelectedMessage(message);
    const handleBack = () => setSelectedMessage(null);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                {selectedMessage ? (
                     // Message Content View
                    <>
                        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                            <button onClick={handleBack} className="flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                                ត្រឡប់ក្រោយ
                            </button>
                            <h3 className="text-lg font-bold text-white truncate px-4 flex-1 text-center">{selectedMessage.subject}</h3>
                             <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </header>
                        <div className="p-4 bg-gray-900 flex-grow overflow-y-auto">
                            <iframe
                                srcDoc={selectedMessage.message}
                                className="w-full h-[65vh] bg-white rounded-md border-none"
                                sandbox="allow-same-origin"
                                title="Email Content"
                            />
                        </div>
                    </>
                ) : (
                    // Message List View
                    <>
                        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                            <h3 className="text-lg font-bold text-white">សារសម្រាប់ <span className="text-blue-400">{email}</span></h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </header>
                        <div className="overflow-y-auto">
                           <ul className="divide-y divide-gray-700">
                                {sortedMessages.map(msg => (
                                    <li key={msg.uid} onClick={() => handleSelectMessage(msg)} className="p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold text-white truncate" title={msg.from[0]?.name}>{msg.from[0]?.name || 'Unknown Sender'}</p>
                                            <p className="text-xs text-gray-400 flex-shrink-0 ml-4">{new Date(msg.date).toLocaleString()}</p>
                                        </div>
                                        <p className="text-sm text-gray-300 truncate" title={msg.subject}>{msg.subject || 'No Subject'}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [selectedAction, setSelectedAction] = useState<ActionType>('getCode');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [inputText, setInputText] = useState<string>('');
    const [results, setResults] = useState<ResultData[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [modalData, setModalData] = useState<{messages: Message[], email: string} | null>(null);


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

    const processRequest = useCallback(async (item: InputData, action: ActionType, type: string): Promise<ApiResult> => {
        try {
            const apiUrl = API_URLS[action];
            const payload: any = {
                email: item.email,
                refresh_token: item.refreshToken,
                client_id: item.clientId,
            };
            if (action === 'getCode') {
                payload.type = type;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            const responseData = await response.json().catch(() => ({}));

            if (!response.ok) {
                return { status: false, code: 'Error', content: responseData.message || `HTTP error! Status: ${response.status}` };
            }
            // The get_messages_oauth2 API response has a 'status' field inside.
            if(action === 'getMessages' && responseData.status === false){
                return { status: false, code: 'Error', content: 'Failed to retrieve messages.'}
            }
            
            return { ...responseData, status: true };
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

        const promises = initialResults.map(item => processRequest(item, selectedAction, selectedService.name));
        const apiResults = await Promise.all(promises);

        const finalResults = initialResults.map((item, index) => {
            const res = apiResults[index];
            const newStatus: ResultStatus = (res.status && (res.code || (res.messages && res.messages.length >= 0))) ? 'success' : 'error';
            return {
                ...item,
                status: newStatus,
                code: res.code,
                content: res.content,
                messages: res.messages,
            };
        });

        setResults(finalResults);
        setIsProcessing(false);
    }, [selectedService, inputText, parseInput, processRequest, selectedAction]);

    const handleRetry = useCallback(async (itemToRetry: ResultData) => {
        if (!selectedService) {
            showToast('សូមជ្រើសរើសប្រភេទផ្លេតហ្វមជាមុនសិន។');
            return;
        }
        
        const actionToRetry = itemToRetry.messages ? 'getMessages' : 'getCode';

        setResults(prev => prev.map(r => r.email === itemToRetry.email ? { ...r, status: 'retrying' } : r));

        const result = await processRequest(itemToRetry, actionToRetry, selectedService.name);
        const newStatus: ResultStatus = (result.status && (result.code || (result.messages && result.messages.length >= 0))) ? 'success' : 'error';

        setResults(prev => prev.map(r =>
            r.email === itemToRetry.email
                ? {
                    ...r,
                    status: newStatus,
                    code: result.code,
                    content: result.content,
                    messages: result.messages,
                }
                : r
        ));
    }, [selectedService, processRequest]);
    
    const handleCopy = (message: string) => {
        showToast(message);
    };

    const handleViewMessages = (messages: Message[], email: string) => {
        setModalData({ messages, email });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <Header />
                <main className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-gray-900 p-4 sm:p-8">
                    <ActionSelector selectedAction={selectedAction} onSelect={setSelectedAction} />
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
                        actionType={selectedAction}
                    />
                    <ResultsTable
                        results={results}
                        onRetry={handleRetry}
                        onCopy={handleCopy}
                        onViewMessages={handleViewMessages}
                    />
                </main>
                <footer className="text-center mt-8 text-gray-500 text-sm">
                    <p>រៀបរៀង និងបង្កើតឡើងដោយៈ បញ្ញាសិប្បនិម្មិត (Gemini AI) : កែសម្រួល និងច្នៃកូដបន្ថែមដោយ៖ TYRonex</p>
                </footer>
            </div>
            {modalData && <MessageModal data={modalData} onClose={() => setModalData(null)} />}
            <Toast message={toastMessage} />
        </div>
    );
};

export default App;
