import React from 'react';

interface AlertProps {
    type: 'error' | 'success' | 'info';
    message: string;
    onClose?: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
    const typeClass = (() => {
        switch (type) {
            case 'error':
                return 'bg-red-100 text-red-700';
            case 'success':
                return 'bg-green-100 text-green-700';
            case 'info':
                return 'bg-blue-100 text-blue-700';
            default:
                return '';
        }
    })();

    return (
        <div className={`p-4 rounded flex items-center mb-8 ${typeClass}`}>
            <span className="flex-grow">{message}</span>
            {onClose && (
                <button
                    className="text-lg font-bold ml-4 focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Alert;
