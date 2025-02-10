import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const SuccessPropt = ({ type }) => {
    const router = useRouter()
    if (type == "3") {
        return (
            <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
                <div className="w-full  md:w-[500px]">

                    <h1 className='text-primary font-semibold text-3xl'>Thank you for reaching out to us.</h1>


                    <p className='mt-5 text-lg font-normal'>

                        We regret to inform you that, based on your current BMI, you do not meet the eligibility criteria for GLP-1 medication.
                    </p>
                    <p className='mt-5 text-lg font-normal'>

                        We encourage you to continue prioritizing your health and well-being. If you have any further questions or need additional guidance, please feel free to contact us.

                    </p>
                    <p className='mt-5 text-lg font-normal mb-5'>
                        Wishing you the best of health,, <br />
                        <b>The MetabolixMD Team</b>
                    </p>


                    <div onClick={() => router.push("/")} className='mt-6 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary'>Continue</div>
                </div>
            </div>
        )
    }
    else if(type=="4"){
        return (
            <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
                <div className="w-full  md:w-[500px]">

                    <h1 className='text-primary font-semibold text-3xl'>Thank you for reaching out to us.</h1>


                    <p className='mt-5 text-lg font-normal'>

                        We regret to inform you that, based on your current health condition, you do not meet the eligibility criteria for GLP-1 medication.
                    </p>
                    <p className='mt-5 text-lg font-normal'>

                        We encourage you to continue prioritizing your health and well-being. If you have any further questions or need additional guidance, please feel free to contact us.

                    </p>
                    <p className='mt-5 text-lg font-normal mb-5'>
                        Wishing you the best of health,, <br />
                        <b>The MetabolixMD Team</b>
                    </p>


                    <div onClick={() => router.push("/")} className='mt-6 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary'>Continue</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
                <div className="w-full  md:w-[500px]">

                    {
                        type == "1" &&
                        <h1 className='text-primary font-semibold text-3xl'>Thank You for Uploading Your Prescription!</h1>
                    }
                    {
                        type == "2" &&
                        <h1 className='text-primary font-semibold text-3xl'>Thank You!</h1>
                    }
                    <p className='mt-5 text-lg font-normal'>

                        We have received your submission, and our team is reviewing it. We will get back to you shortly with the next steps.

                    </p>
                    <p className='mt-5 text-lg font-normal'>

                        If you have any further questions in the meantime, feel free to reach out to us.

                    </p>
                    <p className='mt-5 text-lg font-normal mb-5'>

                        Stay healthy, <br />
                        <b>MetabolixMD Team</b>
                    </p>


                    <div onClick={() => router.push("/")} className='mt-6 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary'>Continue</div>
                </div>
            </div>
        )
    }
}

export default SuccessPropt