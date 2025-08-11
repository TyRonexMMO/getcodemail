import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="bg-primary p-2 rounded-lg mr-3">
                        <i className="fas fa-envelope text-white text-xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">ផ្ទាំងគ្រប់គ្រងកូដអ៊ីមែល</h1>
                </div>
                <div className="flex items-center">
                    <button className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
                        <i className="fas fa-cog mr-2"></i>ការកំណត់
                    </button>
                </div>
            </div>
        </header>
    );
};