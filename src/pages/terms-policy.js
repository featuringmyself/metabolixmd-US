import NavBar from '@/components/NavBar'
import React from 'react'
import Head from 'next/head'

const Terms = () => {
    return (
        <div>
            <Head><title>Terms Policy</title></Head>
            <NavBar />
            <div className='container mx-auto'>
                <h1 className='text-5xl font-semibold'>INFORMED CONSENT | Semaglutide</h1>


                <p className='mt-5'>
                    Indications and Limitations of Use
                    Semaglutide is an injectable prescription medication for adults with obesity (BMI ≥30) or overweight (excess weight) (BMI ≥27) who also have weight-related medical problems used with a reduced-calorie meal plan and increased physical activity.
                    Semaglutide has not been studied in patients with a history of pancreatitis. Consider other antidiabetic therapies in patients with a history of pancreatitis.
                    Semaglutide is not a substitute for insulin. Semaglutide is not indicated for use in patients with type 1 diabetes mellitus or for the treatment of patients with diabetic ketoacidosis.
                    Contraindications
                    Semaglutide is contraindicated in patients with a personal or family history of MTC or in patients with MEN 2, and in patients with known hypersensitivity to semaglutide or to any of the product components.
                    Warnings and Precautions
                </p>
                <ul className='mt-5'>
                    <li><strong>Risk of Thyroid C-Cell Tumors:</strong> Patients should be referred to an endocrinologist for further evaluation if serum calcitonin is measured and found to be elevated or thyroid nodules are noted on physical examination or neck imaging.</li>
                    <li><strong>Pancreatitis:</strong> Acute and chronic pancreatitis have been reported in clinical studies. Observe patients carefully for signs and symptoms of pancreatitis (persistent severe abdominal pain, sometimes radiating to the back with or without vomiting). If pancreatitis is suspected, discontinue Semaglutide promptly, and if pancreatitis is confirmed, do not restart.</li>
                    <li><strong>Diabetic Retinopathy Complications:</strong> In a 2-year trial involving patients with type 2 diabetes and high cardiovascular risk, more events of diabetic retinopathy complications occurred in patients treated with Semaglutide (3.0%) compared with placebo (1.8%). The absolute risk increase for diabetic retinopathy complications was larger among patients with a history of diabetic retinopathy at baseline than among patients without a known history of diabetic retinopathy. Rapid improvement in glucose control has been associated with a temporary worsening of diabetic retinopathy. The effect of long-term glycemic control with semaglutide on diabetic retinopathy complications has not been studied. Patients with a history of diabetic retinopathy should be monitored for progression of diabetic retinopathy.</li>
                    <li><strong>Hypoglycemia:</strong> The risk of hypoglycemia is increased when Semaglutide is used in combination with insulin secretagogues (e.g., sulfonylureas) or insulin.</li>
                    <li><strong>Acute Kidney Injury:</strong> There have been postmarketing reports of acute kidney injury and worsening of chronic renal failure, which may sometimes require hemodialysis, in patients treated with GLP-1 receptor agonists. Some of these events have been reported in patients without known underlying renal disease. A majority of the reported events occurred in patients who had experienced nausea, vomiting, diarrhea, or dehydration.</li>
                </ul>
            </div>
        </div>
    )
}

export default Terms