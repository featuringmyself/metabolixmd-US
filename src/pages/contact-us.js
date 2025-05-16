import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaClock, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import Lenis from '@studio-freight/lenis';

const ContactUs = () => {
    const lenisRef = useRef()

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenisRef.current?.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenisRef.current?.destroy()
        }
    }, [])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            lenisRef.current?.scrollTo(element, {
                offset: -100,
                duration: 1.5,
            })
        }
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <Head><title>Contact - MetabolixMD</title></Head>
            <NavBar />
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto mt-20 p-8"
            >
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary"
                >
                    Get in Touch
                </motion.h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Customer Service Section */}
                    <motion.section 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaPhone className="text-2xl text-primary" />
                            <h2 className="text-2xl font-semibold">Customer Service</h2>
                        </div>
                        <p className="mb-6 text-gray-600">We're here to help with any questions or concerns.</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaPhone className="text-primary" />
                                <div>
                                    <p className="font-medium">US Toll-Free Numbers:</p>
                                    <ul className="space-y-1 mt-2">
                                        <li className="hover:text-primary transition-colors">1-858-4MBLXMD</li>
                                        <li className="hover:text-primary transition-colors">1-812-5MBLXMD</li>
                                        <li className="hover:text-primary transition-colors">1-518-6MBLXMD</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaEnvelope className="text-primary" />
                                <a href="mailto:consultant@metabolixmd.com" 
                                   className="hover:text-primary transition-colors">
                                    consultant@metabolixmd.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaClock className="text-primary" />
                                <p>10 AM to 7 PM CST daily</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Corporate Office Section */}
                    <motion.section 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaBuilding className="text-2xl text-primary" />
                            <h2 className="text-2xl font-semibold">Corporate Office</h2>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <FaMapMarkerAlt className="text-primary" />
                            <p>4414 82nd St, Suite 212, Lubbock, TX 79424</p>
                        </div>
                    </motion.section>
                </div>

                {/* Partner Pharmacies Section */}
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mt-8 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Our Partner Pharmacies</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <h3 className="text-xl font-medium text-primary mb-3">Grand Ave Pharmacy (GAP)</h3>
                            <div className="space-y-2 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-primary" />
                                    1615 Grand Ave Pkwy #104, Pflugerville, TX 78660
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaPhone className="text-primary" />
                                    +1 (512) 377-1999
                                </p>
                                <p className="mt-4">
                                    <span className="font-medium">Service Areas: </span>
                                    Arizona, Pennsylvania, Wisconsin, Texas, Illinois
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <h3 className="text-xl font-medium text-primary mb-3">CasaPharma RX</h3>
                            <div className="space-y-2 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-primary" />
                                    12855 Capricorn St, Stafford, Texas 77477
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaPhone className="text-primary" />
                                    +1 (877) 937-6868
                                </p>
                                <p className="mt-4">
                                    <span className="font-medium">Service Areas: </span>
                                    Georgia, New Mexico, Nevada, Alabama, Oklahoma, Michigan, Minnesota, Utah, Kentucky
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Add scroll-to-top button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => lenisRef.current?.scrollTo(0, { duration: 1.5 })}
                    className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 10l7-7m0 0l7 7m-7-7v18" 
                        />
                    </svg>
                </motion.button>
            </motion.div>

            {/* Add scroll animations to sections */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
            </motion.div>
            <Footer paddingTop='pt-[3rem] mt-[8rem] '/>
        </div>
    );
};

export default ContactUs;
