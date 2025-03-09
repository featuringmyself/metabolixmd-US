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
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10">
          {/* Doctor Image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 overflow-hidden flex-shrink-0">
            <Image 
              src="/images/lab-doctor.jpg" 
              alt="Lab doctor"
              fill
              sizes="(max-width: 768px) 100px, 160px"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Check Icon in the middle */}
          <div className="mx-4 md:mx-8 my-4 md:my-0">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#365D56] flex items-center justify-center flex-shrink-0 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="text-center md:text-left md:flex-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-zinc-800">
              Lab tested & Certified
            </h2>
            <p className="text-zinc-600 text-sm md:text-base">
              Filled the shipped same day as your appointment
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LabTestedSection;