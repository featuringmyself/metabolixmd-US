import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { scrollRevealVariants } from '@/lib/animation';

/**
 * ScrollReveal Component
 * 
 * A wrapper component that animates its children when they enter the viewport.
 * Uses the animation variants defined in the animation utility file.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be animated on scroll
 * @param {Object} props.variants - Optional custom animation variants
 * @param {number} props.threshold - Visibility threshold (0-1) for triggering animation
 * @param {string} props.className - Additional CSS classes
 */
const ScrollReveal = ({ 
  children, 
  variants = scrollRevealVariants,
  threshold = 0.1,
  className = '',
  ...props 
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold, once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;