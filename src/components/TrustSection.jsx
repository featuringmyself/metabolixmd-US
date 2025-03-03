import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TrustSection = () => {
  // Animation variants
  const fadeInUp = {
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

  // Trust points data
  const trustPoints = [
    {
      id: 1,
      icon: "/images/orange-icon.webp",
      title: "Same-Day Appointments",
      description: "Connect with our medical team quickly and start your weight loss journey without delay."
    },
    {
      id: 2,
      icon: "/images/orange-icon.webp",
      title: "Licensed Physicians",
      description: "Our team of US-based, board-certified physicians provide expert care tailored to your needs."
    },
    {
      id: 3,
      icon: "/images/orange-icon.webp",
      title: "FDA-Approved Medications",
      description: "We only prescribe medications that have been thoroughly tested and approved by the FDA."
    },
    {
      id: 4,
      icon: "/images/orange-icon.webp",
      title: "Affordable Plans",
      description: "Access quality weight loss care with transparent pricing and no hidden fees."
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildren}
      className="font-montserrat px-4 md:px-6 mx-auto max-w-[1600px] my-16 md:my-32"
    >
      <motion.div 
        variants={fadeInUp}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-7xl font-medium leading-[1.1] mb-6">
          Why Thousands Trust Us
        </h2>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Join the thousands of patients who have transformed their lives with our comprehensive weight loss program.
        </p>
      </motion.div>

      <motion.div 
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {trustPoints.map((point) => (
          <motion.div
            key={point.id}
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Image 
                src={point.icon} 
                alt={point.title}
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-zinc-800">{point.title}</h3>
            <p className="text-zinc-600">{point.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TrustSection;