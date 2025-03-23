import React, { useState } from 'react'
import { motion } from 'framer-motion'

const GLP1 = ({onNext}) => {
    const [activeTab, setActiveTab] = useState("no")

    const handleTab = (e) => {
        setActiveTab(e.currentTarget.id)
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
                        Do you have an allergy to GLP-1 agonist medications?
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
                                            ? 'border-2 border-green-500 bg-green-50 ring-4 ring-green-100'
                                            : 'border-2 border-gray-200 hover:border-green-300 bg-white'}
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
            </AnimatePresence>
        </motion.div>
    )
}

export default GLP1