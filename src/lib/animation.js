/**
 * Animation Utilities for MetabolixMD
 * 
 * This file contains reusable animation variants and utilities
 * to ensure consistent microinteractions across the website.
 */

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Staggered children animation variants
export const childVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Fade in animation variants
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Slide in from left animation variants
export const slideInLeftVariants = {
  initial: { x: -50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  },
  exit: { 
    x: -50, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Slide in from right animation variants
export const slideInRightVariants = {
  initial: { x: 50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  },
  exit: { 
    x: 50, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Scale animation variants
export const scaleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Hover animation variants
export const hoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Button animation variants
export const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 2px 3px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.1 }
  }
};

// Card animation variants
export const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  },
  hover: { 
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  },
  tap: { 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.1 }
  }
};

// List item stagger animation
export const listContainerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

export const listItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 20 
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: { duration: 0.2 }
  }
};

// Scroll animation utilities
export const scrollRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Transition presets
export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 20 },
  smooth: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  quick: { duration: 0.2, ease: "easeOut" }
};

// Animation utility functions
export const staggerChildren = (delay = 0.1) => ({
  animate: { 
    transition: { 
      staggerChildren: delay 
    } 
  }
});

export const delayedFadeIn = (delay = 0.2) => ({
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      delay,
      duration: 0.4 
    } 
  }
});

// Page transition wrapper for Next.js pages
export const withPageTransition = (Component) => {
  return function WithPageTransition(props) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Component {...props} />
      </motion.div>
    );
  };
};