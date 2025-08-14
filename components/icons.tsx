
import React from 'react';

const iconProps = {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
};

export const AllIcon: React.FC = () => <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;
export const FacebookIcon: React.FC = () => <svg {...iconProps}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>;
export const InstagramIcon: React.FC = () => <svg {...iconProps}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
export const TwitterIcon: React.FC = () => <svg {...iconProps}><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>;
export const AppleIcon: React.FC = () => <svg {...iconProps}><path d="M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10C5.029 2 2 5.029 2 9s3.029 7 7 7 7-3.029 7-7-3.029-7-7-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" /></svg>;
export const TiktokIcon: React.FC = () => <svg {...iconProps}><path d="M16.5 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zM12 2a10 10 0 100 20 10 10 0 000-20z" /><path d="M12 12v5" /></svg>;
export const AmazonIcon: React.FC = () => <svg {...iconProps}><path d="M19.12 4.88a10 10 0 11-14.24 0 10 10 0 0114.24 0zM12 2a10 10 0 100 20 10 10 0 000-20z" /><path d="M12 12l-4-4" /><path d="M16 12l-4 4" /></svg>;
export const LazadaIcon: React.FC = () => <svg {...iconProps} fill="currentColor" stroke="none"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-5h2v5h-2zm0-7V5h2v5h-2z" clipRule="evenodd" /></svg>;
export const KakaotalkIcon: React.FC = () => <svg {...iconProps}><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.707-8.293a1 1 0 00-1.414 1.414L12 18.586l3.121-3.121a1 1 0 00-1.414-1.414L12 15.758l-1.707-1.707zM12 6a1 1 0 00-1 1v5a1 1 0 102 0V7a1 1 0 00-1-1z" /></svg>;
export const GoogleIcon: React.FC = () => <svg {...iconProps}><path d="M21.99 10.76a1 1 0 00-.9-.76h-8.2a1 1 0 00-1 .99v8.2a1 1 0 00.99 1h8.2a1 1 0 001-.99v-8.2zM12 18a6 6 0 110-12 6 6 0 010 12z" /></svg>;
export const ShopeeIcon: React.FC = () => <svg {...iconProps}><path d="M20.92 13.62a2 2 0 00-1.84-3.12h-3.9a1 1 0 01-1-1V5.5a2.5 2.5 0 00-5 0V9.5a1 1 0 01-1 1h-3.9a2 2 0 00-1.84 3.12L7.08 20.5a1 1 0 00.92.5h8a1 1 0 00.92-.5l2-6.88z" /></svg>;
export const TelegramIcon: React.FC = () => <svg {...iconProps}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>;
export const WechatIcon: React.FC = () => <svg {...iconProps}><path d="M17.5 7.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" /><path d="M12 12a4 4 0 100-8 4 4 0 000 8z" /><path d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" /></svg>;

export const CodeIcon: React.FC = () => <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
export const MessagesIcon: React.FC = () => <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
export const EyeIcon: React.FC = () => <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;