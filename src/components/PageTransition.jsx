import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '@/lib/animation';

/**
 * PageTransition Component
 * 
 * A wrapper component that adds smooth page transitions to any page or component.
 * Uses the animation variants defined in the animation utility file.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped with transition effects
 * @param {Object} props.variants - Optional custom animation variants
 */
const PageTransition = ({ 
  children, 
  variants = pageVariants,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;