import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const RefundPolicy = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head><title>Return & Refund Policy - MetabolixMD</title></Head>
            <NavBar />
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full border-b border-gray-200 mt-20 py-12"
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-serif text-gray-900 text-center">
                        Return & Refund Policy
                    </h1>
                    <p className="text-center text-gray-600 mt-4 font-serif">
                        Effective Date: January 11, 2024
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
                            At MetabolixMD, we are committed to providing high-quality health and wellness products to support your weight loss journey. If you are not fully satisfied with your purchase, we offer a hassle-free return and refund policy to ensure a smooth experience.
                        </p>
                    </motion.section>

                    {/* Eligibility for Returns */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">1. Eligibility for Returns</h2>
                        <p className="text-gray-800 mb-4">We accept returns under the following conditions:</p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2 mb-6">
                            <li>The product must be unopened, unused, and in its original packaging.</li>
                            <li>Returns must be requested within 5 days of delivery of the products.</li>
                            <li>A valid proof of purchase (order number, receipt) is required.</li>
                            <li>Only purchases made through our official website [www.metabolixmd.com] are eligible for returns.</li>
                        </ul>
                        
                        <h3 className="text-lg font-serif text-gray-900 mb-3">Non-Returnable Items:</h3>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li>Opened, used, or tampered products.</li>
                            <li>Products purchased on sale, promotional offers, or with discount codes.</li>
                            <li>Digital products, gift cards, and consultation services.</li>
                            <li>Items damaged due to misuse, improper storage, or external factors.</li>
                        </ul>
                    </motion.section>

                    {/* Return Process */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">2. Return Process</h2>
                        <p className="text-gray-800 mb-4">To initiate a return, please follow these steps:</p>
                        <ol className="list-decimal pl-6 text-gray-800 space-y-4">
                            <li>
                                <strong>Contact Customer Support:</strong> Email us at consultant@metabolixmd.com with your order details and reason for return.
                            </li>
                            <li>
                                <strong>Receive Return Authorization:</strong> Our team will review your request and provide a Return Authorization Number (RAN) along with return instructions.
                            </li>
                            <li>
                                <strong>Pack the Item Securely:</strong> Ensure the product is in its original, unopened packaging and packed securely to prevent damage during shipping.
                            </li>
                            <li>
                                <strong>Ship the Return:</strong> Send the package to the provided return address using a trackable shipping method. Customers are responsible for return shipping costs unless the return is due to an error on our part (e.g., wrong item received, damaged on arrival).
                            </li>
                            <li>
                                <strong>Confirmation & Processing:</strong> Once we receive your return, we will inspect the item and notify you of approval or rejection within 5-7 business days.
                            </li>
                        </ol>
                    </motion.section>

                    {/* Refund Process */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">3. Refund Process</h2>
                        <p className="text-gray-800 mb-4">If your return is approved:</p>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2 mb-6">
                            <li>Refunds will be issued to the original payment method or as store credit, based on your preference.</li>
                            <li>Refunds are typically processed within 7-10 business days after return approval.</li>
                            <li>Original shipping fees are non-refundable, except in cases where we made an error.</li>
                        </ul>

                        <h3 className="text-lg font-serif text-gray-900 mb-3">Exceptions & Special Cases:</h3>
                        <ul className="list-disc pl-6 text-gray-800 space-y-2">
                            <li><strong>Damaged or Defective Products:</strong> Contact us within 48 hours of delivery with clear photos of the product and packaging for a replacement or full refund.</li>
                            <li><strong>Lost or Stolen Packages:</strong> We are not responsible for lost or stolen packages once they are marked as delivered by the carrier. Please contact the shipping carrier for resolution.</li>
                            <li><strong>Subscription Orders:</strong> Refunds for subscription-based products are not available once an order has been processed.</li>
                            <li><strong>Allergy or Adverse Reactions:</strong> If you experience an adverse reaction to a product, please contact our support team immediately for assistance.</li>
                        </ul>
                    </motion.section>

                    {/* FAQs */}
                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">FAQs</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-2">Q1: Can I return a product if I changed my mind?</h3>
                                <p className="text-gray-800">A: Yes, as long as it is unopened, unused, and within 30 days of purchase.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-2">Q2: Who covers the return shipping cost?</h3>
                                <p className="text-gray-800">A: Customers are responsible for return shipping costs unless the return is due to a mistake on our end. Shipping charges apply as per company policy.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-2">Q3: How long does it take to receive my refund?</h3>
                                <p className="text-gray-800">A: Refunds are processed within 7-10 business days after approval. Your bank or payment provider may take additional time to post the refund.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-2">Q4: Can I return a product if I have an allergic reaction?</h3>
                                <p className="text-gray-800">A: Due to health and safety regulations, we cannot accept opened or used products. Please consult your healthcare provider before use.</p>
                            </div>
                            <div className="border-l-4 border-gray-200 pl-4">
                                <h3 className="text-lg font-serif text-gray-900 mb-2">Q5: What if my order arrives damaged?</h3>
                                <p className="text-gray-800">A: Contact us within 48 hours of delivery with photos, and we will provide a replacement or refund.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Contact Section */}
                    <motion.section variants={fadeIn} className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-serif text-gray-900 mb-6">Contact Us</h2>
                        <p className="text-gray-800 mb-6">
                            For further assistance, please contact our support team:
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
                        <p className="text-gray-800 mt-8">
                            We are here to support your health and wellness journey every step of the way. Thank you for choosing MetabolixMD.
                        </p>
                    </motion.section>
                </div>
            </motion.div>

            <Footer paddingTop="md:mt-14 mt-5 pt-16 p-8"/>
        </div>
    );
};

export default RefundPolicy;
