import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedInput Component
 * 
 * A reusable input component with built-in animations for micro-interactions
 * 
 * @param {Object} props
 * @param {string} props.type - Input type (text, number, etc)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.label - Input label
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 */
const AnimatedInput = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  label,
  required = false,
  error,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="w-full">
      {label && (
        <motion.label 
          className="block text-gray-700 font-medium mb-2 text-left"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      
      <motion.div
        className="relative"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 ${value ? 'bg-white' : 'bg-[#ebf4f1]'} ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          animate={{
            scale: isFocused ? 1.01 : 1,
            boxShadow: isFocused ? '0 0 0 2px rgba(83, 148, 136, 0.2)' : 'none'
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {error && (
          <motion.p 
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedInput;