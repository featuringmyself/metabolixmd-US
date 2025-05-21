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
        <div className="min-h-screen flex flex-col bg-white">
            <Head><title>Privacy Policy - MetabolixMD</title></Head>
            <NavBar />
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full border-b border-gray-200 mt-20 py-12"
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-serif text-gray-900 text-center">
                        Privacy Policy
                    </h1>
                    <p className="text-center text-gray-600 mt-4 font-serif">
                        Effective Date: January 13, 2025
                    </p>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full"
            >
                <div className="prose prose-lg max-w-none">
                    {/* Introduction */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <p className="text-gray-800 leading-relaxed">
                            MetabolixMD ("we," "our," or "us") is dedicated to safeguarding your privacy and ensuring the security of your Protected Health Information (PHI). This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website [www.metabolixmd.com] and utilize our telehealth services. By accessing or using our services, you agree to the terms outlined in this policy.
                        </p>
                    </motion.section>

                    {/* Information Collection */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">1. Information We Collect</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">1.1 Personal Information</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Name, address, email</li>
                                    <li>Phone number</li>
                                    <li>Date of birth</li>
                                    <li>Payment details</li>
                                </ul>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">1.2 Health Information</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Medical history</li>
                                    <li>Treatment plans</li>
                                    <li>Prescriptions</li>
                                    <li>Health-related data</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">1.3 Technical Data</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>IP address</li>
                                    <li>Browser type</li>
                                    <li>Access times</li>
                                    <li>Pages viewed</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* How We Use Information */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">2. How We Use Your Information</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">2.1 Healthcare Services</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Deliver telehealth consultations</li>
                                    <li>Process prescriptions</li>
                                    <li>Manage appointments</li>
                                </ul>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">2.2 Communication</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Send appointment reminders</li>
                                    <li>Provide health tips</li>
                                    <li>Respond to inquiries</li>
                                </ul>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">2.3 Compliance</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Adhere to legal obligations</li>
                                    <li>Follow HIPAA regulations</li>
                                    <li>Maintain compliance records</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Disclosure Section */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">3. Disclosure of Your Information</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">3.1 Healthcare Partners</h3>
                                <p className="text-gray-800">Such as CASA Pharma RX and GAP (Grand Ave Pharmacy) for prescription fulfillment.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">3.2 Service Providers</h3>
                                <p className="text-gray-800">Entities that assist with payment processing, IT support, and other operational services.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">3.3 Legal Requirements</h3>
                                <p className="text-gray-800">When required by law or to protect our rights.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">3.4 Authorization</h3>
                                <p className="text-gray-800">With your explicit written authorization, where required under HIPAA.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Data Security */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">4. Data Security</h2>
                        <p className="text-gray-800 mb-6">
                            We implement administrative, physical, and technical safeguards to protect your information, including:
                        </p>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">4.1 Technical Safeguards</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Data encryption</li>
                                    <li>Secure servers</li>
                                    <li>Firewalls</li>
                                </ul>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">4.2 Administrative Safeguards</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Access controls</li>
                                    <li>Staff training</li>
                                    <li>Regular audits</li>
                                </ul>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">4.3 Physical Safeguards</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Secure facilities</li>
                                    <li>Monitored access</li>
                                    <li>Backup systems</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-gray-800 mt-6">
                            Our services are hosted on Amazon Web Services (AWS), which complies with HIPAA regulations to ensure the confidentiality, integrity, and availability of your PHI.
                        </p>
                    </motion.section>

                    {/* Your Rights */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">5. Your Rights</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">5.1 Access</h3>
                                <p className="text-gray-800">Request access to your personal and health information.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">5.2 Correction</h3>
                                <p className="text-gray-800">Request corrections to any inaccurate or incomplete information.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">5.3 Deletion</h3>
                                <p className="text-gray-800">Request the deletion of your information, subject to legal constraints.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">5.4 Accounting of Disclosures</h3>
                                <p className="text-gray-800">Request a record of certain disclosures of your PHI as permitted under HIPAA.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">5.5 Restrictions</h3>
                                <p className="text-gray-800">Request restrictions on how we use or disclose your PHI for certain purposes.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">5.6 Confidential Communications</h3>
                                <p className="text-gray-800">Request communications through alternative means or locations.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Cookies and Tracking */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">6. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-800">
                            We use cookies to enhance user experience. You can adjust your browser settings to refuse cookies; however, this may affect the functionality of our website.
                        </p>
                    </motion.section>

                    {/* Third-Party Links */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">7. Third-Party Links</h2>
                        <p className="text-gray-800">
                            Our website may contain links to third-party sites. We are not responsible for their privacy practices.
                        </p>
                    </motion.section>

                    {/* Changes to Policy */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">8. Changes to This Privacy Policy</h2>
                        <p className="text-gray-800">
                            We may update this policy periodically. We will notify you of significant changes by posting the new policy on our website.
                        </p>
                    </motion.section>

                    {/* Contact Section */}
                    <motion.section variants={fadeIn} className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">9. Contact Us</h2>
                        <p className="text-gray-800 mb-6">
                            For questions about our privacy practices or to exercise your rights:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-800">
                                <span className="font-serif">Email:</span>
                                <a href="mailto:consultant@metabolixmd.com" className="text-blue-600 hover:underline">
                                    consultant@metabolixmd.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-800">
                                <span className="font-serif">Address:</span>
                                <span>9808 Topeka Ave, Lubbock, Texas 79424</span>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </motion.div>

            <Footer paddingTop="md:mt-14 mt-20 pt-16 p-8" address={false}/>
        </div>
    );
};

export default PrivacyPolicy;