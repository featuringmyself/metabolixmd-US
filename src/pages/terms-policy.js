import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import React from 'react'
import Head from 'next/head'

const Terms = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Head>
                <title>Terms of Service | MetabolixMD</title>
                <meta name="description" content="Terms and conditions for MetabolixMD services" />
            </Head>
            <NavBar />
            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <div className="bg-[#223D38] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                            Terms of Service
                        </h1>
                        <p className="mt-4 text-lg text-gray-200 text-center max-w-3xl mx-auto">
                            Please read these terms carefully before using our services
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <section className="mb-16">
                            <h2 className="text-3xl font-semibold text-[#223D38] mb-8 border-b border-gray-200 pb-4">
                                Informed Consent | Semaglutide
                            </h2>
                            
                            <div className="space-y-12">
                                {/* Indications Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">Indications and Limitations of Use</h3>
                                    <div className="space-y-4 text-gray-700">
                                        <p>
                                            Semaglutide is an injectable prescription medication for adults with obesity (BMI ≥30) or overweight (excess weight) (BMI ≥27) who also have weight-related medical problems used with a reduced-calorie meal plan and increased physical activity.
                                        </p>
                                        <p>
                                            Semaglutide has not been studied in patients with a history of pancreatitis. Consider other antidiabetic therapies in patients with a history of pancreatitis.
                                        </p>
                                        <p>
                                            Semaglutide is not a substitute for insulin. Semaglutide is not indicated for use in patients with type 1 diabetes mellitus or for the treatment of patients with diabetic ketoacidosis.
                                        </p>
                                    </div>
                                </div>

                                {/* Contraindications Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">Contraindications</h3>
                                    <p className="text-gray-700">
                                        Semaglutide is contraindicated in patients with a personal or family history of MTC or in patients with MEN 2, and in patients with known hypersensitivity to semaglutide or to any of the product components.
                                    </p>
                                </div>

                                {/* Warnings Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">Warnings and Precautions</h3>
                                    <ul className="space-y-6">
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">1</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Risk of Thyroid C-Cell Tumors</strong>
                                                <p className="text-gray-700">Patients should be referred to an endocrinologist for further evaluation if serum calcitonin is measured and found to be elevated or thyroid nodules are noted on physical examination or neck imaging.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">2</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Pancreatitis</strong>
                                                <p className="text-gray-700">Acute and chronic pancreatitis have been reported in clinical studies. Observe patients carefully for signs and symptoms of pancreatitis (persistent severe abdominal pain, sometimes radiating to the back with or without vomiting). If pancreatitis is suspected, discontinue Semaglutide promptly, and if pancreatitis is confirmed, do not restart.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">3</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Diabetic Retinopathy Complications</strong>
                                                <p className="text-gray-700">In a 2-year trial involving patients with type 2 diabetes and high cardiovascular risk, more events of diabetic retinopathy complications occurred in patients treated with Semaglutide (3.0%) compared with placebo (1.8%). The absolute risk increase for diabetic retinopathy complications was larger among patients with a history of diabetic retinopathy at baseline than among patients without a known history of diabetic retinopathy. Rapid improvement in glucose control has been associated with a temporary worsening of diabetic retinopathy. The effect of long-term glycemic control with semaglutide on diabetic retinopathy complications has not been studied. Patients with a history of diabetic retinopathy should be monitored for progression of diabetic retinopathy.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">4</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Hypoglycemia</strong>
                                                <p className="text-gray-700">The risk of hypoglycemia is increased when Semaglutide is used in combination with insulin secretagogues (e.g., sulfonylureas) or insulin.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">5</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Acute Kidney Injury</strong>
                                                <p className="text-gray-700">There have been postmarketing reports of acute kidney injury and worsening of chronic renal failure, which may sometimes require hemodialysis, in patients treated with GLP-1 receptor agonists. Some of these events have been reported in patients without known underlying renal disease. A majority of the reported events occurred in patients who had experienced nausea, vomiting, diarrhea, or dehydration.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Terms