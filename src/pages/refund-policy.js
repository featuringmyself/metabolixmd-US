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
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex flex-col">
            <Head><title>Return & Refund Policy - MetabolixMD</title></Head>
            <NavBar />

            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full bg-primary/5 mt-20 py-16"
            >
                <div className="max-w-[1400px] mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-montserrat text-center mb-4">
                        Return & Refund Policy
                    </h1>
                    <p className="text-center text-gray-600 font-poppins">
                        Effective Date: 01/11/2024
                    </p>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="max-w-[1920px] mx-auto px-4 py-12"
            >
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-white rounded-2xl shadow-soft p-8 lg:p-12 border border-primary/5">
                        <div className="space-y-8 font-poppins">
                            {/* Introduction */}
                            <motion.section variants={fadeIn} className="prose max-w-none">
                                <div className="bg-primary/5 p-6 rounded-xl">
                                    <h2 className="text-2xl font-semibold text-primary mb-4">Introduction</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        At MetabolixMD, we are committed to providing high-quality health and wellness products to support your weight loss journey. If you are not fully satisfied with your purchase, we offer a hassle-free return and refund policy to ensure a smooth experience.
                                    </p>
                                </div>
                            </motion.section>

                            {/* Eligibility */}
                            <motion.section variants={fadeIn} className="bg-accent p-6 rounded-xl">
                                <h2 className="text-2xl font-semibold text-primary mb-4">1. Eligibility for Returns</h2>
                                <div className="space-y-4 text-gray-700">
                                    <p>We accept returns under the following conditions:</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>The product must be unopened, unused, and in its original packaging.</li>
                                        <li>Returns must be requested within 5 days of delivery of the products.</li>
                                        <li>A valid proof of purchase (order number, receipt) is required.</li>
                                        <li>Only purchases made through our official website [www.metabolixmd.com] are eligible for returns.</li>
                                    </ul>
                                    
                                    <p className="font-semibold mt-4">Non-Returnable Items:</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Opened, used, or tampered products.</li>
                                        <li>Products purchased on sale, promotional offers, or with discount codes.</li>
                                        <li>Digital products, gift cards, and consultation services.</li>
                                        <li>Items damaged due to misuse, improper storage, or external factors.</li>
                                    </ul>
                                </div>
                            </motion.section>

                            {/* Return Process */}
                            <motion.section variants={fadeIn} className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-2xl font-semibold text-primary mb-4">2. Return Process</h2>
                                <div className="space-y-4 text-gray-700">
                                    <p>To initiate a return, please follow these steps:</p>
                                    <ol className="list-decimal ml-6 space-y-2">
                                        <li><span className="font-semibold">Contact Customer Support:</span> Email us at consultant@metabolixmd.com with your order details and reason for return.</li>
                                        <li><span className="font-semibold">Receive Return Authorization:</span> Our team will review your request and provide a Return Authorization Number (RAN) along with return instructions.</li>
                                        <li><span className="font-semibold">Pack the Item Securely:</span> Ensure the product is in its original, unopened packaging and packed securely to prevent damage during shipping.</li>
                                        <li><span className="font-semibold">Ship the Return:</span> Send the package to the provided return address using a trackable shipping method.</li>
                                        <li><span className="font-semibold">Confirmation & Processing:</span> Once we receive your return, we will inspect the item and notify you of approval or rejection within 5-7 business days.</li>
                                    </ol>
                                </div>
                            </motion.section>

                            {/* Refund Process */}
                            <motion.section variants={fadeIn} className="bg-primary/5 p-6 rounded-xl">
                                <h2 className="text-2xl font-semibold text-primary mb-4">3. Refund Process</h2>
                                <div className="space-y-4 text-gray-700">
                                    <p>If your return is approved:</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Refunds will be issued to the original payment method or as store credit, based on your preference.</li>
                                        <li>Refunds are typically processed within 7-10 business days after return approval.</li>
                                        <li>Original shipping fees are non-refundable, except in cases where we made an error.</li>
                                    </ul>

                                    <p className="font-semibold mt-4">Exceptions & Special Cases:</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li><span className="font-semibold">Damaged or Defective Products:</span> Contact us within 48 hours of delivery with clear photos of the product and packaging for a replacement or full refund.</li>
                                        <li><span className="font-semibold">Lost or Stolen Packages:</span> We are not responsible for lost or stolen packages once they are marked as delivered by the carrier.</li>
                                        <li><span className="font-semibold">Subscription Orders:</span> Refunds for subscription-based products are not available once an order has been processed.</li>
                                        <li><span className="font-semibold">Allergy or Adverse Reactions:</span> If you experience an adverse reaction to a product, please contact our support team immediately for assistance.</li>
                                    </ul>
                                </div>
                            </motion.section>

                            {/* FAQs */}
                            <motion.section variants={fadeIn} className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-2xl font-semibold text-primary mb-4">FAQs</h2>
                                <div className="space-y-4 text-gray-700">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-semibold">Q1: Can I return a product if I changed my mind?</p>
                                            <p>A: Yes, as long as it is unopened, unused, and within 30 days of purchase.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Q2: Who covers the return shipping cost?</p>
                                            <p>A: Customers are responsible for return shipping costs unless the return is due to a mistake on our end.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Q3: How long does it take to receive my refund?</p>
                                            <p>A: Refunds are processed within 7-10 business days after approval. Your bank may take additional time to post the refund.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Q4: Can I return a product if I have an allergic reaction?</p>
                                            <p>A: Due to health and safety regulations, we cannot accept opened or used products. Please consult your healthcare provider before use.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Q5: What if my order arrives damaged?</p>
                                            <p>A: Contact us within 48 hours of delivery with photos, and we will provide a replacement or refund.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Contact Information */}
                            <motion.section variants={fadeIn} className="bg-primary/5 p-6 rounded-xl">
                                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                                <div className="space-y-4 text-gray-700">
                                    <p>For further assistance, please contact our support team:</p>
                                    <div className="flex flex-col md:flex-row items-center gap-6 justify-center mt-4">
                                        <a 
                                            href="mailto:consultant@metabolixmd.com"
                                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                                        >
                                            <span>📧</span>
                                            consultant@metabolixmd.com
                                        </a>
                                        <div className="flex items-center gap-2">
                                            <span>📍</span>
                                            9808 Topeka Ave, Lubbock, Texas 79424
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center mt-8 text-gray-700">
                                    We are here to support your health and wellness journey every step of the way. Thank you for choosing MetabolixMD.
                                </p>
                            </motion.section>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default RefundPolicy;
