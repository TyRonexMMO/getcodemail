
import React, { useState, useEffect } from 'react';

interface ToastProps {
    message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2700); // A bit less than App's timeout to allow for fade-out

            return () => clearTimeout(timer);
        }
    }, [message]);
    
    if (!message) return null;

    return (
        <div
            className={`fixed bottom-5 right-5 bg-green-500 text-white py-2 px-5 rounded-lg shadow-lg transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
        >
            {message}
        </div>
    );
};
