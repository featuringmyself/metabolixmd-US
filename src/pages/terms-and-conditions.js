import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import React from 'react'
import Head from 'next/head'

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Head>
                <title>Terms and Conditions | MetabolixMD</title>
                <meta name="description" content="Terms and conditions of use for MetabolixMD services" />
            </Head>
            <NavBar />
            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <div className="bg-[#223D38] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                            Terms and Conditions of Use
                        </h1>
                        <p className="mt-4 text-lg text-gray-200 text-center max-w-3xl mx-auto">
                            Last Updated: 1st February 2025
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 mb-8">
                                Welcome to MetabolixMD.com. These Terms and Conditions of Use ("Terms") establish the legal agreement between you and MetabolixMD ("we," "us," or "our") regarding your access to and use of our website, mobile applications, and associated services. By accessing or using our platform, you agree to be bound by these Terms, along with our Privacy Policy and any supplemental terms provided for specific services.
                            </p>

                            <p className="text-gray-700 mb-8">
                                MetabolixMD offers a range of services focused on metabolic health, weight management, telemedicine consultations, AI-powered care tools, and pharmacy coordination. These services are designed to enhance wellness but are not intended as substitutes for professional medical advice, diagnosis, or treatment. In case of a medical emergency, you must call 911 or contact your healthcare provider immediately.
                            </p>

                            <div className="space-y-8">
                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">1. Service Scope & Eligibility</h2>
                                    <p className="text-gray-700">Explains services offered, regional availability, and user eligibility, including age and location criteria.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">2. Telehealth & Wellness Services</h2>
                                    <p className="text-gray-700">Describes the structure and limitations of virtual consultations and health support provided by licensed professionals.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">3. Payments & Financial Terms</h2>
                                    <p className="text-gray-700">All services are provided on a direct-pay model. Insurance is not accepted at this time.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">4. Membership Program Terms</h2>
                                    <p className="text-gray-700">Includes pricing, renewals, services included, and cancellation policies for any subscription or care plan programs.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">5. Account Setup & Security</h2>
                                    <p className="text-gray-700">Users must ensure secure use of their login credentials and keep personal details updated.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">6. Privacy Practices</h2>
                                    <p className="text-gray-700">Our Privacy Policy governs the collection, use, and protection of your personal health information.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">7. Intellectual Property & Limited Use License</h2>
                                    <p className="text-gray-700">All tools, branding, and digital content are the property of MetabolixMD. Use is limited to personal, non-commercial purposes.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">8. User-Generated Content</h2>
                                    <p className="text-gray-700">Any content submitted by users (e.g., feedback, testimonials) may be used by MetabolixMD in accordance with these Terms.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">9. Copyright Notices</h2>
                                    <p className="text-gray-700">Provides instructions for reporting intellectual property violations.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">10. Prohibited Activities</h2>
                                    <p className="text-gray-700">Lists disallowed behaviors such as misuse of platform features, unauthorized data scraping, and false representation.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">11. Disclaimer of Warranties</h2>
                                    <p className="text-gray-700">Services are provided "as is" with no warranties, either express or implied.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">12. Limitation of Liability</h2>
                                    <p className="text-gray-700">MetabolixMD is not liable for indirect, incidental, or consequential damages arising from platform use.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">13. Indemnity Clause</h2>
                                    <p className="text-gray-700">Users agree to defend and hold harmless MetabolixMD against any claims or liabilities resulting from misuse or violations.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">14. Third-Party Services & Links</h2>
                                    <p className="text-gray-700">While third-party resources may be accessible, we do not control or guarantee their services or content.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">15. Changes to Terms and Services</h2>
                                    <p className="text-gray-700">Terms may be modified periodically. Continued usage signifies acceptance of changes.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">16. Payment Processing</h2>
                                    <p className="text-gray-700">Covers how fees are charged, refunded, or disputed for consultations, testing, or products.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">17. Termination of Services</h2>
                                    <p className="text-gray-700">MetabolixMD reserves the right to suspend or terminate accounts for any violation of these Terms.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">18. Governing Law – Texas State</h2>
                                    <p className="text-gray-700">These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any legal action will be handled under Texas jurisdiction.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">19. Binding Arbitration and Class Action Waiver</h2>
                                    <p className="text-gray-700">Disputes must be resolved through binding arbitration on an individual basis. Class action lawsuits are waived.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">20. Electronic Communications Consent</h2>
                                    <p className="text-gray-700">By using the platform, you agree to receive updates and health communications via SMS and email.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">21. Miscellaneous Provisions</h2>
                                    <p className="text-gray-700">Includes clauses regarding assignment, waiver, severability, and enforceability of the agreement.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">22. Contact Us</h2>
                                    <p className="text-gray-700">For support or legal inquiries, contact us at: <a href="mailto:consultant@metabolixmd.com" className="text-[#223D38] hover:text-[#1a2f2b]">consultant@metabolixmd.com</a></p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-[#223D38] mb-4">23. Open Payments Disclosure</h2>
                                    <p className="text-gray-700">Where applicable, MetabolixMD complies with transparency requirements and encourages users to consult the U.S. Open Payments database to review relationships between physicians and healthcare companies.</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer paddingTop="md:mt-14 mt-5 pt-16 p-8" address={false}/>
        </div>
    )
}

export default TermsAndConditions 