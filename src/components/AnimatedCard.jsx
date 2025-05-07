import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '@/lib/animation';

/**
 * AnimatedCard Component
 * 
 * A reusable card component with built-in animations for micro-interactions
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.variants - Custom animation variants
 * @param {Function} props.onClick - Click handler function
 */
const AnimatedCard = ({ 
  children, 
  className = '',
  variants = cardVariants,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;