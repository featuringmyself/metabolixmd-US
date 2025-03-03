import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DiabeticRetinopathy = ({ onNext }) => {
    const [activeTab, setActiveTab] = useState("");

    const handleTab = (e) => {
        setActiveTab(e.currentTarget.id);
    }

    const handleContinue = () => {
        const data = {
            diabetic: activeTab
        };
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
            className="w-full p-5 md:p-0 md:max-w-fit mx-auto"
        >
            <div className="w-full md:w-[500px]">
                <motion.h2 
                    variants={fadeIn}
                    className="text-2xl mb-6 text-primary font-semibold"
                >
                    Do you currently have or have you ever been diagnosed with diabetic retinopathy?
                </motion.h2>
                <motion.p 
                    variants={fadeIn}
                    className='text-zinc-500 font-semibold mb-6'
                >
                    We want to make sure there is a provider overseeing your overall care
                </motion.p>

                <motion.div 
                    variants={fadeIn}
                    whileHover={{ scale: activeTab === "yes" ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTab} 
                    id="yes" 
                    className={`bg-white cursor-pointer border rounded-xl p-4 text-lg font-semibold mt-4 transition-all duration-300 shadow-sm hover:shadow-md ${activeTab === "yes" ? "border-primary border-2 bg-primary/5" : ""}`}
                >
                    Yes
                </motion.div>
                <motion.div 
                    variants={fadeIn}
                    whileHover={{ scale: activeTab === "no" ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTab} 
                    id="no" 
                    className={`bg-white cursor-pointer border rounded-xl p-4 text-lg font-semibold mt-4 transition-all duration-300 shadow-sm hover:shadow-md ${activeTab === "no" ? "border-primary border-2 bg-primary/5" : ""}`}
                >
                    No
                </motion.div>
                <motion.div 
                    variants={fadeIn}
                    whileHover={{ scale: activeTab === "noBut" ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTab} 
                    id="noBut" 
                    className={`bg-white cursor-pointer border rounded-xl p-4 text-lg font-semibold mt-4 transition-all duration-300 shadow-sm hover:shadow-md ${activeTab === "noBut" ? "border-primary border-2 bg-primary/5" : ""}`}
                >
                    No, I don&apos;t know
                </motion.div>
                <motion.button
                    variants={fadeIn}
                    whileHover={{ scale: isButtonDisabled ? 1 : 1.02, backgroundColor: isButtonDisabled ? "" : "#2e4f49" }}
                    whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
                    type="button"
                    className={`mt-8 p-3 text-white w-full font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                    disabled={isButtonDisabled}
                    onClick={handleContinue}
                    aria-label='Continue'
                >
                    Continue
                </motion.button>
            </div>
        </motion.div>
    );
}

export default DiabeticRetinopathy;
