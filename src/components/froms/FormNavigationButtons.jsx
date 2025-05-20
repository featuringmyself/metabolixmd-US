import React from 'react';
import { motion } from 'framer-motion';

const FormNavigationButtons = ({ 
  onBack, 
  onContinue, 
  isContinueDisabled = false,
  isSubmitting = false,
  continueText = "Continue",
  backText = "Back"
}) => {
  return (
    <div className="flex gap-4 mt-8">
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        className="flex-1 p-3 border border-primary text-primary hover:bg-primary/10 font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
        onClick={onBack}
        aria-label={backText}
      >
        {backText}
      </motion.button>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: isContinueDisabled ? 1 : 1.02, backgroundColor: isContinueDisabled ? "" : "#2e4f49" }}
        whileTap={{ scale: isContinueDisabled ? 1 : 0.98 }}
        type="button"
        className={`flex-1 p-3 text-white font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
          isContinueDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
        }`}
        onClick={onContinue}
        disabled={isContinueDisabled}
        aria-label={continueText}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <motion.div
              className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Submitting...
          </span>
        ) : (
          continueText
        )}
      </motion.button>
    </div>
  );
};

export default FormNavigationButtons; 