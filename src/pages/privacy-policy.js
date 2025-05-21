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
                        Effective Date: Feb 1, 2025
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
                            At MetabolixMD, we are committed to maintaining the privacy and security of your personal, health, and sensitive information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you interact with our services, including telehealth consultations, wellness tools, pharmacy services, and digital content.
                        </p>
                        <p className="text-gray-800 leading-relaxed mt-4">
                            This policy is designed in accordance with applicable privacy laws, including but not limited to the California Consumer Privacy Act (CCPA), the Washington My Health My Data Act (MHMDA), and other relevant state and federal regulations.
                        </p>
                    </motion.section>

                    {/* Your Rights and Choices */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Your Rights and Choices</h2>
                        <p className="text-gray-800 mb-4">
                            Depending on your state of residence, you may have specific legal rights with regard to your personal and health-related data. These may include:
                        </p>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Know:</h3>
                                <p className="text-gray-800">
                                    You have the right to request information regarding the categories and specific pieces of personal information we have collected, the purposes for which we have used it, the sources of that information, and third parties with whom it has been shared.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Access:</h3>
                                <p className="text-gray-800">
                                    You may request access to your personal information collected and maintained by MetabolixMD.
                                </p>
                            </div>

                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Deletion:</h3>
                                <p className="text-gray-800">
                                    You may request that we delete your personal information, subject to legal exceptions (such as information necessary to fulfill our legal or contractual obligations).
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Correct:</h3>
                                <p className="text-gray-800">
                                    You may request corrections to inaccurate or outdated personal information maintained by us.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Opt-Out of Sale or Sharing:</h3>
                                <p className="text-gray-800">
                                    If applicable, you may opt out of the sale or cross-context behavioral sharing of your personal information.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Limit Use of Sensitive Personal Data:</h3>
                                <p className="text-gray-800">
                                    If we collect sensitive personal information, you may request that we limit its use to essential service functions only.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Right to Non-Discrimination:</h3>
                                <p className="text-gray-800">
                                    We will not discriminate against you for exercising any of your privacy rights.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* How to Exercise Your Rights */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">How to Exercise Your Rights</h2>
                        <p className="text-gray-800 mb-4">
                            You may exercise your rights by contacting us at:
                        </p>
                        <p className="text-gray-800">
                            Email: <a href="mailto:consultant@metabolixmd.com" className="text-blue-600 hover:underline">consultant@metabolixmd.com</a>
                        </p>
                        <p className="text-gray-800 mt-4">
                            We may need to verify your identity before fulfilling your request to ensure the security of your data. If an authorized agent is submitting the request on your behalf, we may require proof of written authorization.
                        </p>
                    </motion.section>

                    {/* Opt-Out and Communication Preferences */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Opt-Out and Communication Preferences</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Email Communication:</h3>
                                <p className="text-gray-800">
                                    You may unsubscribe from our promotional emails at any time by clicking the "unsubscribe" link within the email or contacting us directly.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Online Tracking:</h3>
                                <p className="text-gray-800">
                                    You may manage cookies and online tracking technologies through your browser settings. We also honor Global Privacy Control (GPC) signals sent from supported browsers.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Data Retention */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Data Retention</h2>
                        <p className="text-gray-800">
                            We retain your personal information only as long as reasonably necessary to fulfill the purposes outlined in this policy, including legal, regulatory, accounting, or contractual requirements.
                        </p>
                    </motion.section>

                    {/* Security Measures */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Security Measures</h2>
                        <p className="text-gray-800">
                            MetabolixMD employs industry-standard technical, physical, and administrative safeguards to protect your personal information from unauthorized access, disclosure, or misuse. While we strive for complete security, no system is entirely immune from breach or compromise.
                        </p>
                    </motion.section>

                    {/* Policy Updates */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Policy Updates</h2>
                        <p className="text-gray-800">
                            We may revise this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your data.
                        </p>
                    </motion.section>

                    {/* Contact Us */}
                    <motion.section variants={fadeIn} className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Contact Us</h2>
                        <p className="text-gray-800 mb-6">
                            For questions, requests, or concerns related to this Privacy Policy or your personal data, please contact us at:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-gray-800">
                                <span className="font-serif">MetabolixMD</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-800">
                                <span className="font-serif">Email:</span>
                                <a href="mailto:consultant@metabolixmd.com" className="text-blue-600 hover:underline">
                                    consultant@metabolixmd.com
                                </a>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </motion.div>

            <Footer paddingTop="md:mt-20 mt-20 pt-16 md:pt-8 p-8" address={false}/>
        </div>
    );
};

export default PrivacyPolicy;