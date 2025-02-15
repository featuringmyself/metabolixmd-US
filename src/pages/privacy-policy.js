import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-white">
            <Head><title>Privacy Policy - MetabolixMD</title></Head>
            <NavBar />
            
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full bg-primary/5 mt-20 py-16"
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-montserrat text-center">
                        Privacy Policy
                    </h1>
                    <p className="text-center text-gray-600 mt-4 font-poppins">
                        Last Updated: January 13, 2025
                    </p>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="flex-grow max-w-[1920px] mx-auto px-4 py-12 w-full"
            >
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-white rounded-2xl shadow-soft p-8 lg:p-12 border border-primary/5">
                        <div className="space-y-8 font-poppins">
                            {/* Introduction */}
                            <motion.section variants={fadeIn} className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    MetabolixMD ("we," "our," or "us") is dedicated to safeguarding your privacy and ensuring the security of your Protected Health Information (PHI). This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website [www.metabolixmd.com] and utilize our telehealth services.
                                </p>
                            </motion.section>

                            {/* Information Collection */}
                            <motion.section variants={fadeIn} className="prose max-w-none">
                                <div className="bg-primary/5 rounded-xl">
                                    <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                                <h3 className="text-lg font-medium text-primary mb-3">Personal Information</h3>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li>Name, address, email</li>
                                                    <li>Phone number</li>
                                                    <li>Date of birth</li>
                                                    <li>Payment details</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                                <h3 className="text-lg font-medium text-primary mb-3">Health Information</h3>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li>Medical history</li>
                                                    <li>Treatment plans</li>
                                                    <li>Prescriptions</li>
                                                    <li>Health-related data</li>
                                                </ul>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                                <h3 className="text-lg font-medium text-primary mb-3">Technical Data</h3>
                                                <ul className="space-y-2 text-gray-700">
                                                    <li>IP address</li>
                                                    <li>Browser type</li>
                                                    <li>Access times</li>
                                                    <li>Pages viewed</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* How We Use Information */}
                            <motion.section variants={fadeIn} className="bg-primary/5 p-8 rounded-xl">
                                <h2 className="text-2xl font-semibold mb-6 text-primary">How We Use Your Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <h3 className="font-medium text-primary mb-3">Healthcare Services</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>Deliver telehealth consultations</li>
                                            <li>Process prescriptions</li>
                                            <li>Manage appointments</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-sm">
                                        <h3 className="font-medium text-primary mb-3">Communication</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>Send appointment reminders</li>
                                            <li>Provide health tips</li>
                                            <li>Respond to inquiries</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Data Security */}
                            <motion.section variants={fadeIn} className="bg-white border border-gray-100 p-8 rounded-xl">
                                <h2 className="text-2xl font-semibold mb-6 text-primary">Data Security</h2>
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <p className="text-gray-700 mb-4">
                                        We implement comprehensive safeguards to protect your information:
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <h3 className="font-medium text-primary mb-2">Technical</h3>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>Data encryption</li>
                                                <li>Secure servers</li>
                                                <li>Firewalls</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <h3 className="font-medium text-primary mb-2">Administrative</h3>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>Access controls</li>
                                                <li>Staff training</li>
                                                <li>Regular audits</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <h3 className="font-medium text-primary mb-2">Physical</h3>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>Secure facilities</li>
                                                <li>Monitored access</li>
                                                <li>Backup systems</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Contact Section */}
                            <motion.section variants={fadeIn} className="bg-primary/5 p-8 rounded-xl">
                                <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Contact Us</h2>
                                <div className="max-w-2xl mx-auto text-center">
                                    <p className="text-gray-700 mb-6">
                                        For questions about our privacy practices or to exercise your rights:
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                        <a 
                                            href="mailto:consultant@metabolixmd.com"
                                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                                        >
                                            <span>📧</span>
                                            consultant@metabolixmd.com
                                        </a>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span>📍</span>
                                            9808 Topeka Ave, Lubbock, Texas 79424
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;