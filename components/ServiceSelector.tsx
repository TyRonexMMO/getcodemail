import React from 'react';
import type { Service } from '../types';

interface ServiceSelectorProps {
    services: Service[];
    selectedService: Service | null;
    onSelect: (service: Service) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, selectedService, onSelect }) => {
    // Tailwind's JIT compiler needs full class names, so we can't use string interpolation like `bg-${color}` directly.
    // Instead, we create a map of colors to their corresponding classes.
    const colorClasses: Record<string, { bg: string, ring: string, hoverBorder: string }> = {
        'gray-500': { bg: 'bg-gray-500', ring: 'focus:ring-gray-500', hoverBorder: 'hover:border-gray-500' },
        'blue-600': { bg: 'bg-blue-600', ring: 'focus:ring-blue-600', hoverBorder: 'hover:border-blue-600' },
        'pink-500': { bg: 'bg-pink-500', ring: 'focus:ring-pink-500', hoverBorder: 'hover:border-pink-500' },
        'sky-400': { bg: 'bg-sky-400', ring: 'focus:ring-sky-400', hoverBorder: 'hover:border-sky-400' },
        'gray-300': { bg: 'bg-gray-300', ring: 'focus:ring-gray-300', hoverBorder: 'hover:border-gray-300' },
        'purple-500': { bg: 'bg-purple-500', ring: 'focus:ring-purple-500', hoverBorder: 'hover:border-purple-500' },
        'orange-400': { bg: 'bg-orange-400', ring: 'focus:ring-orange-400', hoverBorder: 'hover:border-orange-400' },
        'red-500': { bg: 'bg-red-500', ring: 'focus:ring-red-500', hoverBorder: 'hover:border-red-500' },
        'yellow-400': { bg: 'bg-yellow-400', ring: 'focus:ring-yellow-400', hoverBorder: 'hover:border-yellow-400' },
        'red-600': { bg: 'bg-red-600', ring: 'focus:ring-red-600', hoverBorder: 'hover:border-red-600' },
        'orange-600': { bg: 'bg-orange-600', ring: 'focus:ring-orange-600', hoverBorder: 'hover:border-orange-600' },
        'blue-400': { bg: 'bg-blue-400', ring: 'focus:ring-blue-400', hoverBorder: 'hover:border-blue-400' },
        'green-500': { bg: 'bg-green-500', ring: 'focus:ring-green-500', hoverBorder: 'hover:border-green-500' },
    };

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">២. ជ្រើសរើសប្រភេទផ្លេតហ្វម</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-13 gap-3">
                {services.map((service) => {
                    const isSelected = selectedService?.name === service.name;
                    const classes = colorClasses[service.color] || colorClasses['gray-500'];
                    const IconComponent = service.icon;
                    
                    const buttonClasses = isSelected
                        ? `${classes.bg} border-transparent text-white shadow-lg`
                        : `border-gray-600 bg-gray-700 bg-opacity-50 text-gray-300 ${classes.hoverBorder} hover:text-white`;

                    return (
                        <button
                            key={service.name}
                            onClick={() => onSelect(service)}
                            className={`border-2 rounded-lg p-3 flex flex-col items-center justify-center space-y-2 transition-all duration-200 focus:outline-none focus:ring-2 ${classes.ring} ${buttonClasses}`}
                        >
                            <IconComponent />
                            <span className="text-xs font-medium capitalize">{service.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};