import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
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

  // Trust features data with SVG icons
  const trustFeatures = [
    {
      icon: (
        <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M49.9307 8.7865C49.9307 6.49974 48.0589 4.62793 45.7721 4.62793H6.16247C3.87572 4.62793 2.00391 6.49974 2.00391 8.7865V15.3854H49.9325V8.7865H49.9307Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M2.00183 15.3853V45.3233C2.00183 47.61 3.87364 49.4818 6.1604 49.4818H45.77C48.0568 49.4818 49.9286 47.61 49.9286 45.3233V15.3853H2H2.00183Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.6875 4.62793H33.205" stroke="#FD7823" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M28.4432 49.4817H6.16247C3.87572 49.4817 2.00391 47.6099 2.00391 45.3232V8.78808C2.00391 6.50133 3.87572 4.62952 6.16247 4.62952H12.0247" stroke="#FD7823" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M39.8711 4.62793H45.7699C48.0566 4.62793 49.9284 6.49974 49.9284 8.7865V27.9927" stroke="#FD7823" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M36.5586 8.5834V1.50928" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.375 1.50928V8.5834" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.35156 15.3853H46.5771" stroke="#FD7823" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M31.793 29.5117V22.9019H38.4028" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.1289 29.5117V22.9019H20.7406" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.1289 42.8004V36.1887H20.7406" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M59.0001 40.4114H49.9298V31.343H40.8614V40.4114H31.793V49.4817H40.8614V58.5501H49.9298V49.4817H59.0001V40.4114Z" fill="white" stroke="#FD7823" strokeWidth="2.5" strokeLinejoin="round"/>
</svg>

      ),
      title: "Same-day appointment, 2 day delivery",
    },
    {
      icon: (
        <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0863 20.3987C15.9152 19.1075 15.8252 17.7687 15.8252 16.3947H15.8164C15.8164 8.49247 21.9424 2.08606 29.5006 2.08606C37.0588 2.08606 43.1848 8.49247 43.1848 16.3947C43.1848 17.7705 43.0948 19.1093 42.9237 20.4004H42.9149C42.6962 22.2666 41.2868 23.5772 39.5106 23.5772C39.3272 23.5772 39.149 23.5525 38.9744 23.5225C37.4804 29.5955 33.8062 33.8976 29.5024 33.8976C25.1985 33.8976 21.5243 29.5955 20.0303 23.5225C19.8539 23.5507 19.6775 23.5772 19.4941 23.5772C17.7179 23.5772 16.3085 22.2666 16.0898 20.3987H16.0863Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M29.485 2.09136C21.9285 2.09136 15.8008 8.49778 15.8008 16.4H15.8096C15.8096 16.7774 15.8325 17.1443 15.8466 17.5147C19.7536 16.1989 22.0273 13.6801 23.5813 10.5439C23.5813 10.5421 23.5795 10.5403 23.5777 10.5386H23.583C23.583 10.5386 23.583 10.5421 23.583 10.5439C25.7491 14.9553 32.0902 18.0898 38.5478 18.0898C40.1459 18.0898 41.6857 17.8975 43.1321 17.5412C43.1462 17.1602 43.1691 16.7845 43.1691 16.3982C43.1691 8.49601 37.0432 2.0896 29.485 2.0896V2.09136Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.01269 57.1684L2.01257 43.6307C1.81326 40.9266 4.00752 38.3637 6.8897 37.9351L20.1964 36.106L28.6472 56.5846C28.9276 57.3378 30.0741 57.3378 30.3546 56.5846L38.8053 36.106L52.1103 37.9351C54.9925 38.3637 57.1867 40.9266 56.9874 43.6307L55.9873 57.1684H3.01269Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.0863 20.3987C15.9152 19.1075 15.8252 17.7687 15.8252 16.3947H15.8164C15.8164 8.49247 21.9424 2.08606 29.5006 2.08606C37.0588 2.08606 43.1848 8.49247 43.1848 16.3947C43.1848 17.7705 43.0948 19.1093 42.9237 20.4004H42.9149C42.6962 22.2666 41.2868 23.5772 39.5106 23.5772C39.3272 23.5772 39.149 23.5525 38.9744 23.5225C37.4804 29.5955 33.8062 33.8976 29.5024 33.8976C25.1985 33.8976 21.5243 29.5955 20.0303 23.5225C19.8539 23.5507 19.6775 23.5772 19.4941 23.5772C17.7179 23.5772 16.3085 22.2666 16.0898 20.3987H16.0863Z" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M43.1534 17.5342C41.7053 17.8905 40.1619 18.0845 38.562 18.0845C32.1027 18.0845 25.758 14.9466 23.5938 10.5333" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M29.5 37.9122V45.6433" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.01269 57.1686L2.01257 43.6308C1.81326 40.9268 4.00752 38.3638 6.8897 37.9352L20.1964 36.1061L28.6472 56.5847C28.9276 57.3379 30.0741 57.3379 30.3546 56.5847L38.8053 36.1061L52.1103 37.9352C54.9925 38.3638 57.1867 40.9268 56.9874 43.6308L55.9873 57.1686" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M39.6523 52.5793H48.8333" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M44.2422 57.1688V47.9878" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
      title: "Access to US-Licensed Physicians",
    },
    {
      icon: (
        <svg width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.2409 16.8369V23.193C37.4493 23.193 43.2936 29.0373 43.2936 36.2457C43.2936 43.4541 37.4493 49.2984 30.2409 49.2984H15.1083C11.2437 49.2984 8.10938 52.4327 8.10938 56.2973L45.4827 56.29C49.9155 51.9373 52.6911 45.8034 52.6911 39.2889C52.6911 26.8901 42.6397 16.8369 30.239 16.8369H30.2409Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M8.10938 56.2959C8.10938 52.4312 11.2419 49.2969 15.1083 49.2969H30.2409C37.4493 49.2969 43.2936 43.4526 43.2936 36.2442C43.2936 29.0358 37.4493 23.1915 30.2409 23.1915V16.8354C42.6416 16.8354 52.6929 26.8868 52.6929 39.2875C52.6929 45.8038 49.9173 51.9359 45.4845 56.2886" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.10938 44.5323H24.6096" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1.27344 60.5428H57.999" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M40.9311 3.21119L21.0398 23.1025C20.3641 23.7782 20.3641 24.8737 21.0398 25.5493L29.3255 33.835C30.0012 34.5107 31.0967 34.5107 31.7723 33.835L51.6637 13.9437C52.3393 13.268 52.3393 12.1726 51.6637 11.4969L43.378 3.21119C42.7023 2.53552 41.6068 2.53552 40.9311 3.21119Z" fill="white" stroke="#FD7823" strokeWidth="2.5" strokeLinejoin="round"/>
<path d="M48.6562 2.16882L52.7085 6.21922" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20 30.8274L24.0504 34.8796" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M44.8089 24.9707C45.1139 23.079 43.8277 21.2982 41.9361 20.9932C40.0444 20.6882 38.2636 21.9744 37.9586 23.8661C37.6535 25.7578 38.9398 27.5385 40.8314 27.8436C42.7231 28.1486 44.5039 26.8624 44.8089 24.9707Z" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M44.8089 24.9707C45.1139 23.079 43.8277 21.2982 41.9361 20.9932C40.0444 20.6882 38.2636 21.9744 37.9586 23.8661C37.6535 25.7578 38.9398 27.5385 40.8314 27.8436C42.7231 28.1486 44.5039 26.8624 44.8089 24.9707Z" fill="white" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
      title: "Highest Quality, Lab-Tested GLP-1 Medications",
    },
    {
      icon: (
        <svg width="62" height="58" viewBox="0 0 62 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.0352 45.417V51.1952" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M33.0354 16.5262C34.0992 16.5262 34.9615 15.6639 34.9615 14.6001C34.9615 13.5364 34.0992 12.6741 33.0354 12.6741C31.9717 12.6741 31.1094 13.5364 31.1094 14.6001C31.1094 15.6639 31.9717 16.5262 33.0354 16.5262Z" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M38.8109 8.82202L34.3906 13.2423" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M33.035 27.1193C39.9492 27.1193 45.5543 21.5142 45.5543 14.5999C45.5543 7.68568 39.9492 2.08057 33.035 2.08057C26.1207 2.08057 20.5156 7.68568 20.5156 14.5999C20.5156 21.5142 26.1207 27.1193 33.035 27.1193Z" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M33.0352 2.08057V4.96965" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M33.0352 24.2302V27.1193" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M45.5571 14.6001H42.668" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M23.4047 14.6001H20.5156" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.91834 29.0454L7.6487 27.0904L6.12712 16.1793C5.68413 13.0302 7.87981 10.1315 11.0385 9.67889C12.9357 9.40925 15.2085 9.11071 17.7123 8.84106" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M48.3562 8.83789C50.8601 9.10754 53.1328 9.40607 55.03 9.67572C58.1887 10.1283 60.3844 13.0271 59.9415 16.1762L55.0974 51.0281C54.664 54.1483 51.8038 56.3441 48.6644 55.9685C44.8411 55.5062 39.3423 55.0247 33.0344 55.0247C26.7266 55.0247 21.2277 55.5062 17.4045 55.9685C14.265 56.3441 11.4048 54.1483 10.9715 51.0281L10.1914 45.4137" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.21875 30.0087C2.21875 31.6041 3.51242 32.8978 5.10783 32.8978H41.7029C42.2342 32.8978 42.6659 33.3295 42.6659 33.8608V40.602C42.6659 41.1332 42.2342 41.565 41.7029 41.565H5.10783C3.51242 41.565 2.21875 40.2713 2.21875 38.6759V30.0087Z" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.21875 30.0086C2.21875 28.9878 2.74842 28.0922 3.54773 27.5721" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.99609 32.8975V34.8235" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.7734 32.8975V36.7496" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.5547 32.8976V34.8236" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M25.332 32.8975V36.7496" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M36.8867 32.8976V36.7497" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M31.1094 32.8975V34.8235" stroke="#FD7823" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


      ),
      title: "Personalized Treatment Plans",
    }
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildren}
      className="py-8 md:py-24 px-4 bg-white z-50  rounded-b-[100px]"
    >
      <div className="max-w-[1400px] mx-auto  flex items-center justify-center flex-col">
        {/* Section Title */}
        <motion.h2 
          variants={fadeIn}
          className="text-4xl md:text-5xl font-medium md:text-center max-w-full md:max-w-[50%] text-start mb-16 text-zinc-800"
        >
          Why Thousands Trust Us with
          Their Weight Loss Goals
        </motion.h2>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex items-center md:justify-center justify-start gap-6"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-1 md:max-w-[45%] max-w-full">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TrustSection;