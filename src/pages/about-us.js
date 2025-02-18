import DetailsPage from '@/components/DetailsPage'
import Footer from '@/components/Footer'
import Introduction from '@/components/Intro'
import MeetExpertBackground from '@/components/MeetExpertBackground'
import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';


const expertDetails = [
    {
        route: "about-ashley",
        img: "/images/dr1.webp",
        name: "Ashley Donaldson",
        subName: "FNP-BC",
        isApproved: true,
        mainRole: "Co-Founder",
        designation: "Consultant",
        detailedJob: "Advanced Nurse Practitioner and Consultant at MetabolixMD",
        description: (
            <div className='text-lg'>
                <p className='mt-3'>
                    <b>Ashley Donaldson, FNP-C</b>, is a highly experienced Nurse Practitioner with over 14 years of expertise in both primary and urgent care settings. Throughout her career, she has been dedicated to promoting preventative health, managing chronic conditions, and delivering acute care to diverse populations. Ashley has a deep passion for evidence-based practice, ensuring that her patients receive the most current and effective treatments to enhance their well-being and quality of life.
                </p>
                <p className='mt-3'>
                    As a co-founder and consultant at <b>MetabolixMD</b>, Ashley focuses on optimizing patient outcomes through personalized care strategies and lifestyle interventions. She brings extensive experience from her time working independently in urgent care, where she assessed, diagnosed, and treated a wide range of acute illnesses and injuries. Additionally, Ashley played a key role in developing a wellness clinic aimed at fostering healthy living through weight management, smoking cessation, and self-care education.
                </p>
                <p className='mt-3'>
                    Ashley began her healthcare journey in the fast-paced environment of the Emergency Department at Covenant Medical Center, where she provided compassionate care to critically ill patients experiencing acute trauma, heart attacks, strokes, and other life-threatening conditions. This foundational experience shaped her collaborative approach to healthcare, working closely with physicians and multidisciplinary teams to deliver the highest standard of patient care.
                </p>
                <p className='mt-3'>
                    Alongside her clinical achievements, Ashley holds a Master of Science in Nursing from Texas Tech Health Science Center, with board certification through the American Academy of Nurse Practitioners and prescriptive authority from the Texas Board of Nursing. She also maintains certifications in Basic Life Support (BLS) and Advanced Cardiovascular Life Support (ACLS).
                </p>
                <p className='mt-3'>
                    Beyond her professional endeavors, Ashley is an accomplished athlete and avid runner, embracing an active lifestyle that reflects her commitment to health and wellness. A major milestone in her running journey was completing the 2024 Boston Marathon—a prestigious event and a testament to her dedication, discipline, and resilience. Her achievement in this renowned race exemplifies the same goal-oriented mindset she brings to her clinical practice, inspiring her patients to overcome challenges and unlock their full health potential.
                </p>
            </div>

        )
    },
    {
        route: "about-gulrezguskhan",
        img: "/images/dr6.webp",
        name: "Gulrez Gus Khan",
        subName: "MBA",
        isApproved: true,
        mainRole: "Chief Liaison Officer",
        designation: "Board Director",
        detailedJob: "",
        description: (
            <div className='text-lg'>
                <p className='mt-3'>
                    MetabolixMD is proud to announce the appointment of distinguished healthcare entrepreneur and political leader <strong>Dr. Gulrez Khan</strong> as its newest board director. Affectionately known as "Gus" among his peers, Khan is the co-owner of the esteemed American Star Home Health & Hospice Care, Inc., based in Lubbock, Texas. With over 15 years of expertise in healthcare management, development, operations, and entrepreneurship, he brings a wealth of knowledge and leadership to our organization.
                </p>
                <p className='mt-3'>
                    Beyond his business success, Khan is an influential figure in the Republican Party, currently serving as a precinct chair and chairman of the Resolutions Committee for the Lubbock County GOP. Earlier this year, he was honored as an invitee to President Donald J. Trump’s inauguration ceremony. In 2024, he ran in the Republican primary for U.S. Congress in Texas District 32 and was elected as a National Delegate to the Republican National Convention in Milwaukee. He also campaigned for Mayor of Lubbock in 2022.
                </p>
                <p className='mt-3'>
                    Khan is deeply committed to philanthropy, having played a pivotal role in fundraising efforts for organizations such as the American Heart Association, Ronald McDonald House Charities, Lubbock Monterey AMBUCS, and Boys &amp; Girls Clubs of America. His dedication extends to serving on several nonprofit boards and committees, including the Lubbock Pediatric Cancer Association, South Plains Food Bank, Center for Global Understanding, United States Global Leadership Coalition, American Premier League, Premium Aussies, and Being Sportsman.
                </p>
                <p className='mt-3'>
                    In addition to his work in healthcare, politics, and philanthropy, "Gus" is a published author with multiple books available on Amazon, inspiring readers worldwide.
                </p>
                <p className='mt-3'>
                    We are thrilled to welcome Gulrez Khan to MetabolixMD and are confident that his leadership and vision will drive our organization to new heights.
                </p>

            </div>
        )
    },
    {
        route: "about-mohit",
        img: "/images/dr4.webp",
        name: "Mohit Chawla",
        subName: "MD",
        isApproved: true,
        mainRole: "",
        designation: "Consultant",
        detailedJob: "",
        description: (
            <div className='text-lg'>
                <p className='mt-3'>
                    <b>Dr. Mohit Chawla, M.D.</b>, is an exceptional physician with specialized expertise in geriatric care, general medicine, pain management, and palliative care. Driven by a passion for patient-centered care, Dr. Chawla has held key roles at respected institutions, including the Pain Management Centers of America, Grand Island Pain Relief Center, and St. Bernards Healthcare, where he treated complex cases across multiple disciplines. His broad clinical experience enables him to meet the nuanced needs of aging populations while managing chronic pain and end-of-life care with empathy and precision.
                </p>
                <p className='mt-3'>
                    Dr. Chawla's educational background is extensive, marked by multiple advanced fellowships. He completed his Hospice and Palliative Care training at both Rush University and John H. Stroger, Jr. Hospital, followed by a Geriatric Medicine Fellowship at the University of Alabama at Birmingham. Prior to these, he completed his Family Medicine Residency at Creighton University School of Medicine and earned his MBBS from Manipal College of Medical Sciences, Nepal. These achievements reflect his commitment to continuous learning and clinical excellence.
                </p>
                <p className='mt-3'>
                    As a consultant at <b>MetabolixMD</b>, Dr. Chawla leverages his vast knowledge and hands-on experience to optimize patient outcomes, with a focus on holistic well-being and quality of life. His ability to integrate pain management, palliative care, and geriatrics allows him to offer comprehensive, personalized solutions that address each patient's unique needs.
                </p>
                <p className='mt-3'>
                    Outside his professional life, Dr. Chawla enjoys traveling and exploring new cultures, experiences that enrich his perspective and contribute to his well-rounded approach to medicine. His diverse interests, combined with his clinical expertise, make him a valuable asset to the MetabolixMD team and a trusted partner in helping patients achieve healthier, more fulfilling lives.
                </p>
            </div>

        )
    },
    {
        route: "about-joseph",
        img: "/images/dr3.webp",
        name: "Joseph Rizzo",
        subName: "MD",
        isApproved: true,
        mainRole: "",
        designation: "Consultant",
        detailedJob: "",
        description: (
            <div className='text-lg'>
                <p className='mt-3'>
                    <b>Dr. Joseph Rizzo</b>, born in March 1954 in the Bronx, NY, is a distinguished cardiologist with a career spanning over three decades. He earned his <b>M.D.</b> from <i>New York Medical College</i> after beginning his academic journey at the University of Torino. Dr. Rizzo completed his residency and fellowships in internal medicine and cardiology in New York, with a focus on advanced cardiovascular care at North Shore University Hospital.
                </p>

                <p className='mt-3'>
                    Throughout his career, Dr. Rizzo practiced in Lubbock, TX, where he held prominent roles at JAJ Cardiology, LLC, and Covenant Medical Center. He is board certified in cardiovascular diseases, internal medicine, interventional cardiology, and anti-aging medicine. In addition to his clinical expertise, Dr. Rizzo held leadership positions, including Cardiology Section Chief and Director of Cardiac Rehabilitation.
                </p>

                <p className='mt-3'>
                    Currently, Dr. Rizzo serves as the Chief Consultant of <b>MetabolixMD</b>, where he brings his extensive experience and expertise in cardiology and metabolic health to guide innovative medical practices. Although he retired from active clinical practice in October 2020, his dedication to the field remains unwavering. Through his consultancy work, Dr. Rizzo continues to make significant contributions to advancing healthcare, mentoring young professionals, and advocating for best practices in patient management.
                </p>
            </div>

        )
    },
    {
        route: "about-raj",
        img: "/images/dr2.webp",
        name: "Raj Sabar",
        subName: "MD",
        isApproved: true,
        mainRole: "CEO",
        designation: "Consultant",
        detailedJob: "",
        description: (
            <div className='text-lg'>
                <p className='mt-3'>
                    Meet <b>Dr. Raj</b>, a consultant with <b>MetabolixMD</b>, who has personally experienced the transformative power of Tirzepatide in his own weight loss journey. A dedicated fitness enthusiast, Dr. Raj was committed to living a healthy lifestyle, staying active, and eating well, yet he found himself stuck at a frustrating weight loss plateau. That all changed when he discovered Tirzepatide, a groundbreaking advancement in metabolic health.
                </p>
                <p className='mt-3'>
                    With the help of Tirzepatide, Dr. Raj overcame the barriers that had slowed his progress, achieving remarkable, sustainable results. This personal success not only improved his physical health but also reignited his passion for helping others. Inspired by his journey, Dr. Raj joined MetabolixMD as a consultant, eager to guide patients through their own weight loss transformations with the same powerful approach.
                </p>
                <p className='mt-3'>
                    Dr. Raj's unique combination of personal experience, medical expertise, and enthusiasm for fitness makes him an invaluable asset to the MetabolixMD team. He understands firsthand the physical and emotional challenges of weight management, which allows him to offer empathetic, personalized care to his patients. Dr. Raj is committed to empowering individuals to overcome obstacles, reach their goals, and embrace healthier, more fulfilling lives.
                </p>
                <p className='mt-3'>
                    In his free time, Dr. Raj enjoys cooking Indian cuisine, exploring new flavors, and sharing meals with family and friends. When he isn't in the kitchen, you will often find him on the golf course, practicing his swing, or simply enjoying the outdoors. His well-rounded lifestyle reflects the same balance he strives to help his patients achieve—health, happiness, and personal fulfillment.
                </p>
            </div>
        )
    },
    {
        route: "about-kurt",
        img: "/images/dr5.webp",
        name: "Kurt Springmann",
        subName: "MD, JD",
        isApproved: true,
        mainRole: "",
        designation: "Consultant, Chief Legal Officer",
        detailedJob: "",
        description: (
            <div className='text-lg'>
                <p className='mt-3'>
                    Dr. Kurt Emil Springmann, M.D., J.D., is a seasoned consultant and the Chief Legal Officer at MetabolixMD, where he contributes a unique combination of medical, legal, and financial expertise. With a career that spans decades across multiple disciplines, Dr. Springmann holds a Juris Doctorate from Arizona State University College of Law, where he graduated magna cum laude, ranking first in his class. His outstanding legal education was highlighted by numerous awards, including the Regents Scholar award and the Order of the Coif, reflecting his dedication to excellence. He is also a licensed medical doctor, having received his Doctor of Medicine from the University of Arizona College of Medicine, where he was recognized as a top student and member of the Alpha Omega Alpha Honor Society.
                </p> <p className='mt-3'>
                    Dr. Springmann's professional journey is marked by substantial roles in both law and medicine, underscoring his versatility and breadth of expertise. His early medical career included rigorous training in anesthesiology, where he practiced extensively across trauma, pediatric, ENT, neurosurgical, and general surgical anesthesia in diverse settings. Over the years, he has held prestigious positions such as Assistant Professor of Anesthesiology at Texas Tech University Health Sciences Center, where he contributed to the academic and clinical training of medical students and residents. His experience includes managing anesthesia services at leading hospitals, as well as a locum tenens practice covering a wide array of surgical cases, from trauma to complex specialty surgeries, and managing pain in acute and chronic settings.
                </p> <p className='mt-3'>
                    In parallel with his medical career, Dr. Springmann has cultivated a robust legal practice. After obtaining his law degree, he served as an Associate Attorney with Morrison & Foerster LLP in San Francisco, a role in which he handled corporate and technology-related litigation and arbitration, honing skills in complex litigation and negotiation on behalf of international and corporate clients. Since 2003, he has operated his own private legal practice, offering counsel on litigation, contracting, and technological issues, bridging the gap between medicine and law for healthcare organizations.
                </p> <p className='mt-3'>
                    Beyond his clinical and legal contributions, Dr. Springmann's financial acumen is evidenced by his earlier career roles in financial planning and analysis for prominent firms, as well as his credentials as a Certified Public Accountant. His rich background in accounting and finance strengthens his capability to address healthcare financial planning and compliance matters with a holistic view. Dr. Springmann's extensive list of publications, including topics on intellectual property and medical research, as well as his active certifications in anesthesia and law across multiple states, further attest to his wide-ranging expertise.
                </p> <p className='mt-3'>
                    At MetabolixMD, Dr. Springmann's combined knowledge enables him to advise on medical, legal, and regulatory challenges, ensuring the company's operations align with rigorous standards across multiple disciplines.

                </p>
            </div>
        )
    }
];

const AboutUs = () => {
    const router = useRouter();
    const { details } = router.query;
    const [activeExpert, setActiveExpert] = useState(null);
    const [hoveredExpert, setHoveredExpert] = useState(null);

    useEffect(() => {
        const expert = expertDetails.find(exp => exp.route === details);
        setActiveExpert(expert);
    }, [details]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
            <Head><title>About Us - MetabolixMD</title></Head>
            <NavBar />

            {!activeExpert ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-4 pt-24 pb-16"
                >
                    {/* Hero Section */}
                    <motion.div
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-primary font-montserrat mb-6">
                            Meet Our Expert Team
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto font-poppins">
                            Our dedicated team of healthcare professionals is committed to helping you achieve your weight loss goals through personalized care and proven medical solutions.
                        </p>
                    </motion.div>

                    {/* Expert Cards Grid */}
                    <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8"
                    >
                        {expertDetails.map((expert, index) => (
                            <motion.div
                                key={expert.route}
                                variants={fadeInUp}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: hoveredExpert && hoveredExpert !== expert.route ? 'blur(2px)' : 'blur(0px)',
                                    scale: hoveredExpert === expert.route ? 1.01 : 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                onHoverStart={() => setHoveredExpert(expert.route)}
                                onHoverEnd={() => setHoveredExpert(null)}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-[600px] overflow-hidden">
                                    <motion.img
                                        src={expert.img}
                                        alt={expert.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-semibold font-montserrat mb-2">
                                            {expert.name}
                                        </h3>
                                        <p className="text-gray-200 font-poppins mb-2">
                                            {expert.subName}
                                        </p>
                                        <p className="text-gray-300 font-poppins">
                                            {expert.designation}
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="mt-4 bg-primary/90 hover:bg-primary text-white px-6 py-2 rounded-full text-sm transition-colors"
                                            onClick={() => router.push(`/about-us?details=${expert.route}`)}
                                        >
                                            Read More
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Introduction Section */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-20"
                    >
                        <Introduction />
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-24 pb-16 px-4"
                >
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => router.push('/about-us')}
                            className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to Team
                        </button>

                        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div className={`relative w-full ${activeExpert.name === "Ashley Donaldson" || activeExpert.name === "Raj Sabar"
                                        ? "aspect-[4/5]"
                                        : "aspect-[3/4]"
                                    } rounded-xl overflow-hidden bg-gray-100`}>
                                    <Image
                                        src={activeExpert.img}
                                        alt={activeExpert.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                        style={{
                                            objectPosition: 'top',
                                            objectFit: activeExpert.name === "Ashley Donaldson" || activeExpert.name === "Raj Sabar"
                                                ? "cover"
                                                : "contain"
                                        }}
                                    />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-2">
                                        {activeExpert.name}
                                    </h1>
                                    <p className="text-xl text-gray-600 mb-2 font-poppins">
                                        {activeExpert.subName}
                                    </p>
                                    <p className="text-lg text-primary/80 mb-6 font-poppins">
                                        {activeExpert.designation}
                                    </p>
                                    <div className="prose max-w-none">
                                        {activeExpert.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <Footer />
        </div>
    )
}

export default AboutUs;
