import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NavBar from './NavBar'
import FaqList from './Faq'
import MeetExpertBackground from './MeetExpertBackground'
import CompareModule from './CompareModule'

import { getAuthToken } from '@/services/API/apiHelper'
import Link from 'next/link'
import Footer from './Footer'


import ScrollProgressBar from './ProgressBar'
import { getMethod } from '@/services/API/ApiMethod'
import { toast } from 'react-toastify'

const WeightLossMedication = () => {
    let token = getAuthToken()
    const [userOrders, setUserOrders] = useState([]);

    const getOrderDetails = async () => {
        try {
            const res = await getMethod("/order/user");
            if (res) {
                setUserOrders(res.data);
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, []);


    return (
        <div className='font-tt-hoves mt-20' >
            <NavBar />

            <section className='flex flex-col-reverse lg:flex-row   min-h-[600px] gap-10 sm:border-b'>
                <div className='flex-1 flex text-center md:text-start flex-col justify-center    px-2 md:px-10'>
                    <h1 className='text-4xl    font-medium text-wrap'>
                        {/* Get Access to prescription<br />
                        <b className='text-orange-500 text-wrap'>Weight Loss </b>
                        Medication Online */}
                        Unlock your metabolic health and <br /> weight loss potential with
                    </h1>
                    <img src="/images/orange-metabolix.webp" className='max-w-[150px] md:max-w-[170px] mx-auto md:mx-0 mt-2' />
                    <p className='mt-3 text-sm  text-zinc-500'>
                        Discover our revolutionary GLP-1, GLP-1/GIP program, expertly crafted to support your journey to a healthier, happier you. Our dedicated team will guide you every step of the way.


                    </p><p className='mt-3 text-sm  text-zinc-500'>Schedule a consultation and see if you qualify for our program.
                        We partner only with top-notch 503A and 503B pharmacies to ensure seamless delivery of our premium compounded medicines, directly to your door.</p>
                    {
                        (token) ?
                            (
                                userOrders.length > 0 ?
                                    <Link href="/profile-details" className='bg-primary hidden hover:bg-primary/90   h-[40px] md:h-fit w-fit mx-auto md:mx-0 md:flex items-center justify-center p-4 px-10 md:w-[300px] text-white  text-lg rounded-full mt-6'>
                                        GET STARTED 
                                    </Link>
                                    :
                                    <Link href="/get-started" className='bg-primary hidden hover:bg-primary/90   h-[40px] md:h-fit w-fit mx-auto md:mx-0 md:flex items-center justify-center p-4 px-10 md:w-[300px] text-white  text-lg rounded-full mt-6'>
                                        GET STARTED
                                    </Link>
                            )
                            :
                            <Link href="/login" className='bg-primary hidden hover:bg-primary/90   h-[40px] md:h-fit w-fit mx-auto md:mx-0 md:flex items-center justify-center p-4 px-10 md:w-[300px] text-white  text-lg rounded-full mt-6'>
                                GET STARTED
                            </Link>
                    }

                    <div className='flex justify-center md:justify-start items-center gap-4  my-5'>
                        <Link href="#safety" className='text-sm underline text-primary '>
                            Important safety information
                        </Link>

                        <Link href="#safety" className='bg-white border-primary border rounded-full size-10 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </Link>
                    </div>
                </div>
                <div className='bg-[#f5f4f2] min-h-[300px] flex-1  justify-center items-center flex'>
                    <Image src="/images/medicine.webp" width={650} height={650}/>
                </div>
            </section>
            <section className='px-3 md:px-10 mt-10 '>
                <div className='flex  flex-wrap md:items-center md:gap-5 '>
                    <h2 className='text-3xl min-w-fit md:flex-1 text-center md:text-start md:text-4xl lg:text-5xl flex-1'>
                        <b className='text-primary'>Prescription </b>
                        ingredients <br />
                        for personalized care.
                    </h2>
                    <div className='flex-1 flex justify-center md:justify-end mb-5'>

                        {
                            (token) ?
                                (
                                    userOrders.length > 0 ?
                                        <Link href="/profile-details" className='bg-primary hover:bg-primary/90   flex items-center justify-center p-4 px-20 md:px-8 max-h-[80px] w-fit md:w-[300px] md:h-[100px]  text-sm md:text-lg  text-white  ms:text-lg rounded-xl mt-6 '>
                                            GET STARTED
                                        </Link>
                                        :
                                        <Link href="/get-started" className='bg-primary hover:bg-primary/90   flex items-center justify-center p-4 px-20 md:px-8 max-h-[80px] w-fit md:w-[300px] md:h-[100px]  text-sm md:text-lg  text-white  ms:text-lg rounded-xl mt-6 '>
                                            GET STARTED
                                        </Link>
                                )
                                :
                                <Link href="/login" className='bg-primary hover:bg-primary/90   flex items-center justify-center p-4 px-20 md:px-8 max-h-[80px] w-fit md:w-[300px] md:h-[100px]  text-sm md:text-lg  text-white  ms:text-lg rounded-xl mt-6 '>
                                    GET STARTED
                                </Link>
                        }

                    </div>
                </div>
                <div className='mt-5 flex justify-evenly gap-10  overflow-x-scroll'>

                    <div className='min-w-full md:min-w-fit'>
                        <div className=' bg-[#d8d6d3] px-5 py-7  rounded-3xl '>
                            <div className='flex flex-wrap items-center justify-between'>
                                <div className=''>
                                    <h2 className='w-fit text-primary  text-4xl'>
                                        Semaglutide
                                    </h2>
                                    <p>Injection</p>
                                </div>

                                <div className='bg-primary text-xs px-5 p-2 text-white md:p-4 rounded-3xl md:px-10'>
                                    In Stock
                                </div>
                            </div>
                            <div className='h-[400px] min-w-full md:min-w-[350px]  flex  relative'>
                                <Image src="/images/41.webp" width={250} height={400} className='absolute z-[1] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
                                <div className='flex flex-col justify-between items-center'>
                                    <div></div>
                                    <div className='flex items-center bg-brown-400 gap-5  drop-shadow-2xl backdrop-filter bg-clip-padding backdrop-blur-xl bg-opacity-100 px-5 py-3  rounded-3xl absolute bottom-0 w-full left-0 z-[5]'>
                                        <p className='text-sm md:text-lg text-white '>See If <b className='text-primary'>GLP-1s</b> are right for you </p>

                                        {
                                            (token) ?
                                                (
                                                    userOrders.length > 0 ?
                                                        <Link href="/profile-details" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                        </Link>
                                                        :
                                                        <Link href="/get-started" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                        </Link>
                                                )
                                                :
                                                <Link href="/login" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                </Link>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-center my-2'>
                            <Link href="#safety" className='text-sm underline text-primary '>
                                Important safety information
                            </Link>
                        </div>
                    </div>
                    <div className='min-w-full md:w-[350px] md:min-w-fit'>
                        <div className=' bg-[#d8d6d3] px-5 py-7  rounded-3xl '>
                            <div className='flex flex-wrap items-center justify-between w-full  gap-10'>
                                <div className=''>
                                    <h2 className='w-fit text-primary  text-4xl'>
                                        Tirzepatide
                                    </h2>
                                    <p>Injection </p>
                                </div>

                                <div className='bg-primary text-xs px-5 p-2 text-white md:p-4 rounded-3xl md:px-10'>
                                    In Stock
                                </div>
                            </div>
                            <div className='h-[400px] min-w-full md:min-w-[350px]  flex  relative'>
                                <Image src="/images/medicine-2.webp" width={250} height={400} className='absolute z-[1]  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
                                <div className='flex flex-col justify-between items-center'>
                                    <div></div>
                                    <div className='flex items-center bg-brown-400 gap-5  drop-shadow-2xl backdrop-filter bg-clip-padding backdrop-blur-xl bg-opacity-100 px-5 py-3  rounded-3xl absolute bottom-0 w-full left-0 z-[5] '>
                                        <p className='text-sm md:text-lg text-white '>See If <b className='text-primary'>GLP-1s</b> are right for you </p>
                                        {
                                            (token) ?
                                                (
                                                    userOrders.length > 0 ?
                                                        <Link href="/profile-details" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                        </Link>
                                                        :
                                                        <Link href="/get-started" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                        </Link>
                                                )
                                                :
                                                <Link href="/login" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                </Link>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-center my-2'>
                            <Link href="#safety" className='text-sm underline text-primary '>
                                Important safety information
                            </Link>
                        </div>
                    </div>
                    <div className='min-w-full md:w-[350px] md:min-w-fit'>
                        <div className=' bg-[#d8d6d3] px-5 py-7  rounded-3xl '>
                            <div className='flex flex-wrap items-center justify-between w-full  gap-10'>
                                <div className=''>
                                    <h2 className='w-fit text-primary  text-4xl'>
                                        Tirzepatide
                                    </h2>
                                    <p>Injection </p>
                                </div>

                                <div className='bg-primary text-xs px-5 p-2 text-white md:p-4 rounded-3xl md:px-10'>
                                    In Stock
                                </div>
                            </div>
                            <div className='h-[400px] min-w-full md:min-w-[350px]  flex relative'>
                                <Image src="/images/42.webp" width={300} height={400} className='absolute z-[1] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/>

                                <div className='flex flex-col justify-between items-center'>
                                    <div></div>
                                    <div className='flex items-center bg-brown-400 gap-5  drop-shadow-2xl backdrop-filter bg-clip-padding backdrop-blur-md bg-opacity-100 px-5 py-3  rounded-3xl absolute bottom-0 w-full left-0 z-[5]'>
                                        <p className='text-sm md:text-lg text-white '>See If <b className='text-primary'>GLP-1s</b> are right for you </p>
                                        {
                                            (token) ?
                                                (
                                                    userOrders.length > 0 ?
                                                        <Link href="/profile-details" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                        </Link>
                                                        :
                                                        <Link href="/get-started" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                        </Link>
                                                )
                                                :
                                                <Link href="/login" className='bg-white rounded-full size-12 min-w-12 md:size-14 md:min-w-14 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                                </Link>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-center my-2'>
                            <Link href="#safety" className='text-sm underline  text-primary '>
                                Important safety information
                            </Link>
                        </div>
                    </div>
                </div>
                <p className='mt-5 text-zinc-400'>
                    Semaglutide and Tirzepatide facilitate significant weight loss by reducing appetite and slowing gastric emptying. These medications also reduce the risk of cardiovascular events, such as heart attacks and strokes. With a low risk of hypoglycemia, they act primarily in response to elevated blood sugar levels. Additionally, they may help reduce liver fat and improve liver function, offering potential benefits.
                </p>
                
            </section>
            <section style={{ backgroundImage: "url(/images/20.webp)" }} className='h-screen   bg-clip-padding backdrop-blur-md  flex flex-col justify-center   mt-10 bg-cover bg-no-repeat bg-center bg-opacity-50 '>
                <div className='md:mx-20'>
                    <h2 className='text-3xl backdrop-blur-xl rounded-3xl py-3 px-5 w-fit md:text-4xl lg:text-5xl pl-5 '>
                        Looking to<b className=''> shed </b>some <br />
                        pounds?
                    </h2>
                    <p className='mt-10 max-w-48 text-lg pl-5'>
                        We have got you covered!
                        Lose weight
                        with <b className='text-orange-400'>GLP-1s</b>.
                    </p>

                    <div className='flex items-center mt-20'>

                        <div style={{ backgroundImage: "url(images/orange-logo.webp)" }} className='w-[250px] h-24 bg-contain bg-center bg-no-repeat'>

                        </div>

                    </div>
                </div>
            </section>
            <section className='min-h-96 h-fit py-20 flex flex-col justify-center items-center border-b'>

                <div className='flex flex-col'>
                    <div>
                        <h2 className='text-2xl md:text-3xl  text-primary text-center '>
                            Weight loss treatment from
                        </h2>
                        <img src="/images/orange-metabolix.webp" className='max-w-[150px] md:max-w-[200px] mx-auto mt-2' />
                    </div>
                    <div className='max-w-[1440px] '>
                        <img src="/images/img-1.webp" className='object-cover max-w-full' />
                    </div>
                </div>

            </section>


            <section className='flex flex-col md:flex-row flex-wrap items-center h-fit p-2 md:px-10'>
                <div className='flex-1  md:px-10'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-start mt-10'>
                        Frequently asked questions
                    </h2>
                    {
                        (token) ?
                            (
                                userOrders.length > 0 ?
                                    <Link href="/profile-details" className='bg-primary hover:bg-primary/90  mx-auto md:mx-0 flex items-center justify-center md:justify-start p-4 px-20 max-h-[80px] w-fit text-sm md:text-base  text-white  ms:text-lg rounded-xl mt-6 '>
                                        GET STARTED
                                    </Link>
                                    :
                                    <Link href="/get-started" className='bg-primary hover:bg-primary/90  mx-auto md:mx-0 flex items-center justify-center md:justify-start p-4 px-20 max-h-[80px] w-fit text-sm md:text-base  text-white  ms:text-lg rounded-xl mt-6'>
                                        GET STARTED
                                    </Link>
                            )
                            :
                            <Link href="/login" className='bg-primary hover:bg-primary/90  mx-auto md:mx-0 flex items-center justify-center md:justify-start p-4 px-20 max-h-[80px] w-fit text-sm md:text-base  text-white  ms:text-lg rounded-xl mt-6 '>
                                GET STARTED
                            </Link>
                    }

                </div>
                <div className='flex-1 mt-5 md mx-3'>
                    <FaqList />
                </div>

            </section>
            <section className='mt-10 bg-[#d3d2cc] p-5 mb-10 '>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-10 mb-5'>
                    Transformations
                </h2>

                <CompareModule
                    img1="/images/21.webp"
                    img2="/images/22.webp"
                    desc="Transformation after taking GLP-1, GLP-1/GIP agonists medication" />

                <CompareModule
                    img1="/images/38.webp"
                    img2="/images/39.webp"
                    desc="Transformation after taking GLP-1, GLP-1/GIP agonists medication" />
            </section>
            <section className='flex flex-wrap p-5 gap-10 justify-between md:p-10 md:mb-20'>
                <div className='w-[320px]'>
                    <h4 className='text-primary text-2xl font-bold'>Access to licensed providers</h4>
                    <p className='mt-2'>
                        Ongoing care comes from an experienced care and vetted providers specializing in weight loss—at no extra cost.
                    </p>
                </div>
                <div className='w-[320px]'>
                    <h4 className='text-primary text-2xl font-bold'>Tailored dosage regimens</h4>
                    {/* <p className='mt-3'>What sets you apart from your competition? Is it your offerings? Your philosophies? Or your values? </p> */}
                    <p className='mt-2'>
                        Dosage plans are tailored to your specific weight loss goals and preferences.
                    </p>
                </div>
                <div className='w-[320px]'>
                    <h4 className='text-primary text-2xl font-bold'>Fast and free shipping</h4>
                    {/* <p className='mt-3'>What sets you apart from your competition? Is it your offerings? Your philosophies? Or your values? </p> */}
                    <p className='mt-2'>
                        Temperature-controlled shipping ensures optimal preservation of medication by maintaining the required temperature throughout transit.
                    </p>
                </div>
            </section>


            {/* <section id="safety" className='md:p-10 px-5 mt-24'>
                <h2 className='font-semibold text-primary text-3xl md:text-4xl lg:text-5xl'>
                    IMPORTANT SAFETY INFORMATION
                </h2>

                <div className='flex flex-col gap-2 mt-10'>
                    <p>
                        <b>COMPOUNDED SEMAGLUTIDE and TIRZEPATIDE</b> are glucagon-like peptide-1 (GLP-1), GLP-1/GIP (glucose-dependent insulinotropic polypeptide) receptor agonists indicated as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with an initial body mass index (BMI) of 27 kg/m<sup>2</sup> or greater (overweight or obesity).
                    </p>

                    <p>
                        <b>Limitations of Use:</b> Co-administration of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE or any other GLP-1 receptor agonists is not recommended. The safety and efficacy of coadministration with other products for weight management have not been established. COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE has not been studied in patients with a history of pancreatitis.
                    </p>

                    <div>
                        <b>WARNING:</b> <span className='text-orange-400'>RISK OF THYROID C-CELL TUMORS</span> See full prescribing information for complete boxed warning.
                        <ul className='list-disc px-10 my-5'>
                            <li>
                                In rodents, SEMAGLUTIDE/TIRZEPATIDE causes thyroid C-cell tumors in clinically relevant exposures. It is unknown whether these medications cause thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans as the human relevance of SEMAGLUTIDE/TIRZEPATIDE-induced rodent thyroid C-cell tumors has not been determined.
                            </li>
                            <li>
                                SEMAGLUTIDE/TIRZEPATIDE is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2). Counsel patients regarding the potential risk of MTC and symptoms of thyroid tumors.
                            </li>
                        </ul>
                    </div>
                </div>

                <h4 className='font-semibold mt-5'>Do not take COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if you:</h4>
                <ul className='list-disc px-10 my-5'>
                    <li>Have a personal or family history of medullary thyroid carcinoma (MTC) or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN2).</li>
                    <li>Have been diagnosed with Diabetes (Type 1 or 2).</li>
                    <li>Have been diagnosed with pancreatitis or have a history of pancreatitis.</li>
                    <li>Have a diagnosis or history of gastroparesis - severe problems with your stomach, such as slowed emptying of your stomach (gastroparesis) or problems with digesting food.</li>
                    <li>Have a known allergy to semaglutide/tirzepatide or any other GLP-1 medication or any of the inactive ingredients in COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE. Inactive ingredients include: di-sodium hydrogen phosphate dihydrate, sodium chloride, benzyl alcohol, hydrochloric acid, sodium hydroxide pellets, and water.</li>
                    <li>Have a history of suicidal attempts or active suicidal ideation.</li>
                </ul>

                <h4 className='font-semibold mt-5'>WARNINGS AND PRECAUTIONS</h4>
                <ul className='list-disc px-10 my-5'>
                    <li>Acute Pancreatitis: Has occurred in clinical trials. Discontinue promptly if pancreatitis is suspected. Do not restart if pancreatitis is confirmed.</li>
                    <li>Acute Gallbladder Disease: Has occurred in clinical trials. If cholelithiasis is suspected, gallbladder studies and clinical follow-up are indicated.</li>
                    <li>Gastroparesis: Uncommon, but more serious gastrointestinal adverse effects may also occur more frequently with GLP-1, GLP-1/GIP receptor agonists than with other weight loss agents.</li>
                    <li>Hypoglycemia: Concomitant use with an insulin secretagogue or insulin may increase the risk of hypoglycemia, including severe hypoglycemia. Reducing the dose of insulin secretagogue or insulin may be necessary. Inform all patients of the risk of hypoglycemia and educate them on the signs and symptoms of hypoglycemia.</li>
                    <li>Acute Kidney Injury: Has occurred. Monitor renal function when initiating or escalating doses of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE in patients reporting severe adverse gastrointestinal reactions or in those with renal impairment reporting severe adverse gastrointestinal reactions.</li>
                    <li>Hypersensitivity Reactions: Anaphylactic reactions and angioedema have been reported postmarketing. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if suspected and promptly seek medical advice.</li>
                    <li>Females and Males of Reproductive Potential: Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE at least 2 months before a planned pregnancy because of the long half-life of these medications.</li>
                    <li>Pregnancy: May cause fetal harm. When pregnancy is recognized, discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE immediately.</li>
                    <li>Diabetic Retinopathy Complications in Patients with Type 2 Diabetes: Has been reported in trials with GLP-1, GLP-1/GIP agonists. Patients with a history of diabetic retinopathy should be monitored.</li>
                    <li>Heart Rate Increase: Monitor heart rate at regular intervals.</li>
                    <li>Suicidal Behavior and Ideation: Monitor for depression or suicidal thoughts. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if symptoms develop.</li>
                    <li>A recent study suggested a possible connection between semaglutide/tirzepatide use and increased risk for a blinding eye disease called non-arteritic anterior ischemic optic neuropathy (NAION). There isn&apos;t enough data yet to suggest patients should be concerned or stop taking their medications. Further research is necessary to confirm the hypothesis. Patients should make an informed choice based on individual risk.</li>
                    <li>Side Effects: Common side effects (≥5% incidence) include nausea, diarrhea, vomiting, constipation, abdominal pain, headache, fatigue, dyspepsia, dizziness, abdominal distension, eructation, hypoglycemia (in type 2 diabetes patients), flatulence, gastroenteritis, gastroesophageal reflux disease, and nasopharyngitis.</li>
                </ul>
            </section> */}
            <section id="safety" className="md:p-10 px-5 mt-24">
                <h2 className="font-semibold text-primary text-3xl md:text-4xl lg:text-5xl">
                    IMPORTANT SAFETY INFORMATION
                </h2>

                <div className="flex flex-col gap-2 mt-10">
                    <p>
                        <b>COMPOUNDED SEMAGLUTIDE and TIRZEPATIDE</b> are glucagon-like peptide-1 (GLP-1), GLP-1/GIP (glucose-dependent insulinotropic polypeptide) receptor agonists indicated as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with an initial body mass index (BMI) of: 27 kg/m<sup>2</sup> or greater (overweight or obesity).
                    </p>

                    <p>
                        <b>Limitations of Use:</b> Co-administration of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE or any other GLP-1 receptor agonists is not recommended. The safety and efficacy of co-administration with other products for weight management have not been established. COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE has not been studied in patients with a history of pancreatitis.
                    </p>


                    <div>
                        <b>WARNING:</b> <span className="text-orange-400">RISK OF THYROID C-CELL TUMORS</span> See full prescribing information for complete boxed warning.
                        <ul className="list-disc px-10 my-5">
                            <li>
                                In rodents, SEMAGLUTIDE/TIRZEPATIDE causes thyroid C-cell tumors in clinically relevant exposures. It is unknown whether these medications cause thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans as the human relevance of SEMAGLUTIDE/TIRZEPATIDE-induced rodent thyroid C-cell tumors has not been determined.
                            </li>
                            <li>
                                SEMAGLUTIDE/TIRZEPATIDE is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN2). Counsel patients regarding the potential risk of MTC and symptoms of thyroid tumors.
                            </li>
                        </ul>

                    </div>
                </div>

                <h4 className="font-semibold mt-5">Do not take COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if you:</h4>
                <ul className="list-disc px-10 my-5">
                    <li>Have a personal or family history of medullary thyroid carcinoma (MTC) or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN2).</li>
                    <li>Have been diagnosed with pancreatitis or have a history of pancreatitis.</li>
                    <li>Have a diagnosis or history of gastroparesis. This includes problems with your stomach, such as slowed emptying or problems with digesting food.</li>
                    <li>Have a known allergy to semaglutide, tirzepatide, or any other GLP-1 medication. This also includes allergy to any of the inactive ingredients in COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE. Inactive ingredients include: di-sodium hydrogen phosphate dihydrate, sodium chloride, benzyl alcohol, hydrochloric acid, sodium hydroxide pellets, and water.</li>
                    <li>Have a history of suicidal attempts or active suicidal ideation.</li>
                </ul>


                <h4 className="font-semibold mt-5">WARNINGS AND PRECAUTIONS</h4>
                <ul className="list-disc px-10 my-5">
                    <li>Acute Pancreatitis: Acute and chronic pancreatitis have been reported in clinical studies. Discontinue promptly if pancreatitis is suspected. Symptoms include persistent severe abdominal pain, sometimes radiating to the back with or without vomiting. Do not restart if pancreatitis is confirmed.</li>
                    <li>Acute Gallbladder Disease: Acute events of gallbladder disease such as cholelithiasis or cholecystitis have been reported in clinical trials. If cholelithiasis is suspected, gallbladder studies and clinical follow-up are indicated.</li>
                    <li>Gastroparesis: Uncommon, but more serious, gastrointestinal adverse effects may occur more frequently with GLP-1, GLP-1/GIP receptor agonists than with other weight loss agents.</li>
                    <li>Hypoglycemia: Concomitant use with an insulin secretagogue or insulin may increase the risk of hypoglycemia, including severe hypoglycemia. Reducing the dose of insulin secretagogue or insulin may be necessary. Inform all patients of the risk of hypoglycemia and educate them on the signs and symptoms of hypoglycemia.</li>
                    <li>Acute Kidney Injury: There have been reports of acute kidney injury in patients treated with GLP-1, GLP-1/GIP receptor agonists. Monitor renal function when initiating or escalating doses of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE in patients reporting severe adverse gastrointestinal reactions or in those with renal impairment.</li>
                    <li>Hypersensitivity Reactions: Anaphylactic reactions and angioedema have been reported in postmarketing studies. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if suspected and promptly seek medical advice.</li>
                    <li>Females and Males of Reproductive Potential: Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE at least 2 months before a planned pregnancy because of the long half-life of these medications.</li>
                    <li>Pregnancy: May cause fetal harm. When pregnancy is recognized, discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE immediately.</li>
                    <li>Diabetic Retinopathy Complications in Patients with Type 2 Diabetes: Has been reported in trials with GLP-1, GLP-1/GIP agonists. Patients with a history of diabetic retinopathy should be monitored. Diabetic retinopathy damages blood vessels in the retina and can scar the retina. As the scars get bigger, they can pull on the retina and detach it from the back of the eye, a serious condition called retinal detachment.</li>
                    <li>Heart Rate Increase: Monitor heart rate at regular intervals.</li>
                    <li>Suicidal Behavior and Ideation: Monitor for depression or suicidal thoughts. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if symptoms develop.</li>
                    <li>A recent study suggested a possible connection between semaglutide/tirzepatide use and increased risk for a blinding eye disease called non-arteritic anterior ischemic optic neuropathy (NAION). There isn't enough data yet to suggest patients should be concerned or stop taking their medications. Further research is necessary to confirm the hypothesis. Patients should make an informed choice based on individual risk.</li>
                    <li>Side Effects: Common side effects (≥5% incidence) include nausea, diarrhea, vomiting, constipation, abdominal pain, headache, fatigue, dyspepsia, dizziness, abdominal distension, eructation, hypoglycemia (in type 2 diabetes patients), flatulence, gastroenteritis, gastroesophageal reflux disease, and nasopharyngitis.</li>
                    <li>To report SUSPECTED ADVERSE REACTIONS, contact the FDA at 1-800-FDA-1088 or <a href="http://www.fda.gov/medwatch" target="_blank">www.fda.gov/medwatch</a>.</li>
                    <li>Medication Interactions: COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE delays gastric emptying. This may impact absorption of concomitantly administered oral medications. Use with caution.</li>
                    <li>Use in Specific Populations: Pregnancy - May cause fetal harm. When pregnancy is recognized, discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE.</li>
                    <li>Females and Males of Reproductive Potential: Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE at least 2 months before a planned pregnancy because of the long half-life of these medications.</li>
                    <li>Due to the delayed gastric emptying associated with the use of GLP-1, GLP-1/GIP agonists, discontinue these medications at least 2 weeks prior to any elective surgery.</li>
                </ul>

            </section>

            <Footer />
        </div>
    )
}

export default WeightLossMedication