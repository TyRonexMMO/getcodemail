import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { Footer } from './components/Footer';
import type { Account, Result } from './types';
import { ResultStatus } from './types';
import { getCode } from './services/apiService';

const App: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const updateResult = (id: string, updates: Partial<Result>) => {
        setResults(prevResults =>
            prevResults.map(r => (r.id === id ? { ...r, ...updates } : r))
        );
    };

    const processSingleAccount = useCallback(async (account: Account, id: string) => {
        try {
            const apiResponse = await getCode({
                email: account.email,
                refresh_token: account.refresh_token,
                client_id: account.client_id,
                type: account.type,
            });

            if (apiResponse.status) {
                updateResult(id, {
                    status: ResultStatus.Success,
                    code: apiResponse.code,
                    content: apiResponse.content,
                    date: apiResponse.date,
                });
            } else {
                updateResult(id, {
                    status: ResultStatus.Error,
                    content: apiResponse.content || 'Failed to retrieve code.',
                });
            }
        } catch (error) {
            console.error('API Error for', account.email, error);
            updateResult(id, {
                status: ResultStatus.Error,
                content: error instanceof Error ? error.message : 'បាន​កើត​ឡើង​នូវ​កំហុស​មិន​ស្គាល់​មួយ។',
            });
        }
    }, []);

    const handleProcess = useCallback(async (accounts: Account[]) => {
        setIsProcessing(true);
        const initialResults: Result[] = accounts.map((acc, index) => ({
            ...acc,
            id: `${acc.email}-${index}`,
            status: ResultStatus.Pending,
            code: '',
            content: '',
            date: '',
        }));
        setResults(initialResults);

        await Promise.allSettled(
            initialResults.map(result => processSingleAccount(result, result.id))
        );

        setIsProcessing(false);
    }, [processSingleAccount]);

    const handleRetry = useCallback(async (resultId: string) => {
        const resultToRetry = results.find(r => r.id === resultId);
        if (resultToRetry) {
            updateResult(resultId, { status: ResultStatus.Pending, code: '', content: '', date: '' });
            await processSingleAccount(resultToRetry, resultToRetry.id);
        }
    }, [results, processSingleAccount]);

    const summary = useMemo(() => {
        return results.reduce(
            (acc, result) => {
                acc[result.status]++;
                return acc;
            },
            {
                [ResultStatus.Success]: 0,
                [ResultStatus.Pending]: 0,
                [ResultStatus.Error]: 0,
            }
        );
    }, [results]);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <InputSection onProcess={handleProcess} isProcessing={isProcessing} />
                    <ResultsSection
                        results={results}
                        summary={summary}
                        onRetry={handleRetry}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;