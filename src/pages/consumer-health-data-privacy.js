import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import React from 'react'
import Head from 'next/head'

const ConsumerHealthDataPrivacy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Head>
                <title>Consumer Health Data Privacy Policy | MetabolixMD</title>
                <meta name="description" content="Consumer health data privacy policy for MetabolixMD services" />
            </Head>
            <NavBar />
            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <div className="bg-[#223D38] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                            Consumer Health Data Privacy Policy
                        </h1>
                        <p className="mt-4 text-lg text-gray-200 text-center max-w-3xl mx-auto">
                            Effective Date: February 1, 2025
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 mb-8">
                                This Consumer Health Data Privacy Policy ("Policy") supplements the MetabolixMD Privacy Policy and applies to personal data defined as "consumer health data" ("CHD") under applicable U.S. state laws, including the Washington My Health My Data Act (MHMDA), Nevada's Consumer Health Data Privacy Law, and Connecticut's Data Privacy Act (CTDPA). It outlines our practices regarding the collection, use, and sharing of CHD.
                            </p>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Categories of Consumer Health Data Collected</h2>
                                <p className="text-gray-700 mb-4">Depending on your interactions with MetabolixMD and as permitted by applicable law, we may collect the following categories of CHD:</p>
                                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                                    <li><strong>Health Conditions and Diagnoses:</strong> Information related to your physical or mental health conditions, diseases, or diagnoses.</li>
                                    <li><strong>Medical History:</strong> Details about past, present, or future health status, including surgeries, procedures, and treatments.</li>
                                    <li><strong>Medication Usage:</strong> Information about prescribed medications you use or purchase through our services.</li>
                                    <li><strong>Biometric Data:</strong> Data such as height, weight, vital signs, and other health-related measurements.</li>
                                    <li><strong>Reproductive and Sexual Health Information:</strong> Data pertaining to reproductive health, sexual orientation, or gender-affirming care.</li>
                                    <li><strong>Behavioral and Lifestyle Information:</strong> Details about diet, exercise, sleep patterns, and other lifestyle factors.</li>
                                    <li><strong>Device and Usage Information:</strong> Data collected from your use of our website or mobile applications, including IP addresses, browser types, and interaction logs.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Sources of Consumer Health Data</h2>
                                <p className="text-gray-700 mb-4">We collect CHD from the following sources:</p>
                                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                                    <li><strong>Directly from You:</strong> Information you provide when using our services, completing forms, or communicating with us.</li>
                                    <li><strong>Automatically:</strong> Data collected through cookies, web beacons, and similar technologies when you interact with our digital platforms.</li>
                                    <li><strong>Third Parties:</strong> Information from service providers, partners, or affiliates who assist in delivering our services.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Purposes for Collecting and Using Consumer Health Data</h2>
                                <p className="text-gray-700 mb-4">We use CHD for the following purposes:</p>
                                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                                    <li><strong>Service Delivery:</strong> To provide, personalize, and improve our health-related services and products.</li>
                                    <li><strong>Communication:</strong> To communicate with you about your health, appointments, or other service-related matters.</li>
                                    <li><strong>Research and Development:</strong> To conduct research, analysis, and develop new services or products.</li>
                                    <li><strong>Legal Compliance:</strong> To comply with legal obligations, including responding to lawful requests and protecting our rights.</li>
                                    <li><strong>Marketing:</strong> With your consent, to send promotional materials and information about our services.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Sharing of Consumer Health Data</h2>
                                <p className="text-gray-700 mb-4">We may share CHD with:</p>
                                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                                    <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as hosting, data analysis, and customer service.</li>
                                    <li><strong>Affiliates:</strong> Our affiliated entities for purposes consistent with this Policy.</li>
                                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety.</li>
                                    <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales.</li>
                                </ul>
                                <p className="text-gray-700 mt-4">We do not sell your CHD to third parties.</p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Your Rights Regarding Consumer Health Data</h2>
                                <p className="text-gray-700 mb-4">Depending on your state of residence, you may have the following rights:</p>
                                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                                    <li><strong>Access:</strong> Request access to the CHD we have collected about you.</li>
                                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete CHD.</li>
                                    <li><strong>Deletion:</strong> Request deletion of your CHD, subject to certain exceptions.</li>
                                    <li><strong>Withdrawal of Consent:</strong> Withdraw consent for the collection or use of your CHD.</li>
                                    <li><strong>Data Portability:</strong> Request a copy of your CHD in a portable format.</li>
                                </ul>
                                <p className="text-gray-700 mt-4">To exercise these rights, please contact us at <a href="mailto:consultant@metabolixmd.com" className="text-[#223D38] hover:text-[#1a2f2b]">consultant@metabolixmd.com</a>. We will respond to your request in accordance with applicable laws.</p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Data Security</h2>
                                <p className="text-gray-700">We implement appropriate technical and organizational measures to protect CHD against unauthorized access, disclosure, alteration, or destruction. However, no security system is impenetrable, and we cannot guarantee the absolute security of your data.</p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Changes to This Policy</h2>
                                <p className="text-gray-700">We may update this Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Policy on our website and updating the effective date.</p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#223D38] mb-6">Contact Us</h2>
                                <p className="text-gray-700 mb-2">If you have any questions or concerns about this Policy or our data practices, please contact us at:</p>
                                <div className="text-gray-700">
                                    <p className="font-semibold">MetabolixMD</p>
                                    <p>Email: <a href="mailto:consultant@metabolixmd.com" className="text-[#223D38] hover:text-[#1a2f2b]">consultant@metabolixmd.com</a></p>
                                </div>
                            </section>

                            <div className="border-t border-gray-200 pt-8 mt-8">
                                <p className="text-gray-700 italic">This Policy is designed to provide transparency into our data practices and to help you make informed decisions about your interactions with MetabolixMD.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer paddingTop="md:mt-14 mt-5 pt-16 p-8" address={false}/>
        </div>
    )
}

export default ConsumerHealthDataPrivacy 