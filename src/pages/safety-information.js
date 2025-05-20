import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import React from 'react'
import Head from 'next/head'

const SafetyInformation = () => {
    return (
        <div className="flex flex-col bg-gray-50">
            <Head>
                <title>Important Safety Information | MetabolixMD</title>
                <meta name="description" content="Important safety information for MetabolixMD medications" />
            </Head>
            <NavBar />
            <main className="pt-24">
                {/* Hero Section */}
                <div className="bg-[#223D38] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                            Important Safety Information
                        </h1>
                        <p className="mt-4 text-lg text-gray-200 text-center max-w-3xl mx-auto">
                            Please read this important safety information carefully
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 md:pb-8">
                        <section className="mb-16">
                            <div className="space-y-12">
                                {/* Indications Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">Indications and Limitations of Use</h3>
                                    <div className="space-y-4 text-gray-700">
                                        <p>
                                            COMPOUNDED SEMAGLUTIDE and TIRZEPATIDE are glucagon-like peptide-1 (GLP-1), GLP-1/GIP (glucose-dependent insulinotropic polypeptide) receptor agonists indicated as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with an initial body mass index (BMI) of: 27 kg/m2 or greater (overweight or obesity).
                                        </p>
                                        <p>
                                            <strong>Limitations of Use:</strong> Co-administration of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE or any other GLP-1 receptor agonists is not recommended. The safety and efficacy of co-administration with other products for weight management have not been established. COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE has not been studied in patients with a history of pancreatitis.
                                        </p>
                                    </div>
                                </div>

                                {/* Warning Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">WARNING: RISK OF THYROID C-CELL TUMORS</h3>
                                    <div className="space-y-4 text-gray-700">
                                        <p>
                                            In rodents, SEMAGLUTIDE/TIRZEPATIDE causes thyroid C-cell tumors in clinically relevant exposures. It is unknown whether these medications cause thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans as the human relevance of SEMAGLUTIDE/TIRZEPATIDE-induced rodent thyroid C-cell tumors has not been determined.
                                        </p>
                                        <p>
                                            SEMAGLUTIDE/TIRZEPATIDE is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN2). Counsel patients regarding the potential risk of MTC and symptoms of thyroid tumors.
                                        </p>
                                    </div>
                                </div>

                                {/* Contraindications Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">Do not take COMPOUNDED Semaglutide/Tirzepatide if you:</h3>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                        <li>Have a personal or family history of medullary thyroid carcinoma (MTC) or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN2).</li>
                                        <li>Have been diagnosed with pancreatitis or have a history of pancreatitis.</li>
                                        <li>Have a diagnosis or history of gastroparesis. This includes problems with your stomach, such as slowed emptying or problems with digesting food.</li>
                                        <li>Have a known allergy to semaglutide, tirzepatide, or any other GLP-1 medication. This also includes allergy to any of the inactive ingredients in COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE. Inactive ingredients include: di-sodium hydrogen phosphate dihydrate, sodium chloride, benzyl alcohol, hydrochloric acid, sodium hydroxide pellets, and water.</li>
                                        <li>Have a history of suicidal attempts or active suicidal ideation.</li>
                                    </ul>
                                </div>

                                {/* Warnings and Precautions Section */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">WARNINGS AND PRECAUTIONS</h3>
                                    <ul className="space-y-6">
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">1</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Acute Pancreatitis</strong>
                                                <p className="text-gray-700">Acute and chronic pancreatitis have been reported in clinical studies. Discontinue promptly if pancreatitis is suspected. Symptoms include persistent severe abdominal pain, sometimes radiating to the back with or without vomiting. Do not restart if pancreatitis is confirmed.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">2</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Acute Gallbladder Disease</strong>
                                                <p className="text-gray-700">Acute events of gallbladder disease such as cholelithiasis or cholecystitis have been reported in clinical trials. If cholelithiasis is suspected, gallbladder studies and clinical follow-up are indicated.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">3</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Gastroparesis</strong>
                                                <p className="text-gray-700">Uncommon, but more serious, gastrointestinal adverse effects may occur more frequently with GLP-1, GLP-1/GIP receptor agonists than with other weight loss agents.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">4</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Hypoglycemia</strong>
                                                <p className="text-gray-700">Concomitant use with an insulin secretagogue or insulin may increase the risk of hypoglycemia, including severe hypoglycemia. Reducing the dose of insulin secretagogue or insulin may be necessary. Inform all patients of the risk of hypoglycemia and educate them on the signs and symptoms of hypoglycemia.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">5</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Acute Kidney Injury</strong>
                                                <p className="text-gray-700">There have been reports of acute kidney injury in patients treated with GLP-1, GLP-1/GIP receptor agonists. Monitor renal function when initiating or escalating doses of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE in patients reporting severe adverse gastrointestinal reactions or in those with renal impairment.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">6</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Hypersensitivity Reactions</strong>
                                                <p className="text-gray-700">Anaphylactic reactions and angioedema have been reported in postmarketing studies. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if suspected and promptly seek medical advice.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">7</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Pregnancy and Reproductive Potential</strong>
                                                <p className="text-gray-700">Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE at least 2 months before a planned pregnancy because of the long half-life of these medications. May cause fetal harm. When pregnancy is recognized, discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE immediately.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">8</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Diabetic Retinopathy Complications</strong>
                                                <p className="text-gray-700">Has been reported in trials with GLP-1, GLP-1/GIP agonists. Patients with a history of diabetic retinopathy should be monitored. Diabetic retinopathy damages blood vessels in the retina and can scar the retina. As the scars get bigger, they can pull on the retina and detach it from the back of the eye, a serious condition called retinal detachment.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">9</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Heart Rate Increase</strong>
                                                <p className="text-gray-700">Monitor heart rate at regular intervals.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-[#223D38] text-white rounded-full flex items-center justify-center mr-3 mt-1">10</span>
                                            <div>
                                                <strong className="text-[#223D38] block mb-2">Suicidal Behavior and Ideation</strong>
                                                <p className="text-gray-700">Monitor for depression or suicidal thoughts. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if symptoms develop.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Additional Information Section */}
                                <div className="bg-gray-50 p-6 pb-0 rounded-xl">
                                    <h3 className="text-2xl font-medium text-[#223D38] mb-4">Additional Important Information</h3>
                                    <div className="space-y-4 text-gray-700">
                                        <p>
                                            A recent study suggested a possible connection between semaglutide/tirzepatide use and increased risk for a blinding eye disease called non-arteritic anterior ischemic optic neuropathy (NAION). There isn't enough data yet to suggest patients should be concerned or stop taking their medications. Further research is necessary to confirm the hypothesis. Patients should make an informed choice based on individual risk.
                                        </p>
                                        <p>
                                            <strong>Side Effects:</strong> Common side effects (≥5% incidence) include nausea, diarrhea, vomiting, constipation, abdominal pain, headache, fatigue, dyspepsia, dizziness, abdominal distension, eructation, hypoglycemia (in type 2 diabetes patients), flatulence, gastroenteritis, gastroesophageal reflux disease, and nasopharyngitis.
                                        </p>
                                        <p>
                                            <strong>To report SUSPECTED ADVERSE REACTIONS,</strong> contact the FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
                                        </p>
                                        <p>
                                            <strong>Medication Interactions:</strong> COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE delays gastric emptying. This may impact absorption of concomitantly administered oral medications. Use with caution.
                                        </p>
                                        <p>
                                            <strong>Due to the delayed gastric emptying</strong> associated with the use of GLP-1, GLP-1/GIP agonists, discontinue these medications at least 2 weeks prior to any elective surgery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer paddingTop='md:pt-[3rem] mt-[6rem] pt-[3rem]' address={false} />
        </div>
    )
}

export default SafetyInformation 