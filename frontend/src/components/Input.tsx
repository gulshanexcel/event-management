import React from 'react';
interface InputProps {
  type: 'textarea' | 'select' | 'datetime-local' | 'email' | 'text' | 'date' | 'number' | 'password';
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  options?: string[]; // Used for the select input type
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}
const Input = ({
  type,
  variant = 'primary',
  size = 'medium',
  options = [],
  placeholder,
  value,
  onChange,
  className = '',
}: InputProps) => {
  const variantClass = variant === 'primary'
    ? 'border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-300'
    : 'border border-gray-300 bg-gray-100 text-gray-800 focus:ring-2 focus:ring-gray-400';
  const sizeClass = (() => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'medium':
        return 'px-4 py-3 text-base';
      case 'large':
        return 'px-5 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  })();
  const baseClass = `w-full rounded-lg outline-none transition-all duration-200 ease-in-out ${variantClass} ${sizeClass} ${className}`;
  if (type === 'textarea') {
    return (
      <textarea
        className={`${baseClass} resize-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (type === 'select') {
    return (
      <select
        className={baseClass}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={type}
      className={baseClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
export default Input;