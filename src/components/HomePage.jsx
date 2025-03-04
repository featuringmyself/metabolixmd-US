import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import NavBar from './NavBar'
import FaqList from './Faq'
import MeetExpertBackground from './MeetExpertBackground'
import CompareModule from './CompareModule'
import GLP1Section from './GLP1Section'
import TrustSection from './TrustSection'
import PricingSection from './PricingSection'

// Removing the auth token import
// import { getAuthToken } from '@/services/API/apiHelper'
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

const HomePage = () => {
    // Removing token check
    // let token = getAuthToken()
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
        // Commenting out the API call to avoid auth dependencies
        /*
        try {
            const res = await getMethod("/order/user");
            if (res) {
                setUserOrders(res.data);
            }
        } catch (e) {
            toast.error(e.message);
        }
        */
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
        <div className='font-tt-hoves md:mt-20 overflow-x-hidden'>
            <div className='mx-auto'>
                <NavBar />
    
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                    className='flex flex-col lg:flex-row min-h-[80vh] gap-6 md:gap-10 sm:border-b mb-10 md:mb-20 relative'
                >
                    <div 
                        className='absolute inset-0 order-2 lg:order-none hidden lg:block'
                        style={{
                            backgroundImage: 'url(/images/hero.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            transform: 'scaleX(-1)'
                        }}
                    ></div>
                    <div className='absolute inset-0 order-2 lg:order-none hidden lg:block'></div>
                    <motion.div 
                        variants={fadeInUp}
                        className='flex-1 flex text-start flex-col justify-center px-0 md:px-10 relative z-10 order-1 lg:order-none'
                    >
                        <h1 className='text-4xl md:text-7xl font-medium mb-4 md:mb-5 text-wrap mx-5 hidden md:block'>
                        <span className='text-[#365D56]'>Your Personalised <br />Weight Loss</span> <span className='text-zinc-800'>Journey <br />Starts Here</span>
                        </h1>
                        <h1 className='text-4xl md:text-7xl font-medium mb-4 md:mb-5 text-wrap mx-5 md:hidden'>
                        <span className='text-[#365D56]'>Your <br />Personalised <br />Weight Loss</span> <span className='text-zinc-800'>Journey Starts Here</span>
                        </h1>
                        <p className='mt-2 md:mt-3 font-light md:text-lg mb-4 md:mb-5 text-zinc-600 md:max-w-[30%] max-w-[90%] text-start mx-5'>
                            Connect with our US-based physicians to receive tailored support on your weight loss journey. Experience a program designed just for you
                        </p>
                        {/* Replacing the conditional rendering with a simple button */}
                        <motion.div className="md:block flex justify-start pl-2">
                            <Link 
                                href="/get-started" 
                                className="group bg-primary relative overflow-hidden hover:bg-primary/90 transition-all duration-300 flex items-center justify-center p-3 px-5 md:px-10 w-[200px] md:w-[300px] text-white text-md rounded-full mt-6"
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
    
                        {/* <div className='flex justify-center md:justify-start items-center gap-4 my-5'>
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
                        </div> */}
                    </motion.div>
    
                    {/* Rest of the code remains unchanged */}
                    
                    <Image src="/images/hero.png" width={4096} height={1951} className='absolute bottom-0 right-0 -z-20 -scale-x-100 h-[50vw] md:hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent),linear-gradient(to_top,white,white_90%,transparent)] object-cover' />
                </motion.section>
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="font-montserrat mx-auto max-w-[1600px] my-16 md:my-32"
                >
                    {/* Step-by-Step Process heading and description */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16 font-inter px-3">
                        <div className="md:max-w-[50%]">
                            <h2 className="text-4xl md:text-6xl font-semibold text-zinc-800">
                                Step-by-Step <br />Process
                            </h2>
                        </div>
                        <div className="md:max-w-[40%] mt-6 md:mt-0">
                            <p className="text-zinc-600 mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra
                            </p>
                            <Link 
                                href="/get-started"
                                className="inline-block px-8 py-3 bg-white border border-zinc-200 text-zinc-800 rounded-full font-medium hover:bg-zinc-50 transition-colors"
                            >
                                Start Your Journey Now
                            </Link>
                        </div>
                    </div>
                    
                    <div className="flex flex-col-reverse lg:flex-row gap-8 font-montserrat bg-[#F6F6F3] px-12 rounded-2xl">
                        {/* Left side: Number, Title, description */}
                        <div className="flex-1 flex flex-col justify-center">
                            {/* Orange numbered circle */}
                            <div className="bg-orange-500 text-white w-16 h-16 rounded-full items-center justify-center text-2xl font-medium mb-6 md:flex hidden">
                                {Object.keys(stepDetails).indexOf(activeStep) + 1}
                            </div>
                            
                            <div className="mb-8 w-[80%]">
                                <h2 className="text-4xl md:text-6xl text-zinc-800 font-medium">
                                    {stepDetails[activeStep].title}
                                </h2>
                                <p className="text-zinc-600 mt-4 max-w-xl">
                                    {stepDetails[activeStep].description}
                                </p>
                                
                            </div>
                        </div>
                        {/* Right side: Image with process steps overlay */}
                        <div className="flex-1">
                            <div className="relative h-[500px] rounded-3xl overflow-hidden">
                                {/* Main image */}
                                <Image
                                    src={stepDetails[activeStep].image}
                                    alt={stepDetails[activeStep].title}
                                    fill
                                    className="object-cover"
                                />
                                
                                {/* Process steps overlay - positioned differently based on screen size */}
                                <div className="absolute inset-0 flex md:flex-col md:justify-center md:items-start p-6">
                                    {/* Step buttons */}
                                    <div className="md:space-y-3 flex md:flex-col flex-row gap-2 md:gap-0 absolute md:static bottom-4 left-0 right-0 justify-center md:justify-start">
                                        {Object.entries(stepDetails).map(([key, step], index) => (
                                            <button
                                                key={key}
                                                onClick={() => setActiveStep(key)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                                                    activeStep === key
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-[#F6F6F3] text-zinc-800 hover:bg-[#F6F6F3]/80"
                                                } transition-all duration-200 ${
                                                    index !== Object.entries(stepDetails).length - 1 ? "md:mb-3" : ""
                                                }`}
                                            >
                                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-primary">
                                                    {index + 1}
                                                </div>
                                                <span className="hidden md:inline font-medium">{step.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
                
                {/* Why Thousands Trust Us Section */}
                <TrustSection />
                
                {/* GLP-1 Information Section */}
                <GLP1Section />
    
                {/* Pricing Section */}
                <PricingSection />

                {/* FAQ Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="font-montserrat px-4 md:px-6 mx-auto max-w-[1600px] my-16 md:my-32 min-h-[100vh] md:min-h-[100vh] flex flex-col"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-7xl font-medium leading-[1.1] mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-zinc-600 max-w-2xl mx-auto">
                            Get answers to the most common questions about GLP-1 medications and our weight loss program.
                        </p>
                    </motion.div>
    
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                        <div className="lg:w-1/3">
                            <motion.div 
                                variants={fadeInUp}
                                className="bg-[#365D56] p-8 md:p-10 rounded-3xl text-white h-full"
                            >
                                <h3 className="text-2xl md:text-4xl font-medium mb-6">Still have questions?</h3>
                                <p className="mb-8 opacity-90">Our team is here to help you with any questions you may have about our weight loss program or GLP-1 medications.</p>
                                <Link 
                                    href="/contact-us" 
                                    className="inline-block bg-white text-[#365D56] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium"
                                >
                                    Contact Us
                                </Link>
                            </motion.div>
                        </div>
                        <div className="lg:w-2/3">
                            <motion.div 
                                variants={fadeInUp}
                                className="p-8 md:p-10 rounded-3xl shadow-sm"
                            >
                                <FaqList />
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
    
            <Footer />
            </div>
        </div>
    );
};

export default HomePage;