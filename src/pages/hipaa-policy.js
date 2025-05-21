import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const HipaaPolicy = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head><title>HIPAA Policy - MetabolixMD</title></Head>
            <NavBar />
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full border-b border-gray-200 mt-20 py-12"
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-serif text-gray-900 text-center">
                        HIPAA Website Compliance Policy
                    </h1>
                    <div className="text-center text-gray-600 mt-4 font-serif">
                        <p>Effective Date: August 1, 2024</p>
                        <p>Last Updated: May 14, 2025</p>
                        <p>Applies to MetabolixMD (<a href="http://www.metabolixmd.com" className="text-blue-600 hover:underline">www.metabolixmd.com</a>)</p>
                    </div>
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
                    {/* 1. Overview */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">1. Overview</h2>
                        <p className="text-gray-800 leading-relaxed">
                            MetabolixMD takes the privacy and security of your health data seriously. This HIPAA Website Compliance Policy explains how we protect and manage your Protected Health Information (PHI) in compliance with the Health Insurance Portability and Accountability Act of 1996 ("HIPAA") and its amendments, including the HITECH Act. This policy applies specifically to our collection, use, storage, and disclosure of PHI through our digital platforms.
                        </p>
                    </motion.section>

                    {/* 2. Who This Policy Applies To */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">2. Who This Policy Applies To</h2>
                        <p className="text-gray-800 leading-relaxed">
                            This policy applies to any individual who submits or communicates health-related information through the MetabolixMD website, whether as a patient, prospective patient, or caregiver. It also applies to our employees, service providers, and vendors who handle PHI on our behalf.
                        </p>
                    </motion.section>

                    {/* 3. What We Collect as PHI */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">3. What We Collect as PHI</h2>
                        <p className="text-gray-800 mb-4">
                            We may collect and store the following information when you interact with our digital health services:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Your name, email address, phone number, and physical address</li>
                            <li>Information submitted through medical intake forms, health surveys, and treatment questionnaires</li>
                            <li>Medical history, current conditions, medications, allergies, and symptoms</li>
                            <li>Communications with your care team through secure messaging tools</li>
                            <li>Details of your visits, appointments, treatment history, and follow-up care</li>
                        </ul>
                    </motion.section>

                    {/* 4. How We Collect PHI */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">4. How We Collect PHI</h2>
                        <p className="text-gray-800 mb-4">
                            Your PHI is collected via:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Encrypted HIPAA-compliant online forms</li>
                            <li>Secure communication portals between you and licensed healthcare professionals</li>
                            <li>Telehealth tools, interactive assessments, and electronic health records (EHR)</li>
                        </ul>
                    </motion.section>

                    {/* 5. Why We Collect PHI */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">5. Why We Collect PHI</h2>
                        <p className="text-gray-800 mb-4">
                            We collect this information to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Provide medical evaluations and determine treatment eligibility</li>
                            <li>Deliver safe, effective, and customized telehealth services</li>
                            <li>Support care coordination and follow-up</li>
                            <li>Comply with legal and regulatory requirements</li>
                            <li>Improve the quality and efficiency of our services</li>
                        </ul>
                    </motion.section>

                    {/* 6. Data Protection and Security */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">6. Data Protection and Security</h2>
                        <p className="text-gray-800 mb-4">
                            We protect your information using industry-leading security protocols and best practices. This includes:
                        </p>
                        
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Encryption</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>All PHI is encrypted in transit using HTTPS and TLS 1.2 or higher</li>
                                    <li>At-rest encryption is implemented using AES-256 encryption standards</li>
                                </ul>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Secure Hosting</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Data is stored on HIPAA-compliant cloud infrastructure (e.g., AWS, GCP)</li>
                                    <li>All vendors handling PHI must sign a Business Associate Agreement (BAA)</li>
                                </ul>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Access Controls</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>Only authorized personnel can access PHI, based on their role and need</li>
                                    <li>Multi-factor authentication (MFA), session timeouts, and audit logging are enforced</li>
                                </ul>
                            </div>
                            
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-3">Monitoring and Audits</h3>
                                <ul className="list-disc pl-6 text-gray-800 space-y-2">
                                    <li>We log all access and activities related to PHI and regularly audit for anomalies</li>
                                    <li>Threat detection, system patching, and data backup protocols are maintained</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* 7. Your HIPAA Rights */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">7. Your HIPAA Rights</h2>
                        <p className="text-gray-800 mb-4">
                            Under HIPAA, you have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Access your health records held by MetabolixMD</li>
                            <li>Request an amendment to your records if you believe they are inaccurate</li>
                            <li>Receive an accounting of certain disclosures of your PHI</li>
                            <li>Request confidential communication methods</li>
                            <li>Limit how we use or disclose your PHI under specific conditions</li>
                        </ul>
                        <p className="text-gray-800 mt-4">
                            To exercise your rights, you may contact us directly via the contact information provided below.
                        </p>
                    </motion.section>

                    {/* 8. Business Associates */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">8. Business Associates</h2>
                        <p className="text-gray-800 mb-4">
                            We work with third-party vendors who assist in operating our platform and delivering care. All such vendors:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Are required by law to safeguard PHI</li>
                            <li>Must enter into a legally binding BAA with us</li>
                            <li>Are only allowed to access PHI as necessary to perform their services</li>
                        </ul>
                        <p className="text-gray-800 mt-4">
                            Examples include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Hosting providers</li>
                            <li>EHR systems</li>
                            <li>HIPAA-compliant messaging/email services</li>
                            <li>Payment processors</li>
                        </ul>
                    </motion.section>

                    {/* 9. Breach Notification */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">9. Breach Notification</h2>
                        <p className="text-gray-800 mb-4">
                            In the event of a breach involving your PHI, MetabolixMD will:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Promptly notify you within 60 days if your data is compromised</li>
                            <li>Investigate and mitigate the breach using internal protocols</li>
                            <li>Report the incident to the Department of Health and Human Services (HHS) as required</li>
                        </ul>
                    </motion.section>

                    {/* 10. Employees and Contractors */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">10. Employees and Contractors</h2>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>All MetabolixMD employees and contractors receive comprehensive HIPAA training</li>
                            <li>They are bound by confidentiality agreements</li>
                            <li>Their access to PHI is limited to the minimum necessary for job functions</li>
                        </ul>
                    </motion.section>

                    {/* 11. Communications */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">11. Communications</h2>
                        <p className="text-gray-800 mb-4">
                            We only use HIPAA-secure channels to communicate PHI.
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Emails involving PHI are encrypted</li>
                            <li>You must provide explicit consent before receiving PHI via SMS or unsecured email</li>
                            <li>All communication tools must meet HIPAA standards</li>
                        </ul>
                    </motion.section>

                    {/* 12. Tracking Technologies and Analytics */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">12. Tracking Technologies and Analytics</h2>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>We do not use tracking technologies (like advertising pixels or cookies) that collect or transmit PHI</li>
                            <li>Web analytics tools, where used, are configured to anonymize data and exclude PHI</li>
                            <li>No user health data is sold or shared for advertising purposes</li>
                        </ul>
                    </motion.section>

                    {/* 13. Changes to This Policy */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">13. Changes to This Policy</h2>
                        <p className="text-gray-800">
                            We may update this HIPAA Website Compliance Policy as needed. All updates will be published on <a href="http://www.metabolixmd.com" className="text-blue-600 hover:underline">www.metabolixmd.com</a>, and the "Last Updated" date will reflect the most recent changes. We encourage you to review this policy periodically.
                        </p>
                    </motion.section>

                    {/* 14. Contact Information */}
                    <motion.section variants={fadeIn} className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">14. Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-gray-800">
                                <span className="font-serif">HIPAA Compliance Officer</span>
                            </div>
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

export default HipaaPolicy;