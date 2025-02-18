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

const WeightLossMedication = () => {
    let token = getAuthToken()
    const [userOrders, setUserOrders] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [activeStep, setActiveStep] = useState('consultation');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const stepDetails = {
        consultation: {
            title: "Consultation",
            description: "Answer a quick questionnaire about your health history and goals and a MetabolixMD provider will be in touch to review your options.",
            image: "/images/consultation.webp"
        },
        "rx approval": {
            title: "Rx Approval",
            description: "Our medical team reviews your information and determines the most appropriate treatment plan for your needs.",
            image: "/images/rx_approval.webp"
        },
        "start treatment": {
            title: "Start Treatment",
            description: "Begin your personalized treatment plan with comprehensive support from our healthcare team.",
            image: "/images/startTreatment.webp"
        },
        "ongoing support": {
            title: "Ongoing Support",
            description: "Regular follow-ups and adjustments to ensure you're achieving your weight loss goals safely and effectively.",
            image: "/images/support.webp"
        }
    };

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            image: "/images/testimonials/user1.webp",
            review: "The personalized approach and constant support from the medical team made all the difference in my weight loss journey.",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            image: "/images/testimonials/user2.webp",
            review: "Quick appointments and efficient delivery of medications. The whole process was seamless and professional.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            image: "/images/testimonials/user3.webp",
            review: "I appreciate how thorough the medical team was in reviewing my health history before starting treatment.",
            rating: 5
        },
        {
            id: 4,
            name: "David Thompson",
            image: "/images/testimonials/user4.webp",
            review: "The ongoing support and regular check-ins helped me stay motivated throughout my weight loss journey.",
            rating: 5
        },
        {
            id: 5,
            name: "Lisa Martinez",
            image: "/images/testimonials/user5.webp",
            review: "Finally found a program that takes a scientific approach to weight loss. The results speak for themselves.",
            rating: 5
        },
        {
            id: 6,
            name: "James Wilson",
            image: "/images/testimonials/user6.webp",
            review: "The convenience of virtual consultations combined with quality medications made this program perfect for my busy schedule.",
            rating: 5
        },
        {
            id: 7,
            name: "Amanda Foster",
            image: "/images/testimonials/user7.webp",
            review: "Excellent communication from the medical team and great results with the prescribed medications.",
            rating: 5
        },
        {
            id: 8,
            name: "Robert Kim",
            image: "/images/testimonials/user8.webp",
            review: "Very impressed with the professionalism and knowledge of the physicians. They really understand GLP-1 medications.",
            rating: 5
        },
        {
            id: 9,
            name: "Patricia Lee",
            image: "/images/testimonials/user9.webp",
            review: "The personalized treatment plan was exactly what I needed. Great support throughout the entire process.",
            rating: 5
        }
    ];

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Update the slider to show 3 reviews on desktop
    const slidesPerView = isMobile ? 1 : 3;
    const maxSlide = testimonials.length - slidesPerView;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='font-tt-hoves mt-20 mx-4 md:mx-[10vw]'>
            <NavBar />

            <motion.section 
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className='flex flex-col lg:flex-row min-h-[85vh] gap-6 md:gap-10 sm:border-b mb-10 md:mb-20'
            >
                <motion.div 
                    variants={fadeInUp}
                    className='flex-1 flex text-center lg:text-start flex-col justify-center px-0 md:px-10'
                >
                    <h1 className='text-4xl md:text-7xl font-medium mb-4 md:mb-5 text-wrap'>
                        Your Personalised <br /> Weight Loss <span className='text-zinc-400'>Journey <br /> Starts Here</span>
                    </h1>
                    <p className='mt-2 md:mt-3 text-base md:text-lg mb-4 md:mb-5 text-zinc-800 font-medium'>
                        Connect with our US-based physicians to receive tailored support on your weight loss journey. Experience a program designed just for you
                    </p>
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
                                            className="group bg-primary relative overflow-hidden hover:bg-primary/90 transition-all duration-300 flex items-center justify-center p-4 px-6 md:px-8 w-[180px] md:w-[220px] text-white text-lg rounded-full mt-6"
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

                {/* Static Hero Image with Floating Image */}
                <motion.div 
                    className='min-h-[50vh] md:min-h-[85vh] flex-1 justify-center items-center flex relative'
                >
                    <div className="relative w-full md:w-[70%] mx-auto h-full">
                        <Image 
                            src="/images/hero-image.webp" 
                            alt="Weight loss medication"
                            width={400}
                            height={600}
                            className="w-full h-[50vh] md:h-[85vh] object-cover rounded-3xl"
                            priority
                        />
                        
                        {/* Floating Image overlaying the hero image */}
                        <div className="absolute bottom-5 right-5 z-10">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 border border-white/50"
                            >
                                <Image 
                                    src="/images/41.webp" 
                                    alt="Medicine"
                                    width={150}
                                    height={150}
                                    className="w-[100px] md:w-[120px] h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-10 bg-[#365d56] rounded-3xl mx-auto max-w-[1400px] my-16 md:my-32"
            >
                <div className="flex flex-col lg:flex-row gap-8 font-montserrat">
                    {/* Left side: Title, description, button and steps */}
                    <div className="flex-1 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-4xl md:text-6xl text-white font-medium">
                                Step-by-Step<br />Process
                            </h2>
                            <p className="text-white/80 mt-4 max-w-xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra
                            </p>
                            <Link 
                                href="/get-started"
                                className="inline-block mt-8 px-8 py-3 bg-white text-[#365d56] rounded-full font-medium hover:bg-white/90 transition-colors"
                            >
                                Start Your Journey Now
                            </Link>
                        </div>

                        {/* Steps */}
                        <div className="space-y-2">
                            {[
                                { id: '01', title: 'Consultation' },
                                { id: '02', title: 'Rx Approval' },
                                { id: '03', title: 'Start Treatment' },
                                { id: '04', title: 'Ongoing Support' }
                            ].map((step) => (
                                <motion.button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.title.toLowerCase())}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                                        activeStep === step.title.toLowerCase()
                                        ? "bg-[#1b3530] text-white" 
                                        : "bg-[#2b4a44] text-white/80 hover:bg-[#1b3530]"
                                    }`}
                                >
                                    <span className="text-lg">{step.title}</span>
                                    <span className="text-white/60 text-base">{step.id}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Image and description */}
                    <div className="flex-1">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#1b3530] rounded-3xl overflow-hidden h-full"
                        >
                            <div className="relative h-[250px] md:h-[300px]">
                                <Image
                                    src={stepDetails[activeStep].image}
                                    alt={stepDetails[activeStep].title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl text-white mb-2">
                                    {stepDetails[activeStep].title}
                                </h3>
                                <p className="text-white/70 text-sm">
                                    {stepDetails[activeStep].description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-montserrat px-4 md:px-10 mx-auto max-w-[1400px] my-16 md:my-32"
            >
                <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                    {/* Left side - Heading */}
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-7xl font-medium leading-[1.1] text-center lg:text-left mb-8 lg:mb-0">
                            Why Thousands<br />Trust Us with<br />Their Weight<br />Loss Goals
                        </h2>
                    </div>

                    {/* Right side - Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Box 1 */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors">
                                <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Same-day appointment,<br />2 day delivery</h3>
                            </div>

                            {/* Box 2 */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors">
                                <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Access to US-Licensed Physicians</h3>
                            </div>

                            {/* Box 3 */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors">
                                <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Highest Quality,<br />Lab-Tested GLP-1 Medications</h3>
                            </div>

                            {/* Box 4 */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors">
                                <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Personalized<br />Treatment Plans</h3>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <li className="text-pretty">A recent study suggested a possible connection between semaglutide/tirzepatide use and increased risk for a blinding eye disease called non-arteritic anterior ischemic optic neuropathy (NAION). There's not enough data yet to suggest patients should be concerned or stop taking their medications. Further research is necessary to confirm the hypothesis. Patients should make an informed choice based on individual risk.</li>
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

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-montserrat px-4 md:px-10 mx-auto max-w-[1400px] my-16 md:my-32 relative"
            >
                <div className="flex flex-col">
                    <div className="relative overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ 
                                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
                                width: `${(testimonials.length / slidesPerView) * 100}%`
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div 
                                    key={testimonial.id}
                                    className="px-2 md:px-3"
                                    style={{ width: `${100 / testimonials.length}%` }}
                                >
                                    <div className="bg-[#f8faf9] p-6 md:p-8 rounded-2xl h-full">
                                        {/* Star Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-base italic mb-6 line-clamp-4">{testimonial.review}</p>

                                        {/* User Info */}
                                        <div className="flex items-center gap-3 mt-auto">
                                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                                <Image 
                                                    src={testimonial.image} 
                                                    alt={testimonial.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-sm">{testimonial.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons - Show on both mobile and desktop */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button 
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    )
}

export default WeightLossMedication