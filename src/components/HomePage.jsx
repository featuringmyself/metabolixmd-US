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
    const [currentWeight, setCurrentWeight] = useState(252);
    const [weightLoss, setWeightLoss] = useState(50);

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
    // Add this function to handle weight changes
    const handleWeightChange = (weight) => {
        setCurrentWeight(weight);
        // Calculate 20% of current weight
        setWeightLoss(Math.round(weight * 0.20));
    };
    return (
        <div className='font-tt-hoves mt-20 overflow-x-hidden'>
            <div className='container mx-auto px-4 md:px-[10vw]'>
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
                        <span className='text-[#365D56]'>Your Personalised <br /> Weight Loss</span> <span className='text-zinc-800'>Journey <br /> Starts Here</span>
                        </h1>
                        <p className='mt-2 md:mt-3 font-light md:text-lg mb-4 md:mb-5 text-zinc-600 w-[80%]'>
                            Connect with our US-based physicians to receive tailored support on your weight loss journey. Experience a program designed just for you
                        </p>
                        {
                            (token) ?
                                (
                                    userOrders.length > 0 ?
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="md:block w-full flex justify-center md:justify-start"
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
                                        <motion.div className=" md:block w-full flex justify-center md:justify-start">
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
                                <motion.div className=" md:block w-full flex justify-center md:justify-start">
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
                        <div className="relative w-full md:w-[60%] mx-auto h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10"></div>
                            <Image 
                                src="/images/hero.jpg" 
                                alt="Weight loss medication"
                                width={400}
                                height={600}
                                className="w-full h-[50vh] md:h-[85vh] object-cover rounded-3xl"
                                priority
                            />
                            
                            {/* Floating Image overlaying the hero image */}
                            <div className="absolute bottom-5 right-5 z-20">
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
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                {/* Box 1 */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors h-full">
                                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                        <h3 className="text-lg md:text-xl font-medium mb-2">Same-day appointment,<br />2 day delivery</h3>
                                </div>
    
                                {/* Box 2 */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors h-full">
                                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                        <h3 className="text-lg md:text-xl font-medium mb-2">Access to US-Licensed Physicians</h3>
                                </div>
    
                                {/* Box 3 */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors h-full">
                                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                        <h3 className="text-lg md:text-xl font-medium mb-2">Highest Quality,<br />Lab-Tested GLP-1 Medications</h3>
                                </div>
    
                                {/* Box 4 */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors h-full">
                                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                        <h3 className="text-lg md:text-xl font-medium mb-2">Personalized<br />Treatment Plans</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
    
                    {/* Reviews Section - Now directly below the trust section */}
                    <div className="mt-20 pt-10 border-t">
                        <h2 className="text-3xl md:text-4xl font-medium text-center mb-12">
                            What Our Patients Say
                        </h2>
                        
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
    
                        {/* Navigation Buttons */}
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
    
                    {/* GLP-1 Drugs Section */}
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 pt-10 bg-[#f8faf9] w-full rounded-xl"
                    >
                        <div className="flex flex-col max-w-[1400px] mx-auto px-4 md:px-10 ">
                            <div className="mb-12">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-4xl md:text-7xl font-medium mb-4">
                                        Understanding<br />GLP-1 Drugs
                                    </h2>
                                    <Link 
                                        href="/get-started"
                                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors"
                                    >
                                        Find Your Treatment
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                                <p className="text-lg mt-4 text-zinc-600">
                                    What they are, how they function to support weight loss, and why they are effective.
                                </p>
                            </div>
    
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* First Card */}
                                <div className="bg-white p-6 rounded-3xl">
                                    <div className="bg-[#f8faf9] p-6 rounded-3xl relative">
                                        <div className="relative h-[300px] md:h-[350px] mb-[-50px]">
                                            <Image
                                                src="/images/41.webp"
                                                alt="Semaglutide Injection"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="bg-white rounded-2xl p-4">
                                            <p className="text-sm text-zinc-500">Injection</p>
                                            <h3 className="text-2xl font-medium mt-1">Semaglutide</h3>
                                        </div>
                                        <Link 
                                            href="#safety"
                                            className="text-sm font-medium underline text-black text-center block mt-6"
                                        >
                                            Important safety information
                                        </Link>
                                    </div>
                                </div>
    
                                {/* Second Card */}
                                <div className="bg-white p-6 rounded-3xl">
                                    <div className="bg-[#f8faf9] p-6 rounded-3xl relative">
                                        <div className="relative h-[300px] md:h-[350px] mb-[-50px]">
                                            <Image
                                                src="/images/medicine-2.webp"
                                                alt="Tirzepatide Injection"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="bg-white rounded-2xl p-4">
                                            <p className="text-sm text-zinc-500">Injection</p>
                                            <h3 className="text-2xl font-medium mt-1">Tirzepatide</h3>
                                        </div>
                                        <Link 
                                            href="#safety"
                                            className="text-sm  font-medium underline text-black text-center block mt-6"
                                        >
                                            Important safety information
                                        </Link>
                                    </div>
                                </div>
                        </div>
                    </div>
                </motion.section>
    
                {/* Weight Loss Calculator Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#365d56] rounded-3xl py-20 my-20"
                >
                    <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            {/* Left side */}
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-7xl text-white font-medium mb-6">
                                    Lose <span className='opacity-60'>15-20%</span><br />Body Fat<br />in a Year!
                                </h2>
                                <Link 
                                    href="/get-started"
                                    className="inline-flex items-center mt-10 gap-2 bg-white text-ZINC-800 px-12 py-3 rounded-full hover:bg-white/90 transition-colors text-lg font-medium"
                                >
                                    Get Started
                                </Link>
                            </div>
    
                            {/* Right side - Calculator Card */}
                            <div className="flex-1 font-montserrat">
                                <div className="bg-white p-8 rounded-3xl max-w-none md:max-w-[500px] ml-auto">
                                    <div className="space-y-8">
                                        {/* Current Weight Input */}
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="text-2xl tracking-tighter font-medium capitalize">
                                                    Select your<br />Current Weight
                                                </label>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-6xl font-medium">{currentWeight}</span>
                                                    <span className="text-xl mb-2">lbs</span>
                                                </div>
                                            </div>
                                            <input 
                                                type="range"
                                                min="100"
                                                max="400"
                                                value={currentWeight}
                                                onChange={(e) => handleWeightChange(Number(e.target.value))}
                                                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer 
                                                    [&::-webkit-slider-thumb]:appearance-none 
                                                    [&::-webkit-slider-thumb]:h-5 
                                                    [&::-webkit-slider-thumb]:w-5 
                                                    [&::-webkit-slider-thumb]:bg-[#365d56]
                                                    [&::-webkit-slider-thumb]:rounded-full
                                                    [&::-webkit-slider-thumb]:cursor-pointer
                                                    [&::-webkit-slider-thumb]:ring-2
                                                    [&::-webkit-slider-thumb]:ring-white
                                                    [&::-moz-range-thumb]:h-5
                                                    [&::-moz-range-thumb]:w-5
                                                    [&::-moz-range-thumb]:bg-[#365d56]
                                                    [&::-moz-range-thumb]:rounded-full
                                                    [&::-moz-range-thumb]:border-none
                                                    [&::-moz-range-thumb]:ring-2
                                                    [&::-moz-range-thumb]:ring-white
                                                    [&::-moz-range-thumb]:cursor-pointer
                                                    [&::-webkit-slider-runnable-track]:rounded-full
                                                    [&::-webkit-slider-runnable-track]:h-1
                                                    [&::-moz-range-track]:rounded-full
                                                    [&::-moz-range-track]:h-1"
                                                style={{
                                                    background: `linear-gradient(to right, 
                                                        #365d56 0%, 
                                                        #365d56 ${((currentWeight - 100) / 300) * 100}%, 
                                                        #e5e7eb ${((currentWeight - 100) / 300) * 100}%, 
                                                        #e5e7eb 100%)`
                                                }}
                                            />
                                        </div>
    
                                        {/* Weight Loss Projection */}
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <label className="text-2xl font-medium">
                                                    Weight you<br />could lose (lbs):
                                                </label>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-7xl font-medium">{weightLoss}</span>
                                                    <span className="text-2xl mb-3">lbs</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
    
                {/* Lab Tested Section - Moved here */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 w-full"
                >
                    <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            {/* Left side - Text */}
                            <div>
                                <h2 className="text-4xl md:text-7xl font-medium mb-4 leading-[1.1]">
                                    Lab tested<br />& Certified
                                </h2>
                                <p className="text-lg text-zinc-600">
                                    Filled the shipped same day as your appointment
                                </p>
                            </div>
    
                            {/* Right side - Images */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                                    <Image
                                        src="/images/lab-doctor.webp"
                                        alt="Lab Testing Process"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-[350px] md:h-[350px] rounded-2xl overflow-hidden">
                                    <Image
                                        src="/images/assesment.jpg"
                                        alt="Lab Certification"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
    
            <Footer />
        </div>
    )
}

export default WeightLossMedication