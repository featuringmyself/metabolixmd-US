/**
 * animations.js
 * 
 * This file contains reusable animation variants and utility functions
 * for implementing consistent microinteractions across the website.
 */

// Basic hover animations for interactive elements
export const hoverScale = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

// More subtle hover for smaller elements
export const subtleHover = {
  initial: { scale: 1 },
  hover: { scale: 1.01, transition: { duration: 0.2 } },
  tap: { scale: 0.99, transition: { duration: 0.1 } },
};

// Button hover effects
export const buttonHover = {
  initial: { scale: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' },
  hover: { 
    scale: 1.02, 
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
    transition: { duration: 0.2 } 
  },
  tap: { 
    scale: 0.98, 
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)', 
    transition: { duration: 0.1 } 
  },
};

// Card hover effects
export const cardHover = {
  initial: { y: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  hover: { 
    y: -5, 
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)', 
    transition: { duration: 0.3 } 
  },
};

// Input focus animations
export const inputFocus = {
  initial: { boxShadow: 'none' },
  focus: { 
    boxShadow: '0 0 0 2px rgba(83, 148, 136, 0.2)', 
    transition: { duration: 0.2 } 
  },
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// Staggered children animations
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Fade in animation for staggered children
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

// Pulse animation for notifications or highlights
export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

// Bounce animation for attention-grabbing elements
export const bounce = {
  initial: { y: 0 },
  animate: {
    y: [-5, 0, -3, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 3,
    },
  },
};

// Rotate animation for loading indicators
export const rotate = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Shimmer effect for loading states
export const shimmer = {
  initial: { backgroundPosition: '-500px 0' },
  animate: {
    backgroundPosition: ['500px 0', '-500px 0'],
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1.5,
      ease: 'linear',
    },
  },
};

// Success animation (checkmark)
export const success = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Error animation (shake)
export const shake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

// Tooltip animation
export const tooltip = {
  initial: { opacity: 0, y: 5, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2 } 
  },
  exit: { 
    opacity: 0, 
    y: 5, 
    scale: 0.95, 
    transition: { duration: 0.1 } 
  },
};

// Utility function to combine animation variants
export const combineVariants = (...variants) => {
  return variants.reduce((combined, variant) => {
    Object.keys(variant).forEach(key => {
      if (!combined[key]) {
        combined[key] = { ...variant[key] };
      } else {
        combined[key] = { ...combined[key], ...variant[key] };
      }
    });
    return combined;
  }, {});
};