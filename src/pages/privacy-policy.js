import NavBar from '@/components/NavBar';
import React from 'react';
import Head from 'next/head';

const PrivacyPolicy = () => {
    return (
        <section>
            <Head><title>Privacy Policy - MetabolixMD</title></Head>
            <NavBar />
            <div className="privacy-policy-container p-6 max-w-4xl mx-auto mt-20">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Effective Date: 01/13/2025</p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                    <p>
                        MetabolixMD ("we," "our," or "us") is dedicated to safeguarding your privacy and ensuring the security of your Protected Health Information (PHI). This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website [www.metabolixmd.com] and utilize our telehealth services. By accessing or using our services, you agree to the terms outlined in this policy.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
                    <h3 className="text-lg font-medium">Personal Information:</h3>
                    <ul className="list-disc list-inside">
                        <li>Name, address, email, phone number, date of birth, and payment details.</li>
                    </ul>
                    <h3 className="text-lg font-medium mt-4">Health Information:</h3>
                    <ul className="list-disc list-inside">
                        <li>Medical history, treatment plans, prescriptions, and other health-related data.</li>
                    </ul>
                    <h3 className="text-lg font-medium mt-4">Technical Data:</h3>
                    <ul className="list-disc list-inside">
                        <li>IP address, browser type, access times, and pages viewed to enhance your user experience.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>To Provide Services:</strong> Deliver telehealth consultations, process prescriptions, and manage appointments.</li>
                        <li><strong>Communication:</strong> Send appointment reminders, health tips, and respond to inquiries.</li>
                        <li><strong>Compliance:</strong> Adhere to legal obligations, including HIPAA regulations.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Disclosure of Your Information</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Healthcare Partners:</strong> Such as CASA Pharma RX and GAP (Grand Ave Pharmacy) for prescription fulfillment.</li>
                        <li><strong>Service Providers:</strong> Entities that assist with payment processing, IT support, and other operational services.</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                        <li><strong>Authorization:</strong> With your explicit written authorization, where required under HIPAA.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
                    <p>
                        We implement administrative, physical, and technical safeguards to protect your information, including:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Encryption of data at rest and in transit.</li>
                        <li>Secure servers and firewalls.</li>
                        <li>Regular audits and access controls.</li>
                    </ul>
                    <p>
                        Our services are hosted on Amazon Web Services (AWS), which complies with HIPAA regulations to ensure the confidentiality, integrity, and availability of your PHI.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Access:</strong> Request access to your personal and health information.</li>
                        <li><strong>Correction:</strong> Request corrections to any inaccurate or incomplete information.</li>
                        <li><strong>Deletion:</strong> Request the deletion of your information, subject to legal constraints.</li>
                        <li><strong>Accounting of Disclosures:</strong> Request a record of certain disclosures of your PHI as permitted under HIPAA.</li>
                        <li><strong>Restrictions:</strong> Request restrictions on how we use or disclose your PHI for certain purposes.</li>
                        <li><strong>Confidential Communications:</strong> Request communications through alternative means or locations.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies to enhance user experience. You can adjust your browser settings to refuse cookies; however, this may affect the functionality of our website.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party sites. We are not responsible for their privacy practices.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                    <p>
                        We may update this policy periodically. We will notify you of significant changes by posting the new policy on our website.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
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

                <p className="text-center mt-8">Thank you for trusting MetabolixMD with your health and personal information.</p>
            </div>
        </section>
    );
};

export default PrivacyPolicy;