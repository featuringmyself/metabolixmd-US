import NavBar from '@/components/NavBar';
import React from 'react';
import Head from 'next/head';

const RefundPolicy = () => {
    return (
        <section>
            <Head><title>Refund Policy - MetabolixMD</title></Head>
            <NavBar />
            <div className="privacy-policy-container p-6 max-w-4xl mx-auto mt-20">
                <h1 className="text-3xl font-bold mb-4">Return & Refund Policy</h1>
                <p className="text-sm text-gray-500 mb-4">Effective Date: 01/11/2024</p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                    <p>
                        At MetabolixMD, we are committed to providing high-quality health and wellness products to support your weight loss journey. If you are not fully satisfied with your purchase, we offer a hassle-free return and refund policy to ensure a smooth experience.
                    </p>
                </section>

                {/* Other sections remain unchanged */}

                <section className="mb-6">
                   
                    <h3 className="text-lg font-medium mt-4">1. Eligibility for Returns</h3>
                    <p>We accept returns under the following conditions:</p>
                    <ul className="list-disc list-inside">
                        <li>The product must be unopened, unused, and in its original packaging.</li>
                        <li>Returns must be requested within 5 days of delivery of the products.</li>
                        <li>A valid proof of purchase (order number, receipt) is required.</li>
                        <li>Only purchases made through our official website [www.metabolixmd.com] are eligible for returns.</li>
                    </ul>
                    <h4 className="text-md font-medium mt-4">Non-Returnable Items:</h4>
                    <ul className="list-disc list-inside">
                        <li>Opened, used, or tampered products.</li>
                        <li>Products purchased on sale, promotional offers, or with discount codes.</li>
                        <li>Digital products, gift cards, and consultation services.</li>
                        <li>Items damaged due to misuse, improper storage, or external factors.</li>
                    </ul>
                    <h3 className="text-lg font-medium mt-4">2. Return Process</h3>
                    <p>To initiate a return, please follow these steps:</p>
                    <ol className="list-decimal list-inside">
                        <li><strong>Contact Customer Support:</strong> Email us at consultant@metabolixmd.com with your order details and reason for return.</li>
                        <li><strong>Receive Return Authorization:</strong> Our team will review your request and provide a Return Authorization Number (RAN) along with return instructions.</li>
                        <li><strong>Pack the Item Securely:</strong> Ensure the product is in its original, unopened packaging and packed securely to prevent damage during shipping.</li>
                        <li><strong>Ship the Return:</strong> Send the package to the provided return address using a trackable shipping method. Customers are responsible for return shipping costs unless the return is due to an error on our part (e.g., wrong item received, damaged on arrival).</li>
                        <li><strong>Confirmation & Processing:</strong> Once we receive your return, we will inspect the item and notify you of approval or rejection within 5-7 business days.</li>
                    </ol>
                    <h3 className="text-lg font-medium mt-4">3. Refund Process</h3>
                    <p>If your return is approved:</p>
                    <ul className="list-disc list-inside">
                        <li>Refunds will be issued to the original payment method or as store credit, based on your preference.</li>
                        <li>Refunds are typically processed within 7-10 business days after return approval.</li>
                        <li>Original shipping fees are non-refundable, except in cases where we made an error.</li>
                    </ul>
                    <h4 className="text-md font-medium mt-4">Exceptions & Special Cases:</h4>
                    <ul className="list-disc list-inside">
                        <li><strong>Damaged or Defective Products:</strong> Contact us within 48 hours of delivery with clear photos of the product and packaging for a replacement or full refund.</li>
                        <li><strong>Lost or Stolen Packages:</strong> We are not responsible for lost or stolen packages once they are marked as delivered by the carrier. Please contact the shipping carrier for resolution.</li>
                        <li><strong>Subscription Orders:</strong> Refunds for subscription-based products are not available once an order has been processed.</li>
                        <li><strong>Allergy or Adverse Reactions:</strong> If you experience an adverse reaction to a product, please contact our support team immediately for assistance.</li>
                    </ul>
                    <h3 className="text-lg font-medium mt-4">FAQs</h3>
                    <dl className="mt-4">
                        <dt className="font-medium">Q1: Can I return a product if I changed my mind?</dt>
                        <dd className="ml-4">A: Yes, as long as it is unopened, unused, and within 30 days of purchase.</dd>
                        <dt className="font-medium mt-2">Q2: Who covers the return shipping cost?</dt>
                        <dd className="ml-4">A: Customers are responsible for return shipping costs unless the return is due to a mistake on our end. Shipping charges apply as per company policy.</dd>
                        <dt className="font-medium mt-2">Q3: How long does it take to receive my refund?</dt>
                        <dd className="ml-4">A: Refunds are processed within 7-10 business days after approval. Your bank or payment provider may take additional time to post the refund.</dd>
                        <dt className="font-medium mt-2">Q4: Can I return a product if I have an allergic reaction?</dt>
                        <dd className="ml-4">A: Due to health and safety regulations, we cannot accept opened or used products. Please consult your healthcare provider before use.</dd>
                        <dt className="font-medium mt-2">Q5: What if my order arrives damaged?</dt>
                        <dd className="ml-4">A: Contact us within 48 hours of delivery with photos, and we will provide a replacement or refund.</dd>
                    </dl>
                    <p className="mt-4">
                        For further assistance, please contact our support team:
                    </p>
                    <address className="not-italic">
                        <strong>Customer Support:</strong><br />
                        📧 Email: consultant@metabolixmd.com<br />
                        {/* 📞 Phone: +1-800-555-1234<br /> */}
                        📍 Address: 9808 Topeka Ave, Lubbock, Texas 79424<br />
                    </address>
                </section>

                <p className="text-center mt-8">We are here to support your health and wellness journey every step of the way. Thank you for choosing MetabolixMD.</p>
            </div>
        </section>
    );
};

export default RefundPolicy;
