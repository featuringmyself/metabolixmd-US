import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Type2Diabetes = ({ onNext, onBack }) => {
    const [activeTab, setActiveTab] = useState(() => {
  const savedTab = localStorage.getItem('Type2Diabetes_activeTab');
  return savedTab ? JSON.parse(savedTab) : "";
})

    const handleTab = (e) => {
        const tab = e.currentTarget.id;
  setActiveTab(tab);
  localStorage.setItem('Type2Diabetes_activeTab', JSON.stringify(tab))
    }

    const handleContinue = () => {
        const data = {
            type_2_diabetes: activeTab
        }
        // Save to localStorage for persistence
        localStorage.setItem('Type2Diabetes_data', JSON.stringify(data));
        onNext(data, "diabeticRetinopathy")  // Pass the data and move to the next step
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full p-5 md:p-0 mx-auto max-w-3xl"
        >
            <AnimatePresence mode='wait'>
                <div className="space-y-8 md:space-y-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Do you currently have or have you ever been diagnosed with type 2 diabetes?
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-2">
                        {['yes', 'no'].map((choice, index) => (
                            <motion.div
                                key={choice}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 300 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
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
                            aria-label='Back'
                        >
                            Back
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: isButtonDisabled ? 1 : 1.02, backgroundColor: isButtonDisabled ? "" : "#2e4f49" }}
                            whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
                            type="button"
                            className={`flex-1 p-3 text-white font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                            onClick={handleContinue}
                            disabled={isButtonDisabled}
                            aria-label='Continue'
                        >
                            Continue
                        </motion.button>
                    </div>
                </div>
            </AnimatePresence>
        </motion.div>
    )
}

export default Type2Diabetes
