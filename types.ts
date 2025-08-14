import React from 'react';

export type ActionType = 'getCode' | 'getMessages';

export interface Service {
    name: string;
    color: string;
    icon: React.FC;
}

export interface InputData {
    email: string;
    password?: string;
    refreshToken: string;
    clientId: string;
    raw: string;
}

export type ResultStatus = 'idle' | 'loading' | 'success' | 'error' | 'retrying';

export interface Message {
    uid: number;
    date: string;
    from: { name: string; address: string }[];
    subject: string;
    code: string;
    message: string;
}

export interface ResultData extends InputData {
    status: ResultStatus;
    code?: string;
    content?: string;
    messages?: Message[];
}

export interface ApiResult {
    status: boolean;
    code?: string;
    content?: string;
    messages?: Message[];
}
