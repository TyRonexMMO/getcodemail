export interface Service {
    name: string;
    color: string; // Tailwind classes for selected state (bg, text)
    icon: string; // Font Awesome class name
}

export interface InputData {
    email: string;
    password?: string;
    refreshToken: string;
    clientId: string;
    raw: string;
}

export type ResultStatus = 'idle' | 'loading' | 'success' | 'error' | 'retrying';

export interface ResultData extends InputData {
    status: ResultStatus;
    code?: string;
    content?: string;
}

export interface ApiResult {
    status: boolean;
    code?: string;
    content?: string;
}
