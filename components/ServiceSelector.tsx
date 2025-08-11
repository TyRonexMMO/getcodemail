import React from 'react';
import type { Service } from '../types';

interface ServiceSelectorProps {
    services: Service[];
    selectedService: Service | null;
    onSelect: (service: Service) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, selectedService, onSelect }) => {

    const getDerivedColors = (colorClass: string) => {
        const colorNameMatch = colorClass.match(/bg-([a-z]+-\d+)/);
        let colorName = 'gray-500'; // Default fallback
        if (colorNameMatch && colorNameMatch[1]) {
            colorName = colorNameMatch[1];
        } else if (colorClass.includes('bg-black')) {
            colorName = 'gray-600'; // Specific fallback for black
        }
        
        return {
            hover: `hover:border-${colorName}`,
            ring: `focus:ring-${colorName}`,
        };
    };

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">១. ជ្រើសរើសប្រភេទផ្លេតហ្វម</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-13 gap-3">
                {services.map((service) => {
                    const isSelected = selectedService?.name === service.name;
                    const derived = getDerivedColors(service.color);
                    
                    const buttonClasses = isSelected
                        ? `${service.color} border-transparent shadow-lg`
                        : `border-gray-600 bg-gray-700 bg-opacity-50 text-gray-300 ${derived.hover} hover:text-white`;

                    return (
                        <button
                            key={service.name}
                            onClick={() => onSelect(service)}
                            className={`border-2 rounded-lg p-3 flex flex-col items-center justify-center space-y-2 transition-all duration-200 focus:outline-none focus:ring-2 ${derived.ring} ${buttonClasses}`}
                        >
                            <i className={service.icon} />
                            <span className="text-xs font-medium capitalize">{service.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
