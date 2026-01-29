import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center transition-all duration-200 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-salon-black text-white hover:bg-salon-dark shadow-sm active:transform active:scale-95",
    secondary: "bg-salon-light text-salon-black hover:bg-gray-200",
    outline: "border border-salon-black text-salon-black hover:bg-salon-light",
    ghost: "text-salon-gray hover:text-salon-black hover:bg-gray-50",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded",
    md: "text-sm px-5 py-2.5 rounded-md",
    lg: "text-base px-8 py-3 rounded-lg",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
};
