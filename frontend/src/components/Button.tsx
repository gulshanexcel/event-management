interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  className = '',
  type = 'button',
  disabled
}: ButtonProps) => {
  const variantClass = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-500'
    : 'border border-gray-300 text-gray-700 hover:bg-gray-200';
  
  const sizeClass = (() => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'medium':
        return 'px-5 py-2.5 text-base';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-5 py-2.5 text-base';
    }
  })();

  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-lg active:scale-95 font-semibold transition-transform duration-200 ${variantClass} ${sizeClass} ${className} disabled:opacity-50`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;