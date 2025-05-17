import Link from "next/link";
import Image from "next/image";
import DetailsPage from "@/components/DetailsPage";
import Footer from "@/components/Footer";
import Introduction from "@/components/Intro";
import MeetExpertBackground from "@/components/MeetExpertBackground";
import NavBar from "@/components/NavBar";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@/../public/images/aboutHeroImg.webp";
import scienceBehindResults from "@/../public/images/scienceBehindResults.png";
import bgVector from "@/../public/images/metabolixmd-bg-vector.svg";
import founder from "@/../public/images/founder.png"
import founderSign from "@/../public/images/founder_sign.webp"

const expertDetails = [
  {
    route: "about-ashley",
    img: "/images/dr1.svg",
    name: "Ashley Donaldson",
    subName: "FNP-BC",
    isApproved: true,
    mainRole: "Co-Founder",
    designation: "Consultant",
    detailedJob: "Advanced Nurse Practitioner and Consultant",
    description: (
      <div className="text-xs">
        <p className="mt-3">
          <b>Ashley Donaldson, FNP-C</b>, is a highly experienced Nurse
          Practitioner with over 14 years of expertise in both primary and
          urgent care settings. Throughout her career, she has been dedicated to
          promoting preventative health, managing chronic conditions, and
          delivering acute care to diverse populations. Ashley has a deep
          passion for evidence-based practice, ensuring that her patients
          receive the most current and effective treatments to enhance their
          well-being and quality of life.
        </p>
        <p className="mt-3">
          As a co-founder and consultant at <b>MetabolixMD</b>, Ashley focuses
          on optimizing patient outcomes through personalized care strategies
          and lifestyle interventions. She brings extensive experience from her
          time working independently in urgent care, where she assessed,
          diagnosed, and treated a wide range of acute illnesses and injuries.
          Additionally, Ashley played a key role in developing a wellness clinic
          aimed at fostering healthy living through weight management, smoking
          cessation, and self-care education.
        </p>
        <p className="mt-3">
          Ashley began her healthcare journey in the fast-paced environment of
          the Emergency Department at Covenant Medical Center, where she
          provided compassionate care to critically ill patients experiencing
          acute trauma, heart attacks, strokes, and other life-threatening
          conditions. This foundational experience shaped her collaborative
          approach to healthcare, working closely with physicians and
          multidisciplinary teams to deliver the highest standard of patient
          care.
        </p>
        <p className="mt-3">
          Alongside her clinical achievements, Ashley holds a Master of Science
          in Nursing from Texas Tech Health Science Center, with board
          certification through the American Academy of Nurse Practitioners and
          prescriptive authority from the Texas Board of Nursing. She also
          maintains certifications in Basic Life Support (BLS) and Advanced
          Cardiovascular Life Support (ACLS).
        </p>
        <p className="mt-3">
          Beyond her professional endeavors, Ashley is an accomplished athlete
          and avid runner, embracing an active lifestyle that reflects her
          commitment to health and wellness. A major milestone in her running
          journey was completing the 2024 Boston Marathon—a prestigious event
          and a testament to her dedication, discipline, and resilience. Her
          achievement in this renowned race exemplifies the same goal-oriented
          mindset she brings to her clinical practice, inspiring her patients to
          overcome challenges and unlock their full health potential.
        </p>
      </div>
    ),
  },
  {
    route: "about-gulrezguskhan",
    img: "/images/gulrez.svg",
    name: "Gulrez Gus Khan",
    subName: "MBA",
    isApproved: true,
    mainRole: "Chief Liaison Officer",
    designation: "Board Member",
    detailedJob: "",
    description: (
      <div className="text-xs">
        <p className="mt-3">
          MetabolixMD is proud to announce the appointment of distinguished
          healthcare entrepreneur and political leader{" "}
          Gulrez Gus Khan as its newest board director.
          Affectionately known as "Gus" among his peers, Khan is the co-owner of
          the esteemed American Star Home Health & Hospice Care, Inc., based in
          Lubbock, Texas. With over 15 years of expertise in healthcare
          management, development, operations, and entrepreneurship, he brings a
          wealth of knowledge and leadership to our organization.
        </p>
        <p className="mt-3">
          Beyond his business success, Khan is an influential figure in the
          Republican Party, currently serving as a precinct chair and chairman
          of the Resolutions Committee for the Lubbock County GOP. Earlier this
          year, he was honored as an invitee to President Donald J. Trump's
          inauguration ceremony. In 2024, he ran in the Republican primary for
          U.S. Congress in Texas District 32 and was elected as a National
          Delegate to the Republican National Convention in Milwaukee. He also
          campaigned for Mayor of Lubbock in 2022.
        </p>
        <p className="mt-3">
          Khan is deeply committed to philanthropy, having played a pivotal role
          in fundraising efforts for organizations such as the American Heart
          Association, Ronald McDonald House Charities, Lubbock Monterey AMBUCS,
          and Boys &amp; Girls Clubs of America. His dedication extends to
          serving on several nonprofit boards and committees, including the
          Lubbock Pediatric Cancer Association, South Plains Food Bank, Center
          for Global Understanding, United States Global Leadership Coalition,
          American Premier League, Premium Aussies, and Being Sportsman.
        </p>
        <p className="mt-3">
          In addition to his work in healthcare, politics, and philanthropy,
          "Gus" is a published author with multiple books available on Amazon,
          inspiring readers worldwide.
        </p>
        <p className="mt-3">
          We are thrilled to welcome Gulrez Khan to MetabolixMD and are
          confident that his leadership and vision will drive our organization
          to new heights.
        </p>
      </div>
    ),
  },
  {
    route: "about-joseph",
    img: "/images/dr3.svg",
    name: "Joseph Rizzo",
    subName: "MD",
    isApproved: true,
    mainRole: "Consultant",
    designation: "",
    detailedJob: "",
    description: (
      <div className="text-xs">
        <p className="mt-3">
          <b>Dr. Joseph Rizzo</b>, born in March 1954 in the Bronx, NY, is a
          distinguished cardiologist with a career spanning over three decades.
          He earned his <b>M.D.</b> from <i>New York Medical College</i> after
          beginning his academic journey at the University of Torino. Dr. Rizzo
          completed his residency and fellowships in internal medicine and
          cardiology in New York, with a focus on advanced cardiovascular care
          at North Shore University Hospital.
        </p>

        <p className="mt-3">
          Throughout his career, Dr. Rizzo practiced in Lubbock, TX, where he
          held prominent roles at JAJ Cardiology, LLC, and Covenant Medical
          Center. He is board certified in cardiovascular diseases, internal
          medicine, interventional cardiology, and anti-aging medicine. In
          addition to his clinical expertise, Dr. Rizzo held leadership
          positions, including Cardiology Section Chief and Director of Cardiac
          Rehabilitation.
        </p>

        <p className="mt-3">
          Currently, Dr. Rizzo serves as the Chief Consultant of{" "}
          <b>MetabolixMD</b>, where he brings his extensive experience and
          expertise in cardiology and metabolic health to guide innovative
          medical practices. Although he retired from active clinical practice
          in October 2020, his dedication to the field remains unwavering.
          Through his consultancy work, Dr. Rizzo continues to make significant
          contributions to advancing healthcare, mentoring young professionals,
          and advocating for best practices in patient management.
        </p>
      </div>
    ),
  },

  {
    route: "about-kurt",
    img: "/images/dr5.svg",
    name: "Kurt Springmann",
    subName: "MD, JD",
    isApproved: true,
    mainRole: "Consultant",
    designation: "Chief Legal Officer",
    detailedJob: "",
    description: (
      <div className="text-xs">
        <p className="mt-3">
          Dr. Kurt Emil Springmann, M.D., J.D., is a seasoned consultant and the
          Chief Legal Officer at MetabolixMD, where he contributes a unique
          combination of medical, legal, and financial expertise. With a career
          that spans decades across multiple disciplines, Dr. Springmann holds a
          Juris Doctorate from Arizona State University College of Law, where he
          graduated magna cum laude, ranking first in his class. His outstanding
          legal education was highlighted by numerous awards, including the
          Regents Scholar award and the Order of the Coif, reflecting his
          dedication to excellence. He is also a licensed medical doctor, having
          received his Doctor of Medicine from the University of Arizona College
          of Medicine, where he was recognized as a top student and member of
          the Alpha Omega Alpha Honor Society.
        </p>{" "}
        <p className="mt-3">
          Dr. Springmann's professional journey is marked by substantial roles
          in both law and medicine, underscoring his versatility and breadth of
          expertise. His early medical career included rigorous training in
          anesthesiology, where he practiced extensively across trauma,
          pediatric, ENT, neurosurgical, and general surgical anesthesia in
          diverse settings. Over the years, he has held prestigious positions
          such as Assistant Professor of Anesthesiology at Texas Tech University
          Health Sciences Center, where he contributed to the academic and
          clinical training of medical students and residents. His experience
          includes managing anesthesia services at leading hospitals, as well as
          a locum tenens practice covering a wide array of surgical cases, from
          trauma to complex specialty surgeries, and managing pain in acute and
          chronic settings.
        </p>{" "}
        <p className="mt-3">
          In parallel with his medical career, Dr. Springmann has cultivated a
          robust legal practice. After obtaining his law degree, he served as an
          Associate Attorney with Morrison & Foerster LLP in San Francisco, a
          role in which he handled corporate and technology-related litigation
          and arbitration, honing skills in complex litigation and negotiation
          on behalf of international and corporate clients. Since 2003, he has
          operated his own private legal practice, offering counsel on
          litigation, contracting, and technological issues, bridging the gap
          between medicine and law for healthcare organizations.
        </p>{" "}
        <p className="mt-3">
          Beyond his clinical and legal contributions, Dr. Springmann's
          financial acumen is evidenced by his earlier career roles in financial
          planning and analysis for prominent firms, as well as his credentials
          as a Certified Public Accountant. His rich background in accounting
          and finance strengthens his capability to address healthcare financial
          planning and compliance matters with a holistic view. Dr. Springmann's
          extensive list of publications, including topics on intellectual
          property and medical research, as well as his active certifications in
          anesthesia and law across multiple states, further attest to his
          wide-ranging expertise.
        </p>{" "}
        <p className="mt-3">
          At MetabolixMD, Dr. Springmann's combined knowledge enables him to
          advise on medical, legal, and regulatory challenges, ensuring the
          company's operations align with rigorous standards across multiple
          disciplines.
        </p>
      </div>
    ),
  },
];

const AboutUs = () => {
  const [activeExpert, setActiveExpert] = useState(null);
  const [hoveredExpert, setHoveredExpert] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleESC = (event) => {
      if (event.key === "Escape") {
        setShowOverlay(false);
        setActiveExpert(null);
      }
    };
    window.addEventListener("keydown", handleESC);
    return () => {
      window.removeEventListener("keydown", handleESC);
    };
  }, []);
  // Add effect to handle body scroll
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showOverlay]);

  // Add effect to handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add touch handling for mobile swipe
  useEffect(() => {
    if (!isMobile || !sliderRef.current) return;

    let startX = 0;
    let scrollLeft = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].pageX - sliderRef.current.offsetLeft;
      scrollLeft = sliderRef.current.scrollLeft;
    };

    const handleTouchMove = (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      startX = 0;
      const slideWidth = sliderRef.current.offsetWidth;
      const scrollPosition = sliderRef.current.scrollLeft;
      const slideIndex = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(slideIndex);
    };

    const handleScroll = () => {
      if (!sliderRef.current) return;
      const slideWidth = sliderRef.current.offsetWidth;
      const scrollPosition = sliderRef.current.scrollLeft;
      const slideIndex = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(slideIndex);
    };

    const slider = sliderRef.current;
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);
    slider.addEventListener('scroll', handleScroll);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
      slider.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Add effect to handle initial scroll position
  useEffect(() => {
    if (!isMobile || !sliderRef.current) return;

    const handleResize = () => {
      const slideWidth = sliderRef.current.offsetWidth;
      const scrollPosition = sliderRef.current.scrollLeft;
      const slideIndex = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(slideIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white ">
      <Head>
        <title>About Us - MetabolixMD</title>
      </Head>
      <NavBar />

      <div className="flex justify-evenly items-center bg-[#ECF4F2] mt-10 pb-16 pt-10">
        <div className="md:max-w-[50%] max-w-full text-semibold md:pl-32 pl-5 md:py-16 py-0 pt-10">
          <h1 className="text-2xl text-[#386057] mb-5 md:block hidden font-extralight">About MetabolixMD</h1>
          <h3 className="md:text-7xl text-5xl font-medium text-[#2E2E2E]">
            <span className="text-[#004F41]">Your Trusted Partner In</span>{" "}
            Metabolic Health
          </h3>
          <p className="mt-10 text-lg opacity-70">
            At MetabolixMD, we believe in removing the barriers to effective,
            science-backed weight loss. Too many people struggle with weight
            loss due to lack of access, confusing health plans, or outdated
            treatment models.{" "}
            <span className="italic">We're changing that.</span>{" "}
          </p>
          <p className="mt-10 text-lg opacity-70 max-w-[70%]">
            Our telehealth approach gives you direct access to GLP-1 medications
            with:
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5 my-5 mx-10">
            <div className="flex flex-col text-center items-center justify-center">
              <svg
                width="95"
                height="95"
                viewBox="0 0 79 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="33.5"
                  fill="#ECF4F2"
                  stroke="#004F41"
                  stroke-width="3"
                />
                <path
                  d="M37 28H35C34.4477 28 34 28.4477 34 29V31C34 31.5523 34.4477 32 35 32H37C37.5523 32 38 31.5523 38 31V29C38 28.4477 37.5523 28 37 28Z"
                  fill="#FD7823"
                />
                <path
                  d="M45 28H43C42.4477 28 42 28.4477 42 29V31C42 31.5523 42.4477 32 43 32H45C45.5523 32 46 31.5523 46 31V29C46 28.4477 45.5523 28 45 28Z"
                  fill="#FD7823"
                />
                <path
                  d="M37 35H35C34.4477 35 34 35.4477 34 36V38C34 38.5523 34.4477 39 35 39H37C37.5523 39 38 38.5523 38 38V36C38 35.4477 37.5523 35 37 35Z"
                  fill="#FD7823"
                />
                <path
                  d="M45 35H43C42.4477 35 42 35.4477 42 36V38C42 38.5523 42.4477 39 43 39H45C45.5523 39 46 38.5523 46 38V36C46 35.4477 45.5523 35 45 35Z"
                  fill="#FD7823"
                />
                <path
                  d="M37 42H35C34.4477 42 34 42.4477 34 43V45C34 45.5523 34.4477 46 35 46H37C37.5523 46 38 45.5523 38 45V43C38 42.4477 37.5523 42 37 42Z"
                  fill="#FD7823"
                />
                <path
                  d="M45 42H43C42.4477 42 42 42.4477 42 43V45C42 45.5523 42.4477 46 43 46H45C45.5523 46 46 45.5523 46 45V43C46 42.4477 45.5523 42 45 42Z"
                  fill="#FD7823"
                />
                <path
                  d="M52.5 54.5H51.5V24C51.4948 23.6038 51.3351 23.2253 51.0549 22.9451C50.7747 22.6649 50.3962 22.5052 50 22.5H30C29.6038 22.5052 29.2253 22.6649 28.9451 22.9451C28.6649 23.2253 28.5052 23.6038 28.5 24V54.5H27.5C27.1022 54.5 26.7206 54.658 26.4393 54.9393C26.158 55.2206 26 55.6022 26 56C26 56.3978 26.158 56.7794 26.4393 57.0607C26.7206 57.342 27.1022 57.5 27.5 57.5H52.5C52.8978 57.5 53.2794 57.342 53.5607 57.0607C53.842 56.7794 54 56.3978 54 56C54 55.6022 53.842 55.2206 53.5607 54.9393C53.2794 54.658 52.8978 54.5 52.5 54.5ZM48.5 54.5H38V50C38 49.7348 37.8946 49.4804 37.7071 49.2929C37.5196 49.1054 37.2652 49 37 49H35C34.7348 49 34.4804 49.1054 34.2929 49.2929C34.1054 49.4804 34 49.7348 34 50V54.5H31.5V25.5H48.5V54.5Z"
                  fill="#FD7823"
                />
                <line
                  x1="16.0388"
                  y1="14.9179"
                  x2="66.0388"
                  y2="62.9179"
                  stroke="#004F41"
                  stroke-width="3"
                />
              </svg>
              <p className="text-extralight mt-4">
                No office
                <br />
                visits
              </p>
            </div>
            <div className="flex flex-col text-center items-center justify-center">
              <svg
                width="95"
                height="95"
                viewBox="0 0 79 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="33.5"
                  fill="#ECF4F2"
                  stroke="#004F41"
                  stroke-width="3"
                /> 
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35.5647 24.3125C35.5647 23.6992 35.8084 23.111 36.242 22.6773C36.6757 22.2436 37.2639 22 37.8772 22H42.5022C43.1155 22 43.7037 22.2436 44.1374 22.6773C44.5711 23.111 44.8147 23.6992 44.8147 24.3125C44.8147 24.9258 44.5711 25.514 44.1374 25.9477C43.7037 26.3814 43.1155 26.625 42.5022 26.625V26.7869C44.8213 27.1222 47.04 27.9569 49.005 29.2335L51.1047 27.1337C51.2635 26.9633 51.455 26.8267 51.6677 26.7319C51.8805 26.6371 52.1101 26.5861 52.343 26.582C52.5759 26.5779 52.8072 26.6207 53.0232 26.708C53.2391 26.7952 53.4353 26.925 53.6 27.0897C53.7647 27.2544 53.8945 27.4506 53.9818 27.6666C54.069 27.8825 54.1118 28.1138 54.1077 28.3467C54.1036 28.5796 54.0526 28.8092 53.9578 29.022C53.8631 29.2347 53.7264 29.4262 53.556 29.585L51.706 31.435C54.2644 34.026 55.8745 37.4039 56.2762 41.0229C56.6779 44.6419 55.8477 48.2907 53.9197 51.3797C51.9917 54.4686 49.0786 56.8173 45.651 58.0463C42.2234 59.2753 38.4816 59.3127 35.0301 58.1526C31.5786 56.9925 28.6191 54.7026 26.6296 51.6528C24.6402 48.6031 23.7371 44.9717 24.0663 41.3453C24.3955 37.719 25.9377 34.3095 28.4437 31.6678C30.9497 29.0262 34.2733 27.3066 37.8772 26.7869V26.625C37.2639 26.625 36.6757 26.3814 36.242 25.9477C35.8084 25.514 35.5647 24.9258 35.5647 24.3125ZM52.9085 42.8125C52.9085 46.1857 51.5685 49.4208 49.1832 51.806C46.798 54.1912 43.563 55.5312 40.1897 55.5312C36.8165 55.5312 33.5814 54.1912 31.1962 51.806C28.811 49.4208 27.471 46.1857 27.471 42.8125C27.471 39.4393 28.811 36.2042 31.1962 33.819C33.5814 31.4338 36.8165 30.0938 40.1897 30.0938C43.563 30.0938 46.798 31.4338 49.1832 33.819C51.5685 36.2042 52.9085 39.4393 52.9085 42.8125ZM41.9241 35.2969C41.9241 34.8369 41.7414 34.3957 41.4161 34.0705C41.0909 33.7452 40.6497 33.5625 40.1897 33.5625C39.7297 33.5625 39.2886 33.7452 38.9633 34.0705C38.6381 34.3957 38.4554 34.8369 38.4554 35.2969V43.5294L38.9641 44.0381L44.1765 49.2505C44.3353 49.4209 44.5267 49.5576 44.7395 49.6524C44.9522 49.7472 45.1819 49.7981 45.4148 49.8022C45.6476 49.8064 45.879 49.7635 46.0949 49.6763C46.3109 49.5891 46.5071 49.4592 46.6718 49.2945C46.8364 49.1298 46.9663 48.9337 47.0535 48.7177C47.1407 48.5017 47.1836 48.2704 47.1795 48.0375C47.1754 47.8047 47.1244 47.575 47.0296 47.3623C46.9348 47.1495 46.7981 46.958 46.6277 46.7992L41.9241 42.0933V35.2969Z"
                  fill="#FD7823"
                />
                <line
                  x1="16.0388"
                  y1="14.9179"
                  x2="66.0388"
                  y2="62.9179"
                  stroke="#004F41"
                  stroke-width="3"
                />
              </svg>

              <p className="text-extralight mt-4">
                No long wait
                <br />
                times
              </p>
            </div>
            <div className="flex flex-col text-center items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-2">
                <circle cx="35" cy="35" r="33.5" fill="#ECF4F2" stroke="#004F41" stroke-width="3" />
                <path d="M24.6273 43.8229L15.5191 51.3199M21.1784 31.3827C21.6058 26.9787 23.7651 22.9249 27.1813 20.113C30.5975 17.3011 34.9909 15.9614 39.3948 16.3888C43.7988 16.8161 47.8526 18.9754 50.6645 22.3916C53.4765 25.8079 54.8161 30.2012 54.3888 34.6052C53.9614 39.0091 51.8022 43.063 48.3859 45.8749C44.9697 48.6868 40.5763 50.0264 36.1724 49.5991C31.7684 49.1718 27.7146 47.0125 24.9027 43.5962C22.0908 40.18 20.7511 35.7867 21.1784 31.3827Z" stroke="#FD7823" stroke-width="3" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M41.638 29.4744C41.6055 27.1235 37.8504 25.564 35.2476 27.1072C31.9947 29.0338 32.6832 33.04 36.9125 32.8457C38.7945 32.7599 40.4132 32.398 41.6428 33.4967C42.8743 34.5952 43.6541 37.6222 40.4746 38.9811C37.2916 40.3422 33.6924 38.8142 33.4723 36.5467M36.9245 24.6965L37.0995 26.501M38.396 39.8626L38.5357 41.3017" stroke="#FD7823" stroke-width="3" strokeLinecap="round" stroke-linejoin="round" />
                <line x1="11.0388" y1="9.91792" x2="61.0388" y2="57.9179" stroke="#004F41" stroke-width="3" />
              </svg>


              <p className="text-extralight mt-4">
                No Hidden
                <br />
                Costs
              </p>
            </div>
            <div className="flex flex-col text-center items-center justify-center">
              <svg
                width="95"
                height="95"
                viewBox="0 0 79 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="33.5"
                  fill="#ECF4F2"
                  stroke="#004F41"
                  stroke-width="3"
                />
                <g clipPath="url(#clip0_6_223)">
                  <path
                    d="M60 29.4545V54H24.375V49.0909H22V27H55.25V29.4545H60ZM50.5 29.4545C50.5 29.7997 50.5618 30.1193 50.6855 30.4134C50.8092 30.7074 50.9762 30.9631 51.1865 31.1804C51.3968 31.3977 51.6504 31.5767 51.9473 31.7173C52.2441 31.858 52.5534 31.9219 52.875 31.9091V29.4545H50.5ZM24.375 31.9091C24.709 31.9091 25.0182 31.8452 25.3027 31.7173C25.5872 31.5895 25.8346 31.4169 26.0449 31.1996C26.2552 30.9822 26.4284 30.7202 26.5645 30.4134C26.7005 30.1065 26.7624 29.7869 26.75 29.4545H24.375V31.9091ZM24.375 41.7273C25.0306 41.7273 25.6429 41.8551 26.2119 42.1108C26.7809 42.3665 27.2881 42.718 27.7334 43.1655C28.1787 43.6129 28.5189 44.1307 28.7539 44.7188C28.9889 45.3068 29.1126 45.946 29.125 46.6364H48.125C48.125 45.9588 48.2487 45.326 48.4961 44.7379C48.7435 44.1499 49.0837 43.6257 49.5166 43.1655C49.9495 42.7053 50.4505 42.3537 51.0195 42.1108C51.5885 41.8679 52.207 41.7401 52.875 41.7273V34.3636C52.2194 34.3636 51.6071 34.2358 51.0381 33.9801C50.4691 33.7244 49.9619 33.3729 49.5166 32.9254C49.0713 32.478 48.7311 31.9602 48.4961 31.3722C48.2611 30.7841 48.1374 30.1449 48.125 29.4545H29.125C29.125 30.1321 29.0013 30.7649 28.7539 31.353C28.5065 31.9411 28.1663 32.4652 27.7334 32.9254C27.3005 33.3857 26.7995 33.7372 26.2305 33.9801C25.6615 34.223 25.043 34.3509 24.375 34.3636V41.7273ZM52.875 44.1818C52.541 44.1818 52.2318 44.2457 51.9473 44.3736C51.6628 44.5014 51.4154 44.674 51.2051 44.8913C50.9948 45.1087 50.8216 45.3707 50.6855 45.6776C50.5495 45.9844 50.4876 46.304 50.5 46.6364H52.875V44.1818ZM24.375 46.6364H26.75C26.75 46.2912 26.6882 45.9716 26.5645 45.6776C26.4408 45.3835 26.2738 45.1278 26.0635 44.9105C25.8532 44.6932 25.5996 44.5142 25.3027 44.3736C25.0059 44.233 24.6966 44.169 24.375 44.1818V46.6364ZM57.625 31.9091H55.25V49.0909H26.75V51.5455H57.625V31.9091ZM30.3125 39.2727C29.9909 39.2727 29.7126 39.1513 29.4775 38.9084C29.2425 38.6655 29.125 38.3778 29.125 38.0455C29.125 37.7131 29.2425 37.4254 29.4775 37.1825C29.7126 36.9396 29.9909 36.8182 30.3125 36.8182C30.6341 36.8182 30.9124 36.9396 31.1475 37.1825C31.3825 37.4254 31.5 37.7131 31.5 38.0455C31.5 38.3778 31.3825 38.6655 31.1475 38.9084C30.9124 39.1513 30.6341 39.2727 30.3125 39.2727ZM46.9375 39.2727C46.6159 39.2727 46.3376 39.1513 46.1025 38.9084C45.8675 38.6655 45.75 38.3778 45.75 38.0455C45.75 37.7131 45.8675 37.4254 46.1025 37.1825C46.3376 36.9396 46.6159 36.8182 46.9375 36.8182C47.2591 36.8182 47.5374 36.9396 47.7725 37.1825C48.0075 37.4254 48.125 37.7131 48.125 38.0455C48.125 38.3778 48.0075 38.6655 47.7725 38.9084C47.5374 39.1513 47.2591 39.2727 46.9375 39.2727ZM38.625 44.1818C37.9694 44.1818 37.3571 44.054 36.7881 43.7983C36.2191 43.5426 35.7119 43.1911 35.2666 42.7436C34.8213 42.2962 34.4811 41.7784 34.2461 41.1903C34.0111 40.6023 33.8874 39.9631 33.875 39.2727V36.8182C33.875 36.1406 33.9987 35.5078 34.2461 34.9197C34.4935 34.3317 34.8337 33.8075 35.2666 33.3473C35.6995 32.8871 36.2005 32.5355 36.7695 32.2926C37.3385 32.0497 37.957 31.9219 38.625 31.9091C39.2806 31.9091 39.8929 32.0369 40.4619 32.2926C41.0309 32.5483 41.5381 32.8999 41.9834 33.3473C42.4287 33.7947 42.7689 34.3125 43.0039 34.9006C43.2389 35.4886 43.3626 36.1278 43.375 36.8182V39.2727C43.375 39.9503 43.2513 40.5831 43.0039 41.1712C42.7565 41.7592 42.4163 42.2834 41.9834 42.7436C41.5505 43.2038 41.0495 43.5554 40.4805 43.7983C39.9115 44.0412 39.293 44.169 38.625 44.1818ZM36.25 39.2727C36.25 39.6179 36.3118 39.9375 36.4355 40.2315C36.5592 40.5256 36.7262 40.7812 36.9365 40.9986C37.1468 41.2159 37.4004 41.3949 37.6973 41.5355C37.9941 41.6761 38.3034 41.7401 38.625 41.7273C38.959 41.7273 39.2682 41.6634 39.5527 41.5355C39.8372 41.4077 40.0846 41.2351 40.2949 41.0178C40.5052 40.8004 40.6784 40.5384 40.8145 40.2315C40.9505 39.9247 41.0124 39.6051 41 39.2727V36.8182C41 36.473 40.9382 36.1534 40.8145 35.8594C40.6908 35.5653 40.5238 35.3097 40.3135 35.0923C40.1032 34.875 39.8496 34.696 39.5527 34.5554C39.2559 34.4148 38.9466 34.3509 38.625 34.3636C38.291 34.3636 37.9818 34.4276 37.6973 34.5554C37.4128 34.6832 37.1654 34.8558 36.9551 35.0732C36.7448 35.2905 36.5716 35.5526 36.4355 35.8594C36.2995 36.1662 36.2376 36.4858 36.25 36.8182V39.2727Z"
                    fill="#FD7823"
                  />
                </g>
                <line
                  x1="16.0388"
                  y1="14.9179"
                  x2="66.0388"
                  y2="62.9179"
                  stroke="#004F41"
                  stroke-width="3"
                />
                <defs>
                  <clipPath id="clip0_6_223">
                    <rect
                      width="37"
                      height="37"
                      fill="white"
                      transform="translate(22 22)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <p className="text-extralight mt-4">
                No Copays or
                <br />
                Member Fees
              </p>
            </div>
          </div>

          <p className="opacity-70 mt-14 text-lg">
            Expert, licensed consultants are{" "}
            <span className="font-bold">available 24/7/365</span>, and if you
            qualify, medication is delivered straight to your doorstep from
            top-tier compounding pharmacies in the U.S.
          </p>
        </div>
        <div className="md:block hidden rounded-[40px] pl-20">
          <Image src={heroImg} width={874} height={1043} className="rounded-tl-[80px] min-h-max rounded-bl-[80px] " />
        </div>
      </div>
      <div className="pb-32 px-5 bg-[#ECF4F2] md:hidden block">
        <Image src={heroImg} width={874} height={1043} className="rounded-[40px]" />
      </div>

      <div className="bg-[#365D56] text-white flex flex-col items-center justify-center text-center md:px-40 px-5 md:py-32 py-20 md:rounded-[100px] rounded-[50px] -mt-14">
        <h1 className="md:text-3xl text-2xl font-extralight md:leading-[3rem] leading-0 text-center">
          <span className="font-bold">Our mission</span> is to provide fast,
          efficient, and expert telehealth services focused exclusively on{" "}
          <span className="font-bold">Metabolic Health</span>. We're committed
          to patient privacy, safety, and convenience—empowering you to take
          control of your health from the comfort of your home.
        </h1> 

        <div className="flex md:flex-row flex-col justify-evenly items-start my-10 mt-20 md:gap-28 gap-14 md:mx-0 mx-5">
          <div className="flex flex-col  gap-5 items-center justify-center">
            <svg
              width="92"
              height="92"
              viewBox="0 0 92 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="45.8662" cy="45.8662" r="45.8662" fill="#FD7823" />
              <path
                d="M49.0844 30.54V61.5481H45.3295V34.4765H45.1478L37.5774 39.5032V35.6878L45.3295 30.54H49.0844Z"
                fill="white"
              />      
            </svg>
            <h5 className="text-5xl font-medium">Privacy</h5>
            <p className="max-w-lg opacity-70 text-md">
              We take your privacy seriously. Your health data is encrypted and
              stored securely, and all care is delivered with discretion and
              respect.
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center">
            <svg
              width="92"
              height="92"
              viewBox="0 0 92 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="45.8662" cy="45.8662" r="45.8662" fill="#FD7823" />
              <path
                d="M35.1852 61.5481V58.8228L45.4203 47.6187C46.6215 46.3065 47.6107 45.1659 48.3879 44.1969C49.1651 43.2178 49.7405 42.2992 50.1139 41.4413C50.4975 40.5732 50.6893 39.6647 50.6893 38.7159C50.6893 37.6258 50.4268 36.682 49.902 35.8846C49.3872 35.0872 48.6806 34.4715 47.7823 34.0375C46.8839 33.6034 45.8745 33.3864 44.7541 33.3864C43.563 33.3864 42.5234 33.6337 41.6351 34.1283C40.757 34.6128 40.0756 35.2941 39.5911 36.1723C39.1167 37.0505 38.8795 38.08 38.8795 39.261H35.3063C35.3063 37.4441 35.7252 35.8493 36.563 34.4765C37.4008 33.1038 38.5414 32.0338 39.9848 31.2667C41.4383 30.4996 43.0685 30.116 44.8752 30.116C46.6921 30.116 48.3021 30.4996 49.7051 31.2667C51.1082 32.0338 52.2084 33.0684 53.0058 34.3705C53.8032 35.6726 54.2019 37.1211 54.2019 38.7159C54.2019 39.8565 53.995 40.9719 53.5811 42.062C53.1774 43.1421 52.4708 44.3483 51.4614 45.6806C50.4622 47.0029 49.0743 48.6179 47.2978 50.5257L40.333 57.9749V58.2171H54.747V61.5481H35.1852Z"
                fill="white"
              />
            </svg>

            <h5 className="text-5xl font-medium">Safety</h5>
            <p className="max-w-lg opacity-70 text-md">
              Every prescription is filled by licensed U.S.-based compounding
              pharmacies that follow strict quality and safety protocols for
              stability, potency, and purity.
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center">
            <svg
              width="92"
              height="92"
              viewBox="0 0 92 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="45.8662" cy="45.8662" r="45.8662" fill="#FD7823" />
              <path
                d="M44.9964 61.972C42.9978 61.972 41.2162 61.6288 39.6517 60.9425C38.0973 60.2561 36.8608 59.3022 35.9422 58.0809C35.0338 56.8494 34.5392 55.4212 34.4584 53.7961H38.2739C38.3546 54.7953 38.6978 55.6584 39.3035 56.3851C39.9091 57.1018 40.7015 57.6569 41.6806 58.0506C42.6597 58.4443 43.7447 58.6411 44.9358 58.6411C46.2682 58.6411 47.4492 58.4089 48.4787 57.9446C49.5083 57.4803 50.3158 56.8343 50.9012 56.0066C51.4867 55.1789 51.7794 54.22 51.7794 53.1299C51.7794 51.9893 51.4968 50.9849 50.9315 50.1169C50.3663 49.2387 49.5386 48.5523 48.4484 48.0577C47.3583 47.5631 46.0259 47.3158 44.4513 47.3158H41.9682V43.9849H44.4513C45.6827 43.9849 46.7628 43.7628 47.6914 43.3187C48.6301 42.8746 49.3619 42.2488 49.8868 41.4413C50.4218 40.6337 50.6893 39.6849 50.6893 38.5948C50.6893 37.545 50.4571 36.6316 49.9928 35.8543C49.5285 35.0771 48.8724 34.4715 48.0245 34.0375C47.1867 33.6034 46.1975 33.3864 45.0569 33.3864C43.987 33.3864 42.9776 33.5832 42.0288 33.9769C41.0901 34.3605 40.3229 34.9207 39.7274 35.6575C39.1319 36.3843 38.8089 37.2624 38.7584 38.292H35.1246C35.1852 36.6669 35.6747 35.2437 36.5933 34.0223C37.5118 32.7909 38.713 31.832 40.1968 31.1456C41.6906 30.4592 43.3309 30.116 45.1175 30.116C47.0353 30.116 48.6806 30.5046 50.0534 31.2818C51.4261 32.049 52.4809 33.0634 53.2178 34.3251C53.9546 35.5869 54.323 36.9495 54.323 38.4131C54.323 40.1593 53.8638 41.6482 52.9452 42.8796C52.0368 44.1111 50.8003 44.964 49.2358 45.4384V45.6806C51.194 46.0036 52.7232 46.8364 53.8234 48.1789C54.9236 49.5112 55.4737 51.1616 55.4737 53.1299C55.4737 54.8155 55.0145 56.3296 54.0959 57.6721C53.1875 59.0045 51.9459 60.0542 50.3713 60.8213C48.7967 61.5885 47.005 61.972 44.9964 61.972Z"
                fill="white"
              />
            </svg>

            <h5 className="text-5xl font-medium">Convenience</h5>
            <p className="max-w-lg opacity-70 text-md">
              From virtual consults to doorstep delivery, our process is built
              for real life. No waiting rooms. No pharmacy runs. Just
              results—delivered to you.
            </p>
          </div>
        </div>

        <div className="h-0.5 w-full bg-[#FFFFFF59] opacity-35 my-12"></div>

        <div className="max-w-5xl text-md mx-auto text-center">
          <p className="">
            You're ready for a change—and we're here to help. MetabolixMD offers
            a modern, science-backed approach to weight loss that's tailored to
            your lifestyle. No more guesswork, no more waiting rooms—just
            <span className="font-bold"> personalized care that works.</span>
          </p>
          <p className="mt-5 mb-16">
            Take the first step toward a healthier you.
          </p>

          <Link
            className="ring-1 ring-[#FFFFFF] px-10 py-4 rounded-full"
            href="/get-started"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-center md:gap-32 gap-10 items-center mt-24 md:px-0 px-8">
        <div className="md:max-w-lg max-w-full">
          <Image src={founder} width={538} height={657} className="rounded-3xl" />
        </div>
        <div className="md:max-w-xl max-w-full flex flex-col justify-start items-start ">
          <h4 className="text-[#004F41] md:text-6xl text-3xl font-medium tracking-tight">A Personal Journey:</h4>
          <h4 className="text-[#2E2E2E] md:text-6xl text-3xl font-medium tracking-tight">Our Founder's Story</h4>
          <p className=" text-[#000000CC] mt-10 opacity-[80%] text-base leading-6">	“The story of MetabolixMD is personal to me. I've struggled with weight my entire life—trying everything from exercise and dieting to fasting and fads. <span className="text-black">Nothing worked.</span> After studying GLP-1 medications for two years, I finally started treatment in September 2023. Since then...</p>

          <ul className="list-disc list-inside text-[#000000CC] opacity-[80%] leading-snug my-6">
            <li>I've lost nearly 70 pounds.</li>
            <li>My asthma disappeared after one month.</li>
            <li>I no longer need medication for hypertension.</li>
            <li>I sleep better, breathe better, and <span className="text-black opacity-[80%]  font-bold">feel like I'm 20 again—at nearly 60 years old</span></li>
          </ul>

          <p className=" text-[#000000CC] opacity-[80%] leading-tight text-base">
            We created MetabolixMD so others could access this life-changing treatment the same way I did—quickly, privately, and safely. That's when Ashley and I teamed up and launched this company together."
          </p>
          <Image src={founderSign} width={150} height={150} className="md:mt-2 mt-10" />
          <p className="text-[#000000] opacity-[80%]">- Raj Sabar, MD, CEO, MetabolixMD</p>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 pt-24 pb-16"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h1 className="text-5xl  md:font-bold font-medium text-primary font-montserrat mb-6 flex justify-center items-center flex-wrap   gap-2">
            The{" "}
            <svg
              width="317"
              height="44"
              viewBox="0 0 317 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <svg
                width="317"
                height="44"
                viewBox="0 0 317 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M163.82 15.6816C168.176 11.1849 175.339 8.89366 178.285 16.2088C178.539 16.8381 179.081 19.4849 179.598 19.4816C179.841 19.4803 182.005 16.1793 182.541 15.6142C190.78 6.91607 203.419 12.2326 201.363 24.7399C200.097 32.4433 192.336 39.9575 184.288 36.5098C180.212 34.7634 178.811 31.4578 178.024 27.3285C177.684 27.2296 175.948 31.1343 175.58 31.687C172.196 36.7678 165.924 39.7467 160.874 34.9127L159.369 36.684L154.812 36.9224L159.13 0.461404L165.504 0.450928L163.821 15.6823L163.82 15.6816ZM190.503 16.3731C183.911 17.0784 182.028 35.0397 190.436 32.1382C195.178 30.5018 198.101 15.5598 190.503 16.3731ZM168.631 16.5002C164.237 17.1393 161.537 26.7319 161.713 30.4035C161.795 32.1113 164.679 32.5403 165.978 32.4276C171.153 31.9797 173.296 22.9961 172.032 18.925C171.494 17.191 170.547 16.2212 168.631 16.5002Z"
                  fill="black"
                />
                <path
                  d="M244.874 37.0092L249.513 1.54163C251.027 1.5102 255.021 0.981094 256.127 1.88607C259.332 9.01325 261.317 16.7828 264.116 24.1274L264.579 24.5805L278.066 2.20366C278.385 1.84809 278.767 1.51675 279.255 1.429C280.297 1.24237 283.573 1.24958 284.746 1.27839C284.987 1.28428 285.23 1.32881 285.445 1.43948C285.155 5.21196 284.357 8.97658 283.897 12.7405C283.044 19.7184 282.573 26.9779 281.515 33.9125C281.363 34.9151 281.276 36.097 280.817 37.0086H275.252L277.356 14.299L276.884 14.2342C276.296 15.0501 275.747 15.8968 275.197 16.7383C273.429 19.4467 267.36 30.9645 265.628 32.1668C264.521 32.9349 262.708 33.1857 261.606 32.2997C260.071 31.0647 256.071 17.1528 254.795 14.208C254.708 14.007 254.232 12.9377 254.106 12.937L250.767 37.0086H244.875L244.874 37.0092Z"
                  fill="black"
                />
                <path
                  d="M93.3432 36.8469L87.876 36.8797L90.7566 12.4119L90.1745 12.6791C87.3037 15.8917 80.7174 30.7642 77.8132 32.3836C72.8778 35.1359 71.7809 26.257 70.7253 23.3345C69.7765 20.7086 67.9927 14.9789 66.8225 12.8415C66.744 12.6974 66.5351 12.3569 66.3386 12.4093L63.4233 36.8443L63.0763 37.1305L57.6385 36.8698L61.9853 1.7146C62.3252 1.32956 66.9299 1.30795 67.649 1.41731C69.2277 1.65763 69.9487 4.70718 70.4641 6.06268C72.7128 11.9765 74.2706 18.293 76.774 24.0941C76.8519 24.2755 76.9364 24.5937 77.2036 24.5806L90.6296 2.14221C92.0918 0.767716 95.956 1.67073 97.8956 1.41534C98.0743 1.63537 98.077 1.8495 98.0789 2.11667C98.1005 4.67509 96.9782 9.03888 96.6521 11.8245C96.0437 17.0187 95.4328 22.108 94.7066 27.2825C94.26 30.4669 94.3353 33.7587 93.3432 36.8463V36.8469Z"
                  fill="black"
                />
                <path
                  d="M127.56 16.4759C127.102 20.4691 126.127 24.4 125.976 28.4345C125.948 29.177 125.816 31.3288 126.34 31.7813C127.586 32.8578 129.428 31.2031 130.169 31.5816L131.723 34.8839C131.766 35.798 127.383 37.2943 126.559 37.3893C122.852 37.8156 119.206 35.5859 119.293 31.5803L121.007 16.7948L120.791 16.4844L117.862 16.2684C119.381 22.9699 111.088 25.159 106.108 26.1111C105.399 26.2467 102.927 26.193 102.804 26.8773C102.705 27.4286 103.174 29.4534 103.435 30.0329C104.551 32.5082 107.156 32.6005 109.512 32.129C111.095 31.8121 114.082 29.7467 115.301 29.9491L117.212 32.2443C117.241 33.2462 113.838 35.1537 112.976 35.5904C98.7121 42.8204 91.3937 26.6415 100.192 16.0123C104.494 10.8149 113.646 9.37429 117.732 15.5493C117.502 11.8954 119.436 12.7755 121.931 11.6603C122.892 10.2917 123.55 5.56776 124.484 4.56718C125.097 3.91104 128.492 3.76567 128.872 4.35305L128.265 11.7644C131.928 12.211 135.523 11.0913 133.226 16.3129L127.561 16.4746L127.56 16.4759ZM108.666 15.9783C105.849 16.3607 103.955 19.5838 103.228 22.0551L103.386 22.3681C105.733 22.0027 111.794 21.4107 112.1 18.3638C112.326 16.1164 110.508 15.7275 108.666 15.9776V15.9783Z"
                  fill="black"
                />
                <path
                  d="M290.541 1.32436C292.639 0.928843 301.434 1.22679 303.867 1.41604C318.142 2.52466 320.249 20.266 312.754 29.9326C305.85 38.8383 295.624 36.6793 285.653 36.8876C285.541 36.7343 285.575 34.4621 285.6 34.0698C286.05 26.8267 287.643 18.699 288.59 11.4127C289.01 8.17782 289.156 4.89515 289.721 1.68321C289.863 1.43306 290.279 1.37478 290.541 1.32567V1.32436ZM296.294 6.81119C295.856 6.95983 295.639 8.72919 295.564 9.22227C294.701 14.861 294.055 21.186 293.471 26.8883C293.399 27.5909 292.798 31.5913 293.399 31.7504C297.539 31.8035 301.502 32.0752 305.019 29.5292C310.096 25.853 311.448 15.8871 308.579 10.5765C305.952 5.71304 300.964 6.90221 296.294 6.81119H296.294Z"
                  fill="black"
                />
                <path
                  d="M47.7518 4.09253C55.5574 8.76344 56.48 19.6356 50.6828 26.3411C47.5966 29.9112 36.8521 41.1618 33.2545 42.683C27.917 44.9402 22.2658 44.1701 17.6918 40.6701L17.8882 40.4068C25.4869 41.9948 30.6005 37.1569 35.5019 32.3681C38.3916 29.5451 47.4211 20.7554 48.1395 17.5192C49.2297 12.6073 44.3899 7.62796 39.4918 8.22386C34.5936 8.81975 25.9905 20.9544 21.6201 24.2535C20.2915 25.2567 19.0768 25.5926 17.5294 24.7053C17.069 24.4414 11.8867 19.3724 11.4827 18.8105C8.90658 15.2292 12.9069 11.574 16.4417 14.2476C17.3454 14.9313 18.6151 17.1427 19.8239 16.5703C27.0696 10.0109 32.4569 -0.500455 44.1116 2.56088C45.2307 2.8549 46.7591 3.49794 47.7511 4.09187L47.7518 4.09253Z"
                  fill="#386057"
                />
                <path
                  d="M24.1812 5.92536C24.578 6.28486 25.464 6.85849 25.225 7.44064C24.984 8.02802 21.5914 10.6375 21.1343 11.4803L20.7604 11.3755C15.0627 4.06826 3.26723 11.7442 7.92242 19.885C8.77436 21.3748 15.066 27.6697 16.5557 28.5295C19.7749 30.3885 22.5448 29.348 25.2322 27.2689C28.05 25.089 37.4029 13.9837 39.2947 13.5194C42.028 12.8489 44.5975 15.2881 43.3409 18.0561C42.654 19.5694 32.1282 29.792 30.1991 31.5188C25.1432 36.045 18.6819 37.3867 12.5684 33.8532C10.9006 32.8893 4.3346 26.5637 3.03673 24.8676C-7.4183 11.2118 11.469 -5.58395 24.1812 5.92536Z"
                  fill="#386057"
                />
                <path
                  d="M146.147 33.2155C143.624 35.6253 140.666 38.1791 136.951 37.1065C128.856 34.7694 131.676 21.9275 135.808 17.0615C140.515 11.5184 148.54 10.0411 155.16 12.6303L152.108 36.8813C151.776 37.2257 147.852 37.0057 147.206 36.5414C146.454 35.6194 146.143 34.387 146.147 33.2155ZM148.244 15.943C141.763 15.5318 138.179 21.3945 138.287 27.267C138.404 33.5488 142.804 33.2528 145.43 28.6382C147.583 24.8566 147.832 20.1877 148.243 15.943H148.244Z"
                  fill="black"
                />
                <path
                  d="M245.005 11.2355L236.112 23.5981L243.042 37.0097L241.594 36.9127L234.985 24.9634C234.456 24.8999 233.069 26.8513 233.114 27.362L238.071 37.0804L236.307 36.7405L231.716 28.6409L225.278 36.5971C223.961 37.4314 220.341 36.8996 218.688 37.1413L229.009 23.437L222.931 11.2283C223.082 11.0384 223.735 11.064 223.962 11.134C225.013 11.4575 228.874 20.8478 230.291 22.0887L232.121 19.6043L227.591 10.9742C231.207 11.0587 231.493 16.0793 233.433 18.2933C234.298 18.417 237.541 11.891 238.914 11.2316C240.358 10.5368 243.362 11.2277 245.006 11.2368L245.005 11.2355Z"
                  fill="black"
                />
                <path
                  d="M201.143 37.0095L205.497 0.733799L205.804 0.268869L211.879 0.242676L207.523 36.5151L207.232 37.0095H201.143Z"
                  fill="black"
                />
                <path
                  d="M210.437 37.0093L213.332 11.7728L219.676 11.7485L216.688 36.843L216.394 37.0093H210.437Z"
                  fill="black"
                />
                <path
                  d="M217.28 8.37237C219.482 8.37237 221.267 6.58838 221.267 4.38772C221.267 2.18706 219.482 0.403076 217.28 0.403076C215.077 0.403076 213.292 2.18706 213.292 4.38772C213.292 6.58838 215.077 8.37237 217.28 8.37237Z"
                  fill="black"
                />
              </svg>
            </svg>
            Team
          </h1>
          <p className=" max-w-4xl mx-auto font-poppins text-center opacity-[80%] text-black">
            At MetabolixMD, our strength lies in the expertise and dedication of
            our team. Each member— from our licensed providers to our support
            staff—shares a commitment to delivering personalized, science-backed
            care that empowers every patient to achieve lasting results. Meet
            the people behind your journey.
          </p>
        </motion.div>

        {/* Expert Cards Grid/Carousel */}
        {isMobile ? (
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {expertDetails
                .filter((expert) => expert.name)
                .map((expert, index) => (
                  <div
                    key={expert.route}
                    className="flex-none w-full snap-center px-4"
                  >
                    <motion.div
                      variants={fadeInUp}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      onClick={() => {
                        setActiveExpert(expert);
                        setShowOverlay(true);
                      }}
                      className="group relative overflow-hidden rounded-[60px] cursor-pointer  "
                    >
                      <div className="relative h-[400px] overflow-hidden ">
                        {expert.img && (
                          <motion.img
                            src={expert.img}
                            alt={expert.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                          />
                        )}
                        <div className="absolute inset-0" />
                      </div>
                      <div className="bg-[#F9FAFB] rounded-lg px-4 py-3 text-center font-bold  ">
                        <h3 className="text-xl font-bold font-montserrat text-[#004F41]">
                          {expert.name}, {expert.subName}
                        </h3>
                        {expert.mainRole || expert.designation ? (
                          <p className="text-sm text-[#004F41] font-light">
                            {expert.mainRole
                              ? expert.designation
                                ? `${expert.mainRole} ${expert.designation}`
                                : expert.mainRole
                              : expert.designation}
                          </p>
                          

                        ) : null}
                      </div>
                    </motion.div>
                  </div>
                ))}
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {expertDetails
                .filter((expert) => expert.name)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (sliderRef.current) {
                        const slideWidth = sliderRef.current.offsetWidth;
                        sliderRef.current.scrollTo({
                          left: slideWidth * index,
                          behavior: 'smooth'
                        });
                        setCurrentSlide(index);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#365D56] w-4' : 'bg-gray-300'
                      }`}
                  />
                ))}
            </div>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 gap-12 max-w-7xl mx-auto px-4"
          >
            {expertDetails
              .filter((expert) => expert.name)
              .map((expert, index) => (
                <motion.div
                  key={expert.route}
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: hoveredExpert === expert.route ? 1.01 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  onHoverStart={() => setHoveredExpert(expert.route)}
                  onHoverEnd={() => setHoveredExpert(null)}
                  onClick={() => {
                    setActiveExpert(expert);
                    setShowOverlay(true);
                  }}
                  className="group relative overflow-hidden rounded-[60px] cursor-pointer"
                >
                  <div className="relative h-[400px] overflow-hidden">
                    {expert.img && (
                      <motion.img
                        src={expert.img}
                        alt={expert.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                      />
                    )}
                    <div className="absolute inset-0" />
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg px-4 py-3 text-center font-bold">
                    <h3 className="text-2xl font-bold font-montserrat text-[#004F41]">
                      {expert.name}, {expert.subName}
                    </h3>
                    {expert.mainRole || expert.designation ? (
                      <p className="text-sm text-[#004F41] font-light">
                        {expert.mainRole && expert.designation
                          ? `${expert.mainRole}, ${expert.designation}`
                          : expert.mainRole || expert.designation}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}

        {/* Introduction Section */}
        <motion.div variants={fadeInUp} className="mt-20">
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="/images/metabolixmdSealWithBottomBlur.svg" alt="Description" width={142} height={142} />

            <h1 className="md:mt-20 mt-0 mb-10 text-4xl font-medium text-[#2E2E2E] max-w-3xl text-center tracking-wide  leading-2">
              <span className="text-[#365D56]">Who We Help</span>—and How We
              Make a Difference
            </h1>

            <p className="text-lg max-w-4xl text-black/80 mx-auto">
              MetabolixMD is available to adults aged 18 and older. We currently
              serve patients in more than 20 states and are expanding every
              month.{" "}
              <Link
                href="/get-started"
                className="text-[#365D56] font-semibold underline underline-offset-4 cursor-pointer"
              >
                Complete our online questionnaire
              </Link>{" "}
              to see if service is available in your area.
            </p>

            <h1 className="text-3xl font-light my-10 text-[#365D56]">
              Results That Matter
            </h1>

            <p className="text-lg max-w-4xl text-black/80 mx-6">
              We've already helped thousands of individuals achieve real,
              sustainable results. Our patients experience improvements not just
              in weight loss, but in overall health—including reduced blood
              pressure, better sleep, increased energy, and more confidence.
            </p>

            <Link
              href="/get-started"
              className="font-semibold px-10 py-4 bg-[#365D56] text-white rounded-full cursor-pointer my-10"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Expert Details Overlay */}
      <AnimatePresence>
        {showOverlay && activeExpert && (
          <>
            <motion.div
              className="fixed bg-black/50  z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowOverlay(false)}
              transition={{ duration: 0.3 }}

            />
            <div className="fixed inset-0 z-[99]  flex items-center justify-center p-4 overflow-y-scroll">
              <motion.div
                className="bg-white rounded-[32px] w-full md:max-w-[80vw] max-w-[90vw] max-h-full overflow-y-auto relative"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowOverlay(false)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors float-right border-2 border-[#50756E]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex md:flex-row flex-col items-center gap-5  p-5">
                  <div className="relative w-[200px] h-[200px] flex-shrink-0 bg-[#ECF4F2] rounded-[40px]">
                    <Image
                      src={activeExpert.img}
                      alt={activeExpert.name}
                      fill
                      className="object-contain rounded-2xl"
                      sizes="300px"
                      priority
                    />
                  </div>

                  <div className="md:text-left text-center">
                    <div className="md:block hidden">
                      <h1 className="text-4xl font-semibold text-[#004F41]">
                        <span className="text-[#2E2E2E]">
                          {activeExpert.name},
                        </span>{" "}
                        {activeExpert.subName}
                      </h1>
                      <p className="mt-4 text-lg text-[#365D56] font-medium">
                        {activeExpert.mainRole}, {activeExpert.designation}
                      </p>
                      <p className="text-lg text-[#365D56] font-medium">
                        {activeExpert.detailedJob}
                      </p>
                    </div>
                    <div className="md:hidden block">
                      <h1 className="text-3xl font-semibold text-[#004F41]">
                        <span className="text-[#2E2E2E]">
                          {activeExpert.name},
                        </span>{" "}
                        {activeExpert.subName}
                      </h1>
                      <p className="mt-2 text-base text-[#365D56] font-medium">
                        {activeExpert.mainRole}, {activeExpert.designation}
                      </p>
                      <p className="text-base text-[#365D56] font-medium">
                        {activeExpert.detailedJob}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-12 pb-10">
                  <div className="max-w-none text-xs text-gray-600">
                    {activeExpert.description}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <div className="relative flex justify-between items-center bg-[#ECF4F2] md:pl-20 pl-0 md:px-0 md:py-0 py-10 md:rounded-b-[100px] rounded-none z-30 -mb-24">
        <div className="md:max-w-[45%] max-w-full md:pb-52 md:pl-12 pl-0 md:py-40 py-0 flex flex-col items-center justify-center gap-4">
          <h1 className="md:text-6xl text-5xl font-medium text-[#2E2E2E] tracking-tighter px-5  ">
            <span className="text-[#365D56]">The Science</span> Behind Your
            Results
          </h1>
          <p className="text-md text-black font-extralight opacity-70 mt-10 leading-tight max-w-lg px-5">
            MetabolixMD is built on evidence—not trends. Our protocols are
            guided by board-certified providers and grounded in clinical
            research. GLP-1 medications are proven to support weight loss and
            improve metabolic health.
          </p>
          <div className="flex flex-col items-center gap-4 mt-12 md:max-w-lg max-w-[90%]">
            <div className="flex bg-white rounded-3xl items-center py-5 md:pl-10 pl-5 gap-4 w-full  px-32">
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.8214 4.39307H32.2143C32.991 4.39307 33.7359 4.70161 34.2851 5.25082C34.8343 5.80004 35.1429 6.54493 35.1429 7.32164V36.6074C35.1429 37.3841 34.8343 38.129 34.2851 38.6782C33.7359 39.2274 32.991 39.5359 32.2143 39.5359H8.78572C8.00901 39.5359 7.26412 39.2274 6.71491 38.6782C6.16569 38.129 5.85715 37.3841 5.85715 36.6074V7.32164C5.85715 6.54493 6.16569 5.80004 6.71491 5.25082C7.26412 4.70161 8.00901 4.39307 8.78572 4.39307H13.1786"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M24.8929 1.46436H16.1071C15.3304 1.46436 14.5855 1.7729 14.0363 2.32211C13.4871 2.87133 13.1786 3.61622 13.1786 4.39293V5.85721C13.1786 6.63392 13.4871 7.37881 14.0363 7.92803C14.5855 8.47724 15.3304 8.78578 16.1071 8.78578H24.8929C25.6696 8.78578 26.4145 8.47724 26.9637 7.92803C27.5129 7.37881 27.8214 6.63392 27.8214 5.85721V4.39293C27.8214 3.61622 27.5129 2.87133 26.9637 2.32211C26.4145 1.7729 25.6696 1.46436 24.8929 1.46436ZM18.4588 15.2579C18.1248 15.2579 17.8045 15.3906 17.5683 15.6268C17.3322 15.8629 17.1995 16.1832 17.1995 16.5172V20.052H13.6647C13.3307 20.052 13.0104 20.1847 12.7743 20.4208C12.5381 20.657 12.4054 20.9773 12.4054 21.3113V25.3966C12.4054 26.0907 12.9706 26.6559 13.6647 26.6559H17.1995V30.1907C17.1995 30.8848 17.7647 31.45 18.4588 31.45H22.5441C22.8781 31.45 23.1984 31.3173 23.4346 31.0812C23.6708 30.845 23.8034 30.5247 23.8034 30.1907V26.6501H27.3382C27.6722 26.6501 27.9925 26.5174 28.2287 26.2812C28.4648 26.0451 28.5975 25.7248 28.5975 25.3908V21.3113C28.5967 20.9778 28.4637 20.6583 28.2276 20.4227C27.9916 20.1872 27.6717 20.0549 27.3382 20.0549H23.8034V16.5143C23.8027 16.1808 23.6696 15.8613 23.4336 15.6257C23.1975 15.3902 22.8776 15.2579 22.5441 15.2579H18.4588Z"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-lg font-medium tracking-tighter">Evidence-based treatments</p>
            </div>

            <div className="flex bg-white rounded-3xl items-center py-5 md:pl-10 pl-5 gap-4 w-full">
              <svg
                width="44"
                height="51"
                viewBox="0 0 44 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1351 40.8337H4.64711C3.68117 40.8337 2.89828 40.0759 2.89828 39.1409V18.8371C2.89828 13.7604 8.14311 14.6068 8.14311 11.1912V7.83887"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.1272 7.83789V11.1902C22.1272 14.6074 27.372 13.761 27.372 18.8362V25.6041"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.00583 12.0679H22.2644"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.884 7.83756H7.26872C6.30278 7.83756 5.5199 7.07977 5.5199 6.14479V3.60879C5.5199 2.67381 6.30278 1.91602 7.26872 1.91602H23.0016C23.9675 1.91602 24.7504 2.67381 24.7504 3.60879V6.14637C24.7504 7.08135 23.9675 7.83914 23.0016 7.83914H20.3783"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.89828 19.6826H18.6311V26.4521"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.89828 34.9121H13.3879"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.598 35.8875H27.8345H20.598ZM24.2162 39.6V32.1749V39.6ZM14.5676 36.1993C14.5676 45.712 22.9112 49.0533 24.0799 49.4752C24.1708 49.5082 24.2616 49.5082 24.3525 49.4752C25.5236 49.0669 33.8649 45.8098 33.8649 36.2005V27.6011C33.8651 27.4905 33.8293 27.383 33.763 27.2958C33.6968 27.2085 33.604 27.1466 33.4994 27.1197L24.3332 24.7648C24.2564 24.7451 24.176 24.7451 24.0992 24.7648L14.933 27.1197C14.8284 27.1466 14.7356 27.2085 14.6694 27.2958C14.6032 27.383 14.5673 27.4905 14.5676 27.6011V36.1993Z"
                  fill="white"
                />
                <path
                  d="M20.598 35.8875H27.8345M24.2162 39.6V32.1749M14.5676 36.1993C14.5676 45.712 22.9112 49.0533 24.0799 49.4752C24.1708 49.5082 24.2616 49.5082 24.3525 49.4752C25.5236 49.0669 33.8649 45.8098 33.8649 36.2005V27.6011C33.8651 27.4905 33.8293 27.383 33.763 27.2958C33.6968 27.2085 33.604 27.1466 33.4994 27.1197L24.3332 24.7648C24.2564 24.7451 24.176 24.7451 24.0992 24.7648L14.933 27.1197C14.8284 27.1466 14.7356 27.2085 14.6694 27.2958C14.6032 27.383 14.5673 27.4905 14.5676 27.6011V36.1993Z"
                  stroke="#FD7823"
                  stroke-width="1.75"
                  stroke-miterlimit="10"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-lg font-medium tracking-tighter">
                Uncompromising product safety
              </p>
            </div>
            <div className="flex bg-white rounded-3xl items-center py-5 md:pl-10 pl-5 gap-4 w-full">
              <svg
                width="42"
                height="41"
                viewBox="0 0 42 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7614 11.1655V15.3421C25.498 15.3421 29.3383 19.1824 29.3383 23.919C29.3383 28.6557 25.498 32.496 20.7614 32.496H10.8178C8.27831 32.496 6.21875 34.5555 6.21875 37.095L30.7768 37.0902C33.6896 34.23 35.5134 30.1995 35.5134 25.9188C35.5134 17.7715 28.9087 11.1655 20.7602 11.1655H20.7614Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.21875 37.093C6.21875 34.5536 8.27712 32.494 10.8178 32.494H20.7614C25.498 32.494 29.3383 28.6537 29.3383 23.9171C29.3383 19.1804 25.498 15.3401 20.7614 15.3401V11.1636C28.9099 11.1636 35.5146 17.7683 35.5146 25.9168C35.5146 30.1987 33.6908 34.2281 30.778 37.0882"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.21875 29.3628H17.0611"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.72656 39.8843H39.001"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.7847 2.21095L14.7141 15.2815C14.2701 15.7255 14.2701 16.4454 14.7141 16.8894L20.1586 22.3339C20.6026 22.7779 21.3224 22.7779 21.7664 22.3339L34.837 9.26329C35.281 8.81931 35.281 8.09947 34.837 7.65549L29.3925 2.21094C28.9485 1.76696 28.2286 1.76696 27.7847 2.21095Z"
                  fill="white"
                  stroke="#FD7823"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M32.8594 1.52686L35.5221 4.18837"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.0293 20.3589L16.6908 23.0216"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.333 16.5098C30.5335 15.2668 29.6883 14.0966 28.4453 13.8962C27.2023 13.6958 26.0321 14.541 25.8317 15.784C25.6312 17.027 26.4764 18.1972 27.7194 18.3976C28.9625 18.598 30.1326 17.7528 30.333 16.5098Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.333 16.5098C30.5335 15.2668 29.6883 14.0966 28.4453 13.8962C27.2023 13.6958 26.0321 14.541 25.8317 15.784C25.6312 17.027 26.4764 18.1972 27.7194 18.3976C28.9625 18.598 30.1326 17.7528 30.333 16.5098Z"
                  fill="white"
                  stroke="#FD7823"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-lg font-medium tracking-tighter">Evidence-based treatments</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ECF4F2] to-transparent z-10 max-w-[60%]"></div>
          <Image
            src={scienceBehindResults}
            alt="science behind results"
            className=" relative z-0 rounded-b-[100px] hidden md:block object-cover"
          />
        </div>
      </div>
      <div className="relative mt-20 z-20">
        <div className="absolute inset-0 md:rounded-b-[100px] rounded-b-[40px] bg-gradient-to-r from-[#ECF4F2] to-transparent z-10 max-w-[40%]"></div>
        <Image
          src={scienceBehindResults}
          alt="science behind results"
          className=" relative z-0 md:rounded-b-[100px] rounded-b-[40px] block md:hidden"
        />
      </div>
      <div className="relative z-50 flex justify-center mx-8 md:mx-0">
        <div
          className=" 
            bg-[#365D56]
            rounded-3xl
            shadow-xl
            md:px-40 px-8 md:py-24 py-10
            mx-20
            text-center
            text-white
            max-w-[70rem]
            w-full
            -mb-50
            flex flex-col items-center 
          "
          style={{
            position: "absolute",
            top: "-100px",
            backgroundImage: ` url(${bgVector.src})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="text-3xl md:text-4xl mb-8">
            What's your weight loss goal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <Link href="/get-started" className="flex items-center justify-center bg-white text-black rounded-3xl py-2 px-4 font-medium text-lg hover:bg-gray-100 transition">
              Losing
              <br />
              1-20 lbs
            </Link>
            <Link href="/get-started" className="flex items-center justify-center bg-white text-black rounded-3xl py-2 px-4 font-medium text-lg hover:bg-gray-100 transition">
              Losing
              <br />
              21-50 lbs
            </Link>
            <Link href="/get-started" className="flex items-center justify-center bg-white text-black rounded-3xl py-2 px-4 font-medium text-lg hover:bg-gray-100 transition">
              Losing
              <br />
              51+ lbs
            </Link>
            <Link href="/get-started" className="flex items-center justify-center bg-white text-black rounded-3xl py-2 px-4 font-medium text-lg hover:bg-gray-100 transition">
              Not sure, I just want to lose the weight
            </Link>
          </div>
        </div>

      </div>

      <Footer paddingTop="pt-[40rem] md:pt-[33rem]" />
    </div>
  );
};

export default AboutUs;