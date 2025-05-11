import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const GLP1Section = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildren}
      className="-mt-32 pt-32 pb-12 bg-[#365D56] w-full  text-white shadow-lg transform transition-all duration-300 hover:shadow-xl relative -z-10"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24">
        {/* Header Section */}
        <motion.div 
          variants={fadeIn}
          className="mb-16 md:mb-20 flex md:items-center md:flex-row flex-col md:justify-between gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-medium mb-4 leading-tight">
            Understanding<br />GLP-1 Drugs
          </h2>
          <p className="text-base opacity-90 md:w-[40%] leading-relaxed">
            GLP-1 receptor agonists are transforming the way we approach weight management. These medications mimic a natural hormone in your body to regulate blood sugar, slow digestion, and reduce appetite. The result? Effective weight loss, improved metabolism, and even cardiovascular benefits. 
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          variants={fadeIn}
          className="bg-white text-black rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl md:py-10 py-0"
        >
          {/* How GLP-1 Drugs Work Section */}
          <div className="p-8 md:p-16 lg:p-24">
            <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/2 flex flex-col md:text-start text-center md:items-start md:justify-start items-center justify-center">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-medium text-zinc-800 mb-6 w-[90%] tracking-tight "
                >
                  How GLP-1 Drugs Works
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-[#626262] mb-8 w-full md:w-[90%] leading-relaxed"
                >
                  GLP-1 drugs help regulate blood sugar, slow digestion, and curb appetite. They trigger insulin production when needed, reduce the hormone that raises blood sugar, and keep food in the stomach longer, leading to increased fullness and lower calorie intake.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href="/get-started" 
                    className="inline-block bg-[#365D56] text-white px-8 py-3 rounded-full hover:bg-[#2e4f49] transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  >
                    Start your Journey
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2 flex justify-center items-center relative">
                {/* Container with floating effect */}
                <div className="relative w-full max-w-[500px] h-[400px] md:h-[500px]">
                  
                  
                  {/* Floating medication image */}
                  <div className="absolute md:-top-20 right-0 top-10 w-[280px] md:w-[350px] h-[350px] md:h-[450px] overflow-hidden z-50 "
                  >
                      <Image 
                        src="/images/41.webp" 
                        alt="GLP-1 Medication" 
                        fill 
                        className="object-contain transition-all duration-700 "
                      />
                      
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Methods Section */}
          <div className="p-8 md:p-0 text-start flex flex-col justify-center items-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-medium text-zinc-800 mb-6 leading-tight"
            >
              GLP-1 Delivery Methods
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#626262] mb-12 w-[95%] md:w-[80%] md:text-center text-start leading-relaxed hidden md:block"
            >
              GLP-1 medications come in different forms, but they all work toward the same goal - supporting weight management and metabolic health. These treatments are typically delivered through vials with syringes or auto-injectors and can be self-administered. Each method ensures effective absorption, allowing the medication to work efficiently in your body. During your consultation with one of our healthcare professionals, we will help determine the best option for you.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full md:max-w-4xl mt-5">
              {/* Vial & Syringe Option */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-[#F98F4C] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group min-h-[400px] md:min-h-[500px]"
                
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="absolute md:right-[-2vw] -right-10 w-[60vw] h-[60vw] md:w-[350px] md:h-[350px] transform translate-x-[10%] -translate-y-[5%] group-hover:translate-y-[-12%] transition-transform duration-500"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image 
                    src="/images/41.webp" 
                    alt="Vial and Syringe" 
                    fill 
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
                <div className="p-8 pt-6 pb-8 flex flex-col h-full justify-end items-start text-start">
                  <div className="mt-auto">
                    <h4 className="md:text-2xl text-xl font-semibold text-black drop-shadow-sm">Vial & Syringe</h4>
                    <p className="text-black/90 text-sm md:max-w-[80%] w-full leading-relaxed md:my-2 my-1">
                    A more traditional method, requiring manual dosage preparation before injection.
                    </p>
                  </div>
                  <div className="text-center">
                    <Link 
                      href="/safety-information"
                      className="inline-block text-sm md:px-2 md:py-2 py-0 text-black font-medium underline underline-offset-2"
                    >
                      Important Safety Information
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Auto-Injectors Option */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative bg-[#365D56] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group min-h-[400px] md:min-h-[500px]"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-[60vw] h-[60vw] md:w-[350px] md:h-[350px] transform translate-x-[5%] -translate-y-[5%] group-hover:translate-y-[-12%] transition-transform duration-500"
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image 
                    src="/images/42-inverted.webp" 
                    alt="Auto-Injector Pen" 
                    fill 
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
                <div className="p-8 pt-6 pb-8 flex flex-col h-full justify-end items-start text-start">
                  <div className="mt-auto">
                    <h4 className="md:text-2xl text-xl font-semibold text-white drop-shadow-sm">Auto-injectors</h4>
                    <p className="text-white/90 text-sm md:max-w-[80%] w-full leading-relaxed md:my-2 my-1">
                    Designed for quick and seamless administration, often with a single-use format.
                    </p>
                  </div>
                  <div className="text-center">
                    <Link 
                      href="/safety-information"
                      className="inline-block text-sm md:px-2 px-0 md:py-2 py-0 text-white font-medium underline underline-offset-2"
                    >
                      Important Safety Information
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#626262] mb-12 w-[95%] md:w-[80%] md:text-center text-start leading-relaxed block md:hidden"
            >
              GLP-1 medications come in different forms, but they all work toward the same goal - supporting weight management and metabolic health. These treatments are typically delivered through vials with syringes or auto-injectors and can be self-administered. Each method ensures effective absorption, allowing the medication to work efficiently in your body. During your consultation with one of our healthcare professionals, we will help determine the best option for you.
            </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GLP1Section;