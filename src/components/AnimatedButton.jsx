import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedButton Component
 * 
 * A reusable button component with built-in animations for micro-interactions
 * 
 * @param {Object} props
 * @param {string} props.type - Button type (primary, secondary)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.ariaLabel - Accessibility label
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const AnimatedButton = ({ 
  type = 'primary', 
  disabled = false, 
  onClick, 
  ariaLabel,
  children,
  className = '',
  ...props
}) => {
  // Define button variants based on type
  const getButtonClass = () => {
    const baseClasses = 'py-3 font-semibold rounded-full transition-all duration-300 shadow-sm';
    
    if (disabled) {
      return `${baseClasses} bg-gray-400 text-white cursor-not-allowed`;
    }
    
    switch (type) {
      case 'primary':
        return `${baseClasses} bg-primary text-white hover:bg-primary/90`;
      case 'secondary':
        return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-200`;
      default:
        return `${baseClasses} bg-primary text-white hover:bg-primary/90`;
    }
  };

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${getButtonClass()} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;