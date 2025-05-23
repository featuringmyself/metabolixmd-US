import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NavBar from "./NavBar";
import FaqList from "./Faq";
import MeetExpertBackground from "./MeetExpertBackground";
import CompareModule from "./CompareModule";
import GLP1Section from "./GLP1Section";
import TrustSection from "./TrustSection";
import ReviewsSection from "./ReviewsSection";
import PricingSection from "./PricingSection";
import TestimonialSection from "./TestimonialSection.jsx";
import WeightLossCalculatorSection from "./WeightLossCalculatorSection";
import bgVector from "@/../public/images/metabolixmd-bg-vector.svg";

// Removing the auth token import
// import { getAuthToken } from '@/services/API/apiHelper'
import Link from "next/link";
import Footer from "./Footer";
import { getMethod } from "@/services/API/ApiMethod";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Add this CSS at the top of your file or in your global CSS
const cardContainerStyle = {
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome, Safari and Opera */,
  },
};

const HomePage = () => {
  // Removing token check
  // let token = getAuthToken()
  const [userOrders, setUserOrders] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeStep, setActiveStep] = useState("consultation");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(252);
  const [weightLoss, setWeightLoss] = useState(50);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState({});

  const stepDetails = {
    consultation: {
      title: "Consultation",
      description:
        "Answer a quick questionnaire about your health history and goals and a MetabolixMD provider will be in touch to review your options.",
      image: "/images/consultation.jpg",
    },
    "rx approval": {
      title: "Rx Approval",
      description:
        "Our medical team reviews your information and determines the most appropriate treatment plan for your needs.",
      image: "/images/rx_approval.webp",
    },
    "start treatment": {
      title: "Start Treatment",
      description:
        "Begin your personalized treatment plan with comprehensive support from our healthcare team.",
      image: "/images/startTreatment.webp",
    },
    "ongoing support": {
      title: "Ongoing Support",
      description:
        "Regular follow-ups and adjustments to ensure you're achieving your weight loss goals safely and effectively.",
      image: "/images/support.webp",
    },
  };

  const testimonials = [
    {
      id: 1,
      name: "S J",
      image: "/images/testimonials/user1.webp",
      review: "The personalized approach and constant support from the medical team made all the difference in my weight loss journey.",
      rating: 5,
    },
    {
      id: 2,
      name: "M C",
      image: "/images/testimonials/user2.webp",
      review:
        "Quick appointments and efficient delivery of medications. The whole process was seamless and professional.",
      rating: 5,
    },
    {
      id: 3,
      name: "E R",
      image: "/images/testimonials/user3.webp",
      review:
        "I appreciate how thorough the medical team was in reviewing my health history before starting treatment.",
      rating: 5,
    },
    {
      id: 4,
      name: "D T",
      image: "/images/testimonials/user4.webp",
      review:
        "The ongoing support and regular check-ins helped me stay motivated throughout my weight loss journey.",
      rating: 5,
    },
    {
      id: 5,
      name: "L M",
      image: "/images/testimonials/user5.webp",
      review:
        "Finally found a program that takes a scientific approach to weight loss. The results speak for themselves.",
      rating: 5,
    },
    {
      id: 6,
      name: "J W",
      image: "/images/testimonials/user6.webp",
      review:
        "The convenience of virtual consultations combined with quality medications made this program perfect for my busy schedule.",
      rating: 5,
    },
    {
      id: 7,
      name: "A F",
      image: "/images/testimonials/user7.webp",
      review:
        "Excellent communication from the medical team and great results with the prescribed medications.",
      rating: 5,
    },
    {
      id: 8,
      name: "Robert Kim",
      image: "/images/testimonials/user8.webp",
      review:
        "Very impressed with the professionalism and knowledge of the physicians. They really understand GLP-1 medications.",
      rating: 5,
    },
    {
      id: 9,
      name: "Patricia Lee",
      image: "/images/testimonials/user9.webp",
      review:
        "The personalized treatment plan was exactly what I needed. Great support throughout the entire process.",
      rating: 5,
    },
  ];

  const getOrderDetails = async () => {
    // Commenting out the API call to avoid auth dependencies

    try {
      const res = await getMethod("/v1/order/user");
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  // Add these new variants
  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  // Add this new animation variant
  const cardVariants = {
    hover: { scale: 1.05 },
    initial: { scale: 1 },
  };
  // Add this function at the top of your component
  const scrollToSafety = (e) => {
    e.preventDefault();
    const safetySection = document.getElementById("safety");
    safetySection.scrollIntoView({ behavior: "auto" });
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Add this function to handle weight changes
  const handleWeightChange = (weight) => {
    setCurrentWeight(weight);
    // Calculate 20% of current weight
    setWeightLoss(Math.round(weight * 0.2));
  };

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = Object.values(stepDetails).map((step) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = step.image;
          img.onload = () => {
            setPreloadedImages(prev => ({
              ...prev,
              [step.image]: true
            }));
            resolve();
          };
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, []);

  // Modify the step image rendering section
  const renderStepImage = () => (
    <div className="relative md:h-[30vw] h-[300px] rounded-3xl overflow-hidden">
      {imagesLoaded && preloadedImages[stepDetails[activeStep].image] ? (
        <Image
          src={stepDetails[activeStep].image}
          alt={stepDetails[activeStep].title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}

      {/* Process steps overlay - positioned differently based on screen size */}
      <div className="absolute inset-0 flex md:flex-col md:justify-center md:items-start p-6">
        {/* Step buttons */}
        <div className=" flex md:flex-col flex-row gap-2 md:gap-2 absolute md:static bottom-4 left-0 right-0 justify-start md:ml-0 ml-8 md:justify-start">
          {Object.entries(stepDetails).map(([key, step], index) => (
            <button
              key={key}
              onClick={() => setActiveStep(key)}
              className={`flex items-center gap-1 px-3 py-3 rounded-full ${
                activeStep === key
                  ? "bg-orange-500 text-black"
                  : "bg-[#F6F6F3] text-zinc-800 hover:bg-[#F6F6F3]/80"
              } transition-all duration-200 ${
                index !== Object.entries(stepDetails).length - 1
                  ? "md:mb-3"
                  : ""
              }`}
            >
              <div className="md:w-6 md:h-6 w-4 h-4 rounded-full md:bg-white bg-transparent md:ring-1 ring-0 ring-black flex items-center justify-center md:text-xs text-sm font-medium text-black">
                {index + 1}
              </div>
              <span className="hidden md:inline font-medium pl-1">
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-tt-hoves overflow-x-hidden">
      <div className="mx-auto">
        <NavBar />

        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="flex flex-col relative md:mt-14 pt-8 mt-10 pb-0 px-4 min-h-[98vh]  justify-start  bg-[linear-gradient(360deg,_#d0d0da_0%,_rgba(208,_208,_218,_0)_100%)] sm:bg-none"
        >
          <Image
            src="/images/hero-desktop.png"
            alt="Hero image"
            fill
            className="object-cover object-center  relative -z-20 hidden md:block"
            priority
          />
          <motion.div
            variants={fadeIn}
            className="flex flex-col md:justify-center md:mt-0 mt-[8vh] md:min-h-[80vh] min-h-[95vh] justify-start items-start z-10 md:mx-20 mx-1 "
          > 
            <h1 className="text-[11vw] md:text-7xl leading-[1.2] font-medium md:max-w-[58%] max-w-full text-primary">
                Your Personalized
                Weight Loss <span className="text-[#2E2E2E] ">Journey Starts Here</span>
            </h1>

            <p className="text-[#626262] text-base md:text-lg md:max-w-[40%] max-w-[95%] md:my-14 my-[3vh]">
              Connect with our US-based physicians to receive tailored support
              on your weight loss journey. Experience a program designed just
              for you.
            </p>

            <motion.div>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center bg-[#365D56] text-white rounded-full px-10 py-3 text-lg font-medium relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          <div className="absolute  bottom-0 left-0 h-full w-full md:hidden block ">
            <Image
              src="/images/hero.png"
              alt="Hero image"
              fill
              className="object-cover "
              priority
            />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-montserrat mx-auto px-[8vw] md:py-36 py-20 md:rounded-t-[5vw] rounded-t-[10vw] bg-white relative z-20 md:-mt-16 -mt-8"
        >
          {/* Step-by-Step Process heading and description */}
          <div className="  flex flex-col md:flex-row justify-around items-start md:mb-24 mb-10 font-inter px-0">
            <div className="md:max-w-[100%]">
              <h2 className="text-4xl md:text-7xl font-medium text-zinc-800 tracking-tight">
                Step-by-Step <br />
                Process
              </h2>
            </div>
            <div className="md:max-w-[40%] mt-6 md:mt-2">
              <p className="text-[#626262] mb-6">
              We make your weight-loss journey personalized, accessible, and stress-free. Our streamlined process is designed to get you everything you need - quickly, conveniently, and affordably - with full support every step of the way.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-3 bg-white border  text-[#365D56] border-1 border-[#365D56] rounded-full font-medium hover:bg-zinc-50 transition-colors"
              >
                Start Your Journey Now
              </Link>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row font-montserrat bg-[#F6F6F3] md:pl-20 pl-0 rounded-3xl md:mx-16 mx-0">
            {/* Left side: Number, Title, description */}
            <div className="flex-1 flex flex-col justify-center ">
              {/* Orange numbered circle */}
              <div className="bg-orange-500 text-black w-20 h-20 rounded-full items-center justify-center text-4xl font-xs md:flex hidden">
                {Object.keys(stepDetails).indexOf(activeStep) + 1}
              </div>

              <div className=" w-[80%] md:pl-0 pl-8 md:pb-0 pb-10">
                <h2 className="text-4xl md:text-5xl text-zinc-800 font-medium md:my-8 my-5">
                  {stepDetails[activeStep].title}
                </h2>
                <p className="text-[#626262] max-w-sm md:text-lg text-sm md:pb-0">
                  {stepDetails[activeStep].description}
                </p>
              </div>
            </div>
            {/* Right side: Image with process steps overlay */}
            <div className="flex-1">
              {renderStepImage()}
            </div>
          </div>
        </motion.section>
        

        {/* Why Thousands Trust Us Section */}
        <TrustSection />

                {/* Reviews section */}
                <ReviewsSection />

        {/* GLP-1 Information Section */}
        <GLP1Section />

        {/* Weight Loss Calculator Section */}
        <div className=" w-full" >
          <WeightLossCalculatorSection />
        </div>

        {/* Reviews Section */}
        <TestimonialSection />
        {/* Pricing Section */}
        {/* <PricingSection /> */}

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#ECF4F2] py-48  md:py-44 rounded-b-[100px] relative z-30 -mt-20"
          id="faq"
        >
          <div className="mx-auto px-4 md:px-10">

            <div className="flex flex-col lg:flex-row justify-center gap-8 md:gap-32 ">
              <div className="lg:w-1/3">
                <motion.div
                  variants={fadeInUp}
                className="p-5 md:p-10 rounded-3xl text-[#2E2E2E] h-full"
                >
                  <h3 className="text-4xl md:text-7xl font-medium tracking-tight mb-6">
                    Frequently Asked Questions
                  </h3>
                  <Link
                    href="/sign-up"
                    className="md:inline-block hidden bg-[#365D56] text-white px-8 py-4 rounded-full hover:bg-[#365D56]/80 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/safety-information"
                    className="inline-block md:ml-4 ml-0 text-[#365D56] md:px-8 px-6 md:py-4 py-3 rounded-full hover:bg-[#365D56] hover:text-white ring-1 ring-[#365D56] transition-colors font-medium"
                  >
                    Safety Information
                  </Link>
                </motion.div>
              </div>
              <div className="lg:w-2/3">
                <motion.div
                  variants={fadeInUp}
                  className="p-1 md:p-10 rounded-3xl shadow-sm"
                >
                  <FaqList />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="relative z-30 flex justify-center md:mx-0 mx-4">
          <div
            className=" 
              bg-[#365D56]
              rounded-3xl
              shadow-xl
              md:px-40 md:py-24
              py-10
              md:mx-20 px-10
              text-center
              text-white
              max-w-[70rem]
              w-full
              -mb-40
              flex flex-col items-center
              -top-52
            "
            style={{
              position: "absolute",
              backgroundImage: ` url(${bgVector.src})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundSize: "80% 80%",
            }}
          >
            <h2 className="text-3xl md:text-4xl mb-8">
              What's your weight loss goal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              <Link href="/get-started" className="bg-[#ECF4F2] text-black  rounded-3xl py-4 px-2 font-medium text-lg hover:bg-gray-100 transition">
                Losing
                <br />
                1-20 lbs
              </Link>
              <Link href="/get-started" className="bg-[#ECF4F2] text-black  rounded-3xl py-4 px-2 font-medium text-lg hover:bg-gray-100 transition">
                Losing
                <br />
                21-50 lbs
              </Link>
              <Link href="/get-started" className="bg-[#ECF4F2] text-black  rounded-3xl py-4 px-2 font-medium text-lg hover:bg-gray-100 transition">
                Losing
                <br />
                51+ lbs
              </Link>
              <Link href="/get-started" className="bg-[#ECF4F2] text-black  rounded-3xl py-4 px-2 font-medium text-lg hover:bg-gray-100 transition">
                Not sure, <br />I just want to lose the weight
              </Link>
            </div>
          </div>
        </div>
        <Footer paddingTop="pt-[37rem] md:pt-[35rem] lg:pt-[25rem]" address={false}/>
      </div>
    </div>
  );
};

export default HomePage;
