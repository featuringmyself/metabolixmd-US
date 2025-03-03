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
            className="w-full p-5 md:p-0 md:max-w-fit mx-auto"
        >
            <div className="w-full md:w-[500px]">
                <motion.h2 
                    variants={fadeIn}
                    className="text-2xl mb-6 text-primary font-semibold"
                >
                   Do you have an allergy to GLP-1 agonist medications?
                </motion.h2>
               
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

                <motion.button
                    variants={fadeIn}
                    whileHover={{ scale: 1.02, backgroundColor: "#2e4f49" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="mt-8 p-3 text-white w-full py-3 font-semibold rounded-full bg-primary transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={()=>{
                        if(activeTab =="yes"){
                            onNext({allergy_GLP_1:true},"stopProcess")
                        }
                        else{
                            onNext({allergy_GLP_1:false},"anyMedication")
                        }
                    }}
                    aria-label='Continue'
                >
                    Continue
                </motion.button>
            </div>
        </motion.div>
    )
}

export default GLP1