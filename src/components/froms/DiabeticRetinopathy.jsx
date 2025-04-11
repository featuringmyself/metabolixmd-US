import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DiabeticRetinopathy = ({ onNext, onBack }) => {
    const [activeTab, setActiveTab] = useState(() => {
  const savedTab = localStorage.getItem('DiabeticRetinopathy_activeTab');
  try {
    return savedTab ? JSON.parse(savedTab) : "";
  } catch (e) {
    return "";
  };
});

    const handleTab = (e) => {
  const tab = e.currentTarget.id;
  setActiveTab(tab);
  localStorage.setItem('DiabeticRetinopathy_activeTab', JSON.stringify(tab));
}

    const handleContinue = () => {
        const data = {
            diabetic: activeTab
        };
        // Save to localStorage for persistence
        localStorage.setItem('DiabeticRetinopathy_data', JSON.stringify(data));
        onNext(data, "anyDisease2"); // Pass the data and move to the next step
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const isButtonDisabled = !activeTab; // Disable if no tab is selected

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full p-5 md:p-0 mx-auto max-w-3xl"
        >
            <AnimatePresence mode='wait'>
                <div className="space-y-8 md:space-y-10">
                    <motion.h2
                        variants={fadeIn}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Do you currently have or have you ever been diagnosed with diabetic retinopathy?
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-2">
                        {['yes', 'no'].map((choice) => (
                            <motion.div
                                key={choice}
                                variants={fadeIn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <button
                                    id={choice}
                                    onClick={handleTab}
                                    className={`w-full text-left p-6 md:p-7 rounded-xl transition-all
                                        ${activeTab === choice 
                                            ? 'border-2 border-primary-500 bg-primary-50 ring-4 ring-primary-100'
                                            : 'border-2 border-gray-200 hover:border-primary-300 bg-white'}
                                        shadow-sm hover:shadow-md`}
                                >
                                    <span className="text-lg md:text-xl font-semibold text-gray-800">
                                        {choice === 'yes' ? 'Yes' : 'No'}
                                    </span>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Container for the back and continue buttons */}
          <div className="flex justify-center gap-4 mt-6">
            {/* Back button - only shown if not the first form */}
            
              <button
                type="button"
                className="hover:bg-gray-200 px-8 py-3 text-gray-700 font-semibold rounded-full border border-gray-300"
                onClick={onBack}
                aria-label="Back"
              >
                Back
              </button>
            
            {/* Continue button - disabled when no goals are selected */}
            <button
              type="button"
              className={`hover:bg-primary/90 px-8 py-3 text-white font-semibold rounded-full ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed" // Gray styling when disabled
                  : "bg-primary hover:bg-primary"    // Primary color when enabled
              }`}
              disabled={isButtonDisabled}
              onClick={handleContinue} // Trigger the continue action
              aria-label="Continue"
            >
              Continue
            </button>
          </div>
            </AnimatePresence>
        </motion.div>
    );
}

export default DiabeticRetinopathy;
