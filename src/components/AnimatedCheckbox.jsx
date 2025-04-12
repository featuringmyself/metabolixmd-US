import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedCheckbox Component
 * 
 * A reusable checkbox component with built-in animations for micro-interactions
 * 
 * @param {Object} props
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {Function} props.onChange - Change handler function
 * @param {React.ReactNode} props.label - Checkbox label
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.className - Additional CSS classes
 */
const AnimatedCheckbox = ({ 
  checked = false, 
  onChange, 
  label,
  disabled = false,
  className = '',
  ...props
}) => {
  // Animation variants for the checkbox container
  const containerVariants = {
    checked: { 
      backgroundColor: '#365e56',
      borderColor: '#365e56',
      color: 'white',
      transition: { duration: 0.2 }
    },
    unchecked: { 
      backgroundColor: 'white',
      borderColor: '#e5e7eb',
      color: '#1f2937',
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.02,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderColor: checked ? '#365e56' : '#6d8a84',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Animation variants for the checkmark
  const checkmarkVariants = {
    checked: { opacity: 1, scale: 1 },
    unchecked: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.label
      className={`flex items-center p-3 md:p-4 gap-3 border rounded-lg cursor-pointer transition-all duration-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      variants={containerVariants}
      initial={checked ? 'checked' : 'unchecked'}
      animate={checked ? 'checked' : 'unchecked'}
      whileHover={disabled ? {} : 'hover'}
      whileTap={disabled ? {} : 'tap'}
    >
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          className="form-checkbox min-h-[20px] min-w-[20px] md:min-h-[24px] md:min-w-[24px] accent-[#6d8a84] rounded-full opacity-0 absolute"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <motion.div 
          className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] border-2 rounded-full flex items-center justify-center"
          variants={containerVariants}
          initial={checked ? 'checked' : 'unchecked'}
          animate={checked ? 'checked' : 'unchecked'}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            variants={checkmarkVariants}
            initial={checked ? 'checked' : 'unchecked'}
            animate={checked ? 'checked' : 'unchecked'}
            className="text-white"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </motion.svg>
        </motion.div>
      </div>
      <span className="text-sm md:text-base">{label}</span>
    </motion.label>
  );
};

export default AnimatedCheckbox;