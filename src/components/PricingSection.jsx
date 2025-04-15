import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PricingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.firstChild?.offsetWidth || 0;
      const scrollPosition = container.scrollLeft;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(index, pricingPlans.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to a specific plan when clicking on indicator dots
  const scrollToPlan = (index) => {
    const container = containerRef.current;
    if (!container) return;
    
    const cardWidth = container.firstChild?.offsetWidth || 0;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  // Animation variants
  const fadeIn = {
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

  const pricingPlans = [
    {
      title: "Price Point 1",
      monthlyPrice: 99,
      yearlyPrice: 999,
      icon: (
        <svg width="69" height="64" viewBox="0 0 69 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.94921 5.28516H47.688C48.3974 5.28516 48.9731 5.8609 48.9731 6.5703V57.4296C48.9731 58.139 48.3974 58.7147 47.688 58.7147H9.94921C9.23981 58.7147 8.66406 58.139 8.66406 57.4296V6.5703C8.66406 5.8609 9.23981 5.28516 9.94921 5.28516Z" fill="#365D56" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M48.9714 38.3151V57.3627C48.9714 58.1098 48.3665 58.7147 47.6194 58.7147H10.016C9.26893 58.7147 8.66406 58.1098 8.66406 57.3627V6.63713C8.66406 5.89003 9.26893 5.28516 10.016 5.28516H47.6194C48.3665 5.28516 48.9714 5.89003 48.9714 6.63713V19.2658" fill="#365D56"/>
<path d="M48.9714 38.3151V57.3627C48.9714 58.1098 48.3665 58.7147 47.6194 58.7147H10.016C9.26893 58.7147 8.66406 58.1098 8.66406 57.3627V6.63713C8.66406 5.89003 9.26893 5.28516 10.016 5.28516H47.6194C48.3665 5.28516 48.9714 5.89003 48.9714 6.63713V19.2658" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M28.1128 39.751H17.0469" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M23.5394 49.3325H17.0469" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M64.4294 18.0467L59.784 13.4014L32.861 40.3243C31.5776 41.6078 31.5776 43.688 32.861 44.9714C34.1444 46.2549 36.2247 46.2549 37.5081 44.9714L62.0938 20.3874L64.4328 18.0485L64.4294 18.0467Z" fill="#365D56" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M64.432 18.0469L66.7127 20.3276C67.1325 20.7474 67.1325 21.4277 66.7127 21.8475L58.875 29.6852" fill="#365D56"/>
<path d="M64.432 18.0469L66.7127 20.3276C67.1325 20.7474 67.1325 21.4277 66.7127 21.8475L58.875 29.6852" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M64.4294 18.0467L59.784 13.4014L32.861 40.3243C31.5776 41.6078 31.5776 43.688 32.861 44.9714C34.1444 46.2549 36.2247 46.2549 37.5081 44.9714L62.0938 20.3874" fill="#365D56"/>
<path d="M64.4294 18.0467L59.784 13.4014L32.861 40.3243C31.5776 41.6078 31.5776 43.688 32.861 44.9714C34.1444 46.2549 36.2247 46.2549 37.5081 44.9714L62.0938 20.3874" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
<path d="M31.1085 46.7246L30.0547 47.7784" stroke="#1C2A9E" strokeWidth="2" strokeLinejoin="round"/>
<path d="M30.0542 47.7783L28.5 49.3325" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.7135 11.2134H21.5078V17.0222H26.7135C28.3174 17.0222 29.6179 15.7217 29.6179 14.1178C29.6179 12.514 28.3174 11.2134 26.7135 11.2134Z" fill="#365D56" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.5078 17.0205V22.8294" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.7539 17.0205L36.3699 28.6382" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M36.3721 18.7681L26.5039 28.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
      features: [
        "Feature text goes here",
        "Feature text goes here",
        "Feature text goes here"
      ],
      color: "bg-[#365D56]",
      textColor: "text-white"
    },
    {
      title: "Price Point 1",
      monthlyPrice: 99,
      yearlyPrice: 999,
      icon: (
        <svg width="69" height="58" viewBox="0 0 69 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M61.3402 49.776V16.0507C61.3402 13.8805 59.5808 12.1211 57.4106 12.1211H11.9335C9.76334 12.1211 8.00391 13.8805 8.00391 16.0507V49.776H61.3402Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
<path d="M1.3377 49.7783C1.3377 53.484 4.32237 56.4863 8.00165 56.4863H61.338C65.019 56.4863 68.002 53.484 68.002 49.7783H1.33594H1.3377Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.8061 12.9316H11.9335C9.76334 12.9316 8.00391 14.6911 8.00391 16.8612V49.7773H28.9601" stroke="#FD7823" strokeWidth="2" strokeLinejoin="round"/>
<path d="M48.1931 12.9316H57.4133C59.5835 12.9316 61.3429 14.6911 61.3429 16.8612V49.7773H40.3867" stroke="#FD7823" strokeWidth="2" strokeLinejoin="round"/>
<path d="M32.1914 49.7769H37.1524" stroke="#FD7823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1.33594 49.7783C1.33594 53.484 4.3206 56.4863 7.99988 56.4863H61.3362C65.0173 56.4863 68.0002 53.484 68.0002 49.7783" stroke="#FD7823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.375 44.7485V32.0147C15.375 29.6629 18.0652 27.6584 20.6268 27.2847L28.4966 25.9678L34.6899 37.0514L40.8814 25.9678L49.5604 27.2847C52.1202 27.6584 54.003 29.6629 54.003 32.0147L53.1956 44.7485H15.375Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
<path d="M15.375 44.7485V32.0147C15.375 29.6629 18.0652 27.6584 20.6268 27.2847L28.4966 25.9678L34.6899 35.4366L40.8814 25.9678L49.5604 27.2847C52.1202 27.6584 54.003 29.6629 54.003 32.0147V44.7485" stroke="#FD7823" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
<path d="M34.6631 1.52002C29.4077 1.52002 25.1484 5.97499 25.1484 11.4701H25.1555C25.1555 11.7328 25.1714 11.9867 25.1802 12.2458C27.8969 11.3308 29.4783 9.57846 30.5589 7.39769C30.5589 7.39769 30.5589 7.39593 30.5572 7.39416H30.5607V7.39769C32.0663 10.4652 36.4772 12.646 40.9674 12.646C42.0798 12.646 43.1499 12.512 44.1566 12.2652C44.1654 12.0008 44.183 11.7398 44.183 11.4701C44.183 5.97499 39.9237 1.52002 34.6684 1.52002H34.6631Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M25.3449 14.2497C25.225 13.3524 25.1633 12.4215 25.1633 11.4642H25.1562C25.1562 5.96913 29.4155 1.51416 34.6709 1.51416C39.9263 1.51416 44.1855 5.96913 44.1855 11.4642C44.1855 12.4215 44.1238 13.3524 44.004 14.2497H43.9969C43.8453 15.5473 42.8651 16.4587 41.6293 16.4587C41.5006 16.4587 41.3789 16.4411 41.2555 16.4217C40.2154 20.6457 37.6626 23.6357 34.6691 23.6357C31.6756 23.6357 29.1211 20.6439 28.0827 16.4217C27.9611 16.4411 27.8377 16.4587 27.709 16.4587C26.4749 16.4587 25.493 15.5472 25.3414 14.248L25.3449 14.2497Z" stroke="#FD7823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M40.9749 12.6405C36.4829 12.6405 32.0702 10.4597 30.5664 7.38867" stroke="#FD7823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M43.0508 35.5596V43.3906" stroke="#FD7823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M39.1367 39.4746H46.9678" stroke="#FD7823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
      features: [
        "Feature text goes here",
        "Feature text goes here",
        "Feature text goes here"
      ],
      color: "bg-white",
      textColor: "text-zinc-800"
    },
    {
      title: "Price Point 1",
      monthlyPrice: 99,
      yearlyPrice: 999,
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.8785 1.33594H32.7265C34.9109 1.33594 36.6831 3.10816 36.6831 5.29252V10.2382C36.6831 10.7839 36.2396 11.2274 35.6939 11.2274H15.911C15.3653 11.2274 14.9219 10.7839 14.9219 10.2382V5.29252C14.9219 3.10816 16.6941 1.33594 18.8785 1.33594Z" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.0121 15.1836L9.01883 22.9583C8.36599 23.6804 8 24.6299 8 25.5993V54.7494C8 56.9354 9.77057 58.706 11.9566 58.706H24.9441" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M43.6097 40.0408V25.5993C43.6097 24.6299 43.2437 23.6804 42.5909 22.9583L35.5977 15.1836" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M35.5977 15.1836L42.5909 22.9583C43.2437 23.6804 43.6097 24.6299 43.6097 25.5993V27.0533" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.0721 51.7822H11.957" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.957 27.0537H31.7399C32.828 27.0537 33.7182 27.9439 33.7182 29.032V43.6615" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.0721 51.7822H11.957" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M30.4415 60.9255C28.1237 58.6076 28.1237 54.8505 30.4415 52.5326L37.4365 45.5377C39.7544 43.2198 43.5114 43.2198 45.8293 45.5377C48.1472 47.8556 48.1472 51.6127 45.8293 53.9306L38.8345 60.9255C36.5166 63.2434 32.7594 63.2434 30.4415 60.9255Z" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M51.2436 52.0693C52.6185 53.1574 53.4989 54.8389 53.4989 56.7282C53.4989 58.3702 52.8361 59.8539 51.7579 60.9222C50.6897 62.0004 49.206 62.6631 47.564 62.6631H42.6875" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M33.9375 49.0347L39.5328 54.6299" stroke="#FD7823" strokeWidth="1.97829" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
      features: [
        "Feature text goes here",
        "Feature text goes here",
        "Feature text goes here"
      ],
      color: "bg-white",
      textColor: "text-zinc-800"
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildren}
      className="font-montserrat px-4 md:px-6 mx-auto max-w-[1600px] my-16 md:my-[20vw] "
    >
      {/* Section Header */}
      <motion.div 
        variants={fadeIn}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-7xl font-medium mb-6">
          Your Weight Loss Journey
        </h2>
        <p className="text-zinc-600 max-w-2xl">
          Choose a plan that fits your weight loss journey.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div 
        ref={containerRef}
        className="flex md:grid md:grid-cols-3 gap-12 overflow-x-auto md:overflow-visible pb-4 snap-x snap-mandatory">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className={`${plan.color} ${plan.textColor} rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 min-w-[85vw] md:min-w-0 flex-shrink-0 md:flex-shrink snap-center`}
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <div className="p-8">
              {/* Plan Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                    <span className="text-lg ml-2">/mo</span>
                  </div>
                  <p className="text-sm opacity-80 mt-1">or ${plan.yearlyPrice} yearly</p>
                </div>
                <div className={`p-3 rounded-xl ${plan.color === 'bg-white' ? 'bg-zinc-100' : 'bg-white/10'}`}>
                  {plan.icon}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <p className="font-medium">Includes:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link 
                href="/get-started" 
                className={`block text-center py-3 px-6 rounded-full transition-all duration-300 ${plan.color === 'bg-white' ? 'bg-[#365D56] text-white hover:bg-[#2e4f49]' : 'bg-white text-[#365D56] hover:bg-gray-100'}`}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile dot indicators */}
      <div className="flex justify-center gap-3 mt-6 md:hidden">
        {pricingPlans.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPlan(index)}
            aria-label={`View pricing plan ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#365D56] scale-125 transform' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

    </motion.section>
  );
};

export default PricingSection;