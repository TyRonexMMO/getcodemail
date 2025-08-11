
export enum ServiceType {
    Facebook = 'facebook',
    Instagram = 'instagram',
    Twitter = 'twitter',
    Apple = 'apple',
    TikTok = 'tiktok',
    Amazon = 'amazon',
    Lazada = 'lazada',
    KakaoTalk = 'kakaotalk',
    Google = 'google',
    Shopee = 'shopee',
    Telegram = 'telegram',
    WeChat = 'wechat',
    All = 'all',
}

export interface Account {
    email: string;
    password?: string;
    refresh_token: string;
    client_id: string;
    type: ServiceType;
}

export enum ResultStatus {
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export interface Result extends Account {
    id: string;
    status: ResultStatus;
    code: string;
    content: string;
    date: string;
}

export interface ApiRequest {
    email: string;
    refresh_token: string;
    client_id: string;
    type: ServiceType;
}

export interface ApiResponse {
    email: string;
    password?: string;
    status: boolean;
    code: string;
    content: string;
    date: string;
}
