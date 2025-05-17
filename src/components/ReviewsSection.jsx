import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ReviewsSection() {
    const testimonials = [
        {
          id: 1,
          name: "S J",
          image: "/images/testimonials/user1.webp",
          review:
            "I've struggled with weight for years, but the semaglutide program through MetabolixMD was a game-changer.",
        },
        {
          id: 2,
          name: "M C",
          image: "/images/testimonials/user2.webp",
          review:
            "Quick appointments and efficient delivery of medications. The whole process was seamless and professional.",
        },
        {
          id: 3,
          name: "E R",
          image: "/images/testimonials/user3.webp",
          review:
            "I appreciate how thorough the medical team was in reviewing my health history before starting treatment.",
        },
        {
          id: 4,
          name: "D T",
          image: "/images/testimonials/user4.webp",
          review:
            "The ongoing support and regular check-ins helped me stay motivated throughout my weight loss journey.",
        },
        {
          id: 5,
          name: "L M",
          image: "/images/testimonials/user5.webp",
          review:
            "Finally found a program that takes a scientific approach to weight loss. The results speak for themselves.",
        },
        {
          id: 6,
          name: "J W",
          image: "/images/testimonials/user6.webp",
          review:
            "The convenience of virtual consultations combined with quality medications made this program perfect for my busy schedule.",
        },
        {
          id: 7,
          name: "A F",
          image: "/images/testimonials/user7.webp",
          review:
            "Excellent communication from the medical team and great results with the prescribed medications.",
        },
        {
          id: 8,
          name: "R K",
          image: "/images/testimonials/user8.webp",
          review:
            "Very impressed with the professionalism and knowledge of the physicians. They really understand GLP-1 medications.",
        },
        {
          id: 9,
          name: "P L",
          image: "/images/testimonials/user9.webp",
          review:
            "The personalized treatment plan was exactly what I needed. Great support throughout the entire process.",
        },
      ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isDragging) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [isDragging]);

    const reviewVariants = {
        hidden: { 
            opacity: 0,
            x: 100,
            scale: 0.95
        },
        visible: { 
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: -100,
            scale: 0.95,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    const dotVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.2,
            transition: { duration: 0.2 }
        },
        active: { 
            scale: 1.3,
            transition: { duration: 0.2 }
        }
    };

    const handleDragEnd = (event, info) => {
        setIsDragging(false);
        const threshold = 50;
        
        if (Math.abs(info.offset.x) > threshold) {
            if (info.offset.x > 0) {
                // Swipe right - go to previous
                setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            } else {
                // Swipe left - go to next
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }
        }
    };

    return (
        <div className="w-full overflow-hidden relative md:py-16 py-0 my-16 pb-32 bg-white select-none md:rounded-b-[100px] rounded-b-[40px] z-30 ">
            <motion.div 
                className="flex overflow-x-hidden touch-pan-x"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                style={{ x: dragX }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        variants={reviewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex-shrink-0 w-full px-4 flex flex-col items-center text-center"
                    >
                        <motion.div 
                            className="w-24 h-24 rounded-full overflow-hidden mb-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img 
                                src={testimonials[currentIndex].image} 
                                alt={testimonials[currentIndex].name} 
                                className="w-full h-full object-cover select-none pointer-events-none"
                                draggable="false"
                            />
                        </motion.div>
                        <div className="max-w-2xl mt-5 mx-5">
                            <motion.p 
                                className="text-2xl leading-relaxed text-gray-700 mb-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {`"${testimonials[currentIndex].review}"`}
                            </motion.p>
                            <motion.p 
                                className="font-bold text-lg text-gray-900 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {testimonials[currentIndex].name}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        variants={dotVariants}
                        initial="initial"
                        whileHover="hover"
                        animate={index === currentIndex ? "active" : "initial"}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ReviewsSection;