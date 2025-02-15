import React, { useEffect, useState, useRef } from 'react'
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
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Add this CSS at the top of your file or in your global CSS
const cardContainerStyle = {
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none',   /* Firefox */
    '&::-webkit-scrollbar': {
        display: 'none'       /* Chrome, Safari and Opera */
    }
};

const MagnifyImage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        setMousePosition({ x, y });
    };

    return (
        <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='bg-[#f5f4f2] min-h-[300px] flex-1 justify-center items-center flex overflow-hidden'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={imageRef}
        >
            <div className="relative w-full h-full overflow-hidden">
                <div
                    className="transition-transform duration-200 ease-out"
                    style={{
                        transform: isHovered
                            ? `scale(1.5) translate(${(0.5 - mousePosition.x) * 20}px, ${(0.5 - mousePosition.y) * 20}px)`
                            : 'scale(1)',
                        transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
                    }}
                >
                    <Image 
                        src="/images/medicine.webp" 
                        alt="Weight loss medication"
                        width={400}
                        height={300}
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </div>
        </motion.div>
    );
};

const WeightLossMedication = () => {
    let token = getAuthToken()
    const [userOrders, setUserOrders] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);

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

    // Add these animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Add these new variants
    const scaleIn = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const slideInLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    // Add this new animation variant
    const cardVariants = {
        hover: { scale: 1.05 },
        initial: { scale: 1 }
    };

    // Add this function at the top of your component
    const scrollToSafety = (e) => {
        e.preventDefault();
        const safetySection = document.getElementById('safety');
        safetySection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='font-tt-hoves mt-20' >
            <NavBar />

            <motion.section 
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className='flex flex-col-reverse lg:flex-row   min-h-[600px] gap-10 sm:border-b'
            >
                <motion.div 
                    variants={fadeInUp}
                    className='flex-1 flex text-center md:text-start flex-col justify-center    px-2 md:px-10'
                >
                    <h1 className='text-4xl    font-medium text-wrap'>
                        {/* Get Access to prescription<br />
                        <b className='text-orange-500 text-wrap'>Weight Loss </b>
                        Medication Online */}
                        Unlock your metabolic health and <br /> weight loss potential with
                    </h1>
                    <motion.img 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        src="/images/orange-metabolix.webp" 
                        className='max-w-[150px] md:max-w-[170px] mx-auto md:mx-0 mt-2'
                    />
                    <p className='mt-3 text-sm  text-zinc-500'>
                        Discover our revolutionary GLP-1, GLP-1/GIP program, expertly crafted to support your journey to a healthier, happier you. Our dedicated team will guide you every step of the way.


                    </p><p className='mt-3 text-sm  text-zinc-500'>Schedule a consultation and see if you qualify for our program.
                        We partner only with top-notch 503A and 503B pharmacies to ensure seamless delivery of our premium compounded medicines, directly to your door.</p>
                    {
                        (token) ?
                            (
                                userOrders.length > 0 ?
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="hidden md:block w-full flex justify-center md:justify-start"
                                    >
                                        <Link 
                                            href="/profile-details" 
                                            className="group bg-primary relative overflow-hidden hover:bg-primary/90 transition-all duration-300 flex items-center justify-center p-4 px-8 md:px-10 w-[200px] md:w-[300px] text-white text-lg rounded-full mt-6"
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                                animate={{
                                                    x: ['-100%', '100%'],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                            <motion.span
                                                className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
                                            >
                                                GET STARTED
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5" 
                                                    viewBox="0 0 20 20" 
                                                    fill="currentColor"
                                                >
                                                    <path 
                                                        fillRule="evenodd" 
                                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                                                        clipRule="evenodd" 
                                                    />
                                                </svg>
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                    :
                                    <motion.div className="hidden md:block w-full flex justify-center md:justify-start">
                                        <Link 
                                            href="/get-started" 
                                            className="group bg-primary relative overflow-hidden hover:bg-primary/90 transition-all duration-300 flex items-center justify-center p-4 px-8 md:px-10 w-[200px] md:w-[300px] text-white text-lg rounded-full mt-6"
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                                animate={{
                                                    x: ['-100%', '100%'],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                            <motion.span
                                                className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
                                            >
                                                GET STARTED
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5" 
                                                    viewBox="0 0 20 20" 
                                                    fill="currentColor"
                                                >
                                                    <path 
                                                        fillRule="evenodd" 
                                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                                                        clipRule="evenodd" 
                                                    />
                                                </svg>
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                            )
                            :
                            <motion.div className="hidden md:block w-full flex justify-center md:justify-start">
                                <Link 
                                    href="/login" 
                                    className="group bg-primary relative overflow-hidden hover:bg-primary/90 transition-all duration-300 flex items-center justify-center p-4 px-8 md:px-10 w-[200px] md:w-[300px] text-white text-lg rounded-full mt-6"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                        animate={{
                                            x: ['-100%', '100%'],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.span
                                        className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
                                    >
                                        GET STARTED
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5" 
                                            viewBox="0 0 20 20" 
                                            fill="currentColor"
                                        >
                                            <path 
                                                fillRule="evenodd" 
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                    </motion.span>
                                </Link>
                            </motion.div>
                    }

                    <div className='flex justify-center md:justify-start items-center gap-4 my-5'>
                        <Link 
                            href="#safety" 
                            onClick={scrollToSafety}
                            className='text-sm underline text-primary'
                        >
                            Important safety information
                        </Link>

                        <Link 
                            href="#safety" 
                            onClick={scrollToSafety}
                            className='bg-white border-primary border rounded-full size-10 flex items-center justify-center'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
                <MagnifyImage />
            </motion.section>
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='px-3 md:px-10 mt-10 '
            >
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
                <div className='mt-5 flex justify-evenly gap-10 overflow-x-scroll' style={cardContainerStyle}>
                    <div className='flex gap-10 snap-x snap-mandatory'>
                        {[1, 2, 3].map((cardIndex) => (
                            <motion.div 
                                key={cardIndex}
                                variants={fadeInUp}
                                className='min-w-[95vw] md:min-w-fit snap-center relative'
                                animate={{
                                    scale: hoveredCard === cardIndex ? 1.05 : 1,
                                    filter: hoveredCard && hoveredCard !== cardIndex ? 'blur(2px)' : 'blur(0px)',
                                    opacity: hoveredCard && hoveredCard !== cardIndex ? 0.7 : 1,
                                }}
                                onHoverStart={() => setHoveredCard(cardIndex)}
                                onHoverEnd={() => setHoveredCard(null)}
                                transition={{ duration: 0.2 }}
                            >
                                <div className='bg-[#d8d6d3] px-5 py-7 rounded-3xl relative'>
                                    {cardIndex === 1 && (
                                        <>
                                            <div className='flex flex-wrap items-center justify-between'>
                                                <div className=''>
                                                    <h2 className='w-fit text-primary text-4xl'>
                                                        Semaglutide
                                                    </h2>
                                                    <p>Injection</p>
                                                </div>

                                                <div className='bg-primary text-xs px-5 p-2 text-white md:p-4 rounded-3xl md:px-10'>
                                                    In Stock
                                                </div>
                                            </div>
                                            <div className='h-[400px] min-w-full md:min-w-[350px] flex relative'>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Image 
                                                        src="/images/41.webp" 
                                                        alt="Medical consultation"
                                                        width={250}
                                                        height={400}
                                                        className="object-contain max-h-[400px] w-auto"
                                                        priority
                                                    />
                                                </div>
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

                                        </>
                                    )}
                                    {cardIndex === 2 && (
                                        <>
                                            <div className='flex flex-wrap items-center justify-between w-full gap-10'>
                                                <div className=''>
                                                    <h2 className='w-fit text-primary text-4xl'>
                                                        Tirzepatide
                                                    </h2>
                                                    <p>Injection</p>
                                                </div>

                                                <div className='bg-primary text-xs px-5 p-2 text-white md:p-4 rounded-3xl md:px-10'>
                                                    In Stock
                                                </div>
                                            </div>
                                            <div className='h-[400px] min-w-full md:min-w-[350px] flex relative'>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Image 
                                                        src="/images/medicine-2.webp" 
                                                        alt="Prescription medication"
                                                        width={250}
                                                        height={400}
                                                        className="object-contain max-h-[400px] w-auto"
                                                    />
                                                </div>
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

                                        </>
                                    )}
                                    {cardIndex === 3 && (
                                        <>
                                            <div className='flex flex-wrap items-center justify-between w-full gap-10'>
                                                <div className=''>
                                                    <h2 className='w-fit text-primary text-4xl'>
                                                        Tirzepatide
                                                    </h2>
                                                    <p>Injection</p>
                                                </div>

                                                <div className='bg-primary text-xs px-5 p-2 text-white md:p-4 rounded-3xl md:px-10'>
                                                    In Stock
                                                </div>
                                            </div>
                                            <div className='h-[400px] min-w-full md:min-w-[350px] flex relative'>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Image 
                                                        src="/images/42.webp" 
                                                        alt="Healthcare service"
                                                        width={300}
                                                        height={400}
                                                        className="object-contain max-h-[400px] w-auto"
                                                    />
                                                </div>
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

                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <p className='mt-5 text-zinc-400'>
                    Semaglutide and Tirzepatide facilitate significant weight loss by reducing appetite and slowing gastric emptying. These medications also reduce the risk of cardiovascular events, such as heart attacks and strokes. With a low risk of hypoglycemia, they act primarily in response to elevated blood sugar levels. Additionally, they may help reduce liver fat and improve liver function, offering potential benefits.
                </p>
                
            </motion.section>
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ backgroundImage: "url(/images/20.webp)" }} 
                className='h-screen   bg-clip-padding backdrop-blur-md  flex flex-col justify-center   mt-10 bg-cover bg-no-repeat bg-center bg-opacity-50 '
            >
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
            </motion.section>
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='min-h-96 h-fit py-20 flex flex-col justify-center items-center border-b'
            >
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col'
                >
                    <div>
                        <motion.h2 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='text-2xl md:text-3xl text-primary text-center'
                        >
                            Weight loss treatment from
                        </motion.h2>
                        <motion.img 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            src="/images/orange-metabolix.webp" 
                            className='max-w-[150px] md:max-w-[200px] mx-auto mt-2'
                        />
                    </div>
                </motion.div>
            </motion.section>


            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='flex flex-col  flex-wrap items-center h-fit p-2 md:px-10 justify-center'
            >
                <div className='w-[95vw] flex justify-between items-center'>
                    <h2 className='text-xl md:text-4xl lg:text-5xl font-bold text-center md:text-start mt-10'>
                        Frequently asked questions
                    </h2>
                    {
                        (token) ?
                            (
                                userOrders.length > 0 ?
                                    <Link href="/profile-details" className='bg-primary hover:bg-primary/90 md:mx-0 flex items-center justify-center md:justify-start py-3 px-5 mx-3 max-h-[80px] w-fit text-sm md:text-base  text-white  ms:text-lg rounded-xl mt-6 '>
                                        GET STARTED
                                    </Link>
                                    :
                                    <Link href="/get-started" className='bg-primary hover:bg-primary/90 md:mx-0 flex items-center justify-center md:justify-start py-3 px-5 mx-3 max-h-[80px] w-fit text-sm md:text-base  text-white  ms:text-lg rounded-xl mt-6'>
                                        GET STARTED
                                    </Link>
                            )
                            :
                            <Link href="/login" className='bg-primary hover:bg-primary/90 md:mx-0 flex items-center justify-center md:justify-start py-3 px-5 mx-3 max-h-[80px] w-fit text-sm md:text-base  text-white  ms:text-lg rounded-xl mt-6 '>
                                GET STARTED
                            </Link>
                    }

                </div>
                <div className='mt-7 md mx-3'>
                    <FaqList />
                </div>

            </motion.section>
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='mt-10 bg-[#d3d2cc] p-5 mb-10'
            >
                <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-10 mb-5'
                >
                    Transformations
                </motion.h2>

                <motion.div
                    variants={staggerChildren}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeInUp}>
                        <CompareModule
                            img1="/images/21.webp"
                            img2="/images/22.webp"
                            desc="Transformation after taking GLP-1, GLP-1/GIP agonists medication" 
                        />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        <CompareModule
                            img1="/images/38.webp"
                            img2="/images/39.webp"
                            desc="Transformation after taking GLP-1, GLP-1/GIP agonists medication" 
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
            <motion.section 
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className='flex flex-wrap p-5 gap-10 justify-between md:p-10 md:mb-20'
            >
                <motion.div 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className='w-[320px]'
                >
                    <h4 className='text-primary text-2xl font-bold'>Access to licensed providers</h4>
                    <p className='mt-2'>
                        Ongoing care comes from an experienced care and vetted providers specializing in weight loss—at no extra cost.
                    </p>
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className='w-[320px]'
                >
                    <h4 className='text-primary text-2xl font-bold'>Tailored dosage regimens</h4>
                    <p className='mt-2'>
                        Dosage plans are tailored to your specific weight loss goals and preferences.
                    </p>
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className='w-[320px]'
                >
                    <h4 className='text-primary text-2xl font-bold'>Fast and free shipping</h4>
                    <p className='mt-2'>
                        Temperature-controlled shipping ensures optimal preservation of medication by maintaining the required temperature throughout transit.
                    </p>
                </motion.div>
            </motion.section>


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
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="safety" 
                className="px-4 md:p-10 mt-16 md:mt-24 max-w-[1920px] mx-auto"
            >
                <div className="bg-white rounded-2xl shadow-soft p-4 md:p-8 lg:p-12 border border-primary/5">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="font-semibold text-primary text-2xl md:text-4xl lg:text-5xl font-montserrat mb-6 md:mb-8">
                            IMPORTANT SAFETY INFORMATION
                        </h2>

                        <div className="space-y-6 md:space-y-8 font-poppins text-[15px] md:text-base">
                            {/* Main Description */}
                            <div className="bg-primary/5 p-4 md:p-6 rounded-xl">
                                <p className="text-gray-700">
                                    <span className="font-semibold">COMPOUNDED SEMAGLUTIDE and TIRZEPATIDE</span> are glucagon-like peptide-1 (GLP-1), GLP-1/GIP receptor agonists indicated as an adjunct to a reduced-calorie diet and increased physical activity for chronic weight management in adults with an initial body mass index (BMI) of: 27 kg/m<sup>2</sup> or greater.
                                </p>
                            </div>

                            {/* Warning Box */}
                            <div className="bg-primary/5 p-4 md:p-6 rounded-xl">
                                <div>
                                    <h3 className="text-primary/90 font-semibold text-lg mb-2">WARNING: RISK OF THYROID C-CELL TUMORS</h3>
                                    <ul className="list-disc ml-6 space-y-3 text-gray-700">
                                        <li>
                                            In rodents, SEMAGLUTIDE/TIRZEPATIDE causes thyroid C-cell tumors in clinically relevant exposures. It is unknown whether these medications cause thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans as the human relevance of SEMAGLUTIDE/TIRZEPATIDE-induced rodent thyroid C-cell tumors has not been determined.
                                        </li>
                                        <li>
                                            SEMAGLUTIDE/TIRZEPATIDE is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN2).
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Do Not Take Section */}
                            <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-primary mb-4">Do not take COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if you:</h3>
                                <ul className="list-disc ml-4 md:ml-6 space-y-2 text-gray-700">
                                    <li className="text-pretty">Have a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN2).</li>
                                    <li className="text-pretty">Have been diagnosed with pancreatitis or have a history of pancreatitis.</li>
                                    <li className="text-pretty">Have a diagnosis or history of gastroparesis.</li>
                                    <li className="text-pretty">Have a known allergy to semaglutide, tirzepatide, or any other GLP-1 medication.</li>
                                    <li className="text-pretty">Have a history of suicidal attempts or active suicidal ideation.</li>
                                </ul>
                            </div>

                            {/* Warnings and Precautions */}
                            <div className="bg-primary/5 p-4 md:p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-primary mb-4">WARNINGS AND PRECAUTIONS</h3>
                                <ul className="list-disc ml-4 md:ml-6 space-y-3 text-gray-700">
                                    <li className="text-pretty">Acute Pancreatitis: Acute and chronic pancreatitis have been reported in clinical studies. Discontinue promptly if pancreatitis is suspected. Symptoms include persistent severe abdominal pain, sometimes radiating to the back with or without vomiting. Do not restart if pancreatitis is confirmed.</li>
                                    <li className="text-pretty">Acute Gallbladder Disease: Acute events of gallbladder disease such as cholelithiasis or cholecystitis have been reported in clinical trials. If cholelithiasis is suspected, gallbladder studies and clinical follow-up are indicated.</li>
                                    <li className="text-pretty">Gastroparesis: Uncommon, but more serious, gastrointestinal adverse effects may occur more frequently with GLP-1, GLP-1/GIP receptor agonists than with other weight loss agents.</li>
                                    <li className="text-pretty">Hypoglycemia: Concomitant use with an insulin secretagogue or insulin may increase the risk of hypoglycemia, including severe hypoglycemia. Reducing the dose of insulin secretagogue or insulin may be necessary. Inform all patients of the risk of hypoglycemia and educate them on the signs and symptoms of hypoglycemia.</li>
                                    <li className="text-pretty">Acute Kidney Injury: There have been reports of acute kidney injury in patients treated with GLP-1, GLP-1/GIP receptor agonists. Monitor renal function when initiating or escalating doses of COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE in patients reporting severe adverse gastrointestinal reactions or in those with renal impairment.</li>
                                    <li className="text-pretty">Hypersensitivity Reactions: Anaphylactic reactions and angioedema have been reported in postmarketing studies. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if suspected and promptly seek medical advice.</li>
                                    <li className="text-pretty">Females and Males of Reproductive Potential: Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE at least 2 months before a planned pregnancy because of the long half-life of these medications.</li>
                                    <li className="text-pretty">Pregnancy: May cause fetal harm. When pregnancy is recognized, discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE immediately.</li>
                                    <li className="text-pretty">Diabetic Retinopathy Complications in Patients with Type 2 Diabetes: Has been reported in trials with GLP-1, GLP-1/GIP agonists. Patients with a history of diabetic retinopathy should be monitored. Diabetic retinopathy damages blood vessels in the retina and can scar the retina. As the scars get bigger, they can pull on the retina and detach it from the back of the eye, a serious condition called retinal detachment.</li>
                                    <li className="text-pretty">Heart Rate Increase: Monitor heart rate at regular intervals.</li>
                                    <li className="text-pretty">Suicidal Behavior and Ideation: Monitor for depression or suicidal thoughts. Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE if symptoms develop.</li>
                                    <li className="text-pretty">A recent study suggested a possible connection between semaglutide/tirzepatide use and increased risk for a blinding eye disease called non-arteritic anterior ischemic optic neuropathy (NAION). There isn't enough data yet to suggest patients should be concerned or stop taking their medications. Further research is necessary to confirm the hypothesis. Patients should make an informed choice based on individual risk.</li>
                                    <li className="text-pretty">Side Effects: Common side effects (≥5% incidence) include nausea, diarrhea, vomiting, constipation, abdominal pain, headache, fatigue, dyspepsia, dizziness, abdominal distension, eructation, hypoglycemia (in type 2 diabetes patients), flatulence, gastroenteritis, gastroesophageal reflux disease, and nasopharyngitis.</li>
                                    <li className="text-pretty">To report SUSPECTED ADVERSE REACTIONS, contact the FDA at 1-800-FDA-1088 or <a href="http://www.fda.gov/medwatch" target="_blank">www.fda.gov/medwatch</a>.</li>
                                    <li className="text-pretty">Medication Interactions: COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE delays gastric emptying. This may impact absorption of concomitantly administered oral medications. Use with caution.</li>
                                    <li className="text-pretty">Use in Specific Populations: Pregnancy - May cause fetal harm. When pregnancy is recognized, discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE.</li>
                                    <li className="text-pretty">Females and Males of Reproductive Potential: Discontinue COMPOUNDED SEMAGLUTIDE/TIRZEPATIDE at least 2 months before a planned pregnancy because of the long half-life of these medications.</li>
                                    <li className="text-pretty">Due to the delayed gastric emptying associated with the use of GLP-1, GLP-1/GIP agonists, discontinue these medications at least 2 weeks prior to any elective surgery.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    )
}

export default WeightLossMedication