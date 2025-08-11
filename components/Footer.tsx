import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t py-6">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} ផ្ទាំងគ្រប់គ្រងកូដអ៊ីមែល. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
            </div>
        </footer>
    );
};