import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, size = 'default', variant = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'px-4 py-2',
      sm: 'px-3 py-1 text-sm',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      ghost: 'text-blue-600 hover:bg-blue-50',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };