import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LabTestedSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="my-16 md:my-32 max-w-[1600px] mx-auto px-4 md:px-6"
    >
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 py-6"
      >
        <div className="flex flex-col md:flex-row">
          {/* Text Content */}
          <div className="md:w-1/3 p-8 md:p-10 pt-12 flex flex-col justify-start">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-zinc-800 leading-tight">
              Lab tested <br />&amp; Certified
            </h2>
            <p className="text-zinc-600 text-sm md:text-base">
              Filled the shipped same day as your appointment
            </p>
          </div>
          
          {/* Images Container */}
          <div className="md:w-2/3 flex flex-row md:flex-row md:justify-end relative">
            {/* Main Lab Image - Made thinner and taller */}
            <div className="relative w-1/2 md:w-2/5 h-[250px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-2xl mr-2 md:mr-0">
              <Image 
                src="/images/lab-doctor.jpg" 
                alt="Lab doctor working with medical samples"
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Medication Vials with Checks - With gap and affixed to top */}
            <div className="relative w-1/2 md:w-3/5 h-[250px] md:h-[400px] md:mt-0 flex items-start justify-center overflow-hidden">
              <div className="w-full h-full pt-4 md:pt-8">
                <Image 
                  src="/images/checks.png" 
                  alt="Quality check indicators for medications"
                  fill
                  sizes="(max-width: 768px) 50vw, 60vw"
                  className="object-contain p-2 md:p-4"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LabTestedSection;