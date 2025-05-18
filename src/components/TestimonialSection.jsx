import React, { useState } from "react";

const testimonials = [
  {
    name: "A N",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."',
    beforeImg: "/images/38.webp",
    afterImg: "/images/39.webp", // Use same for demo, replace with real after image
  },
  {
    name: "FZ",
    text: '"I put my trust in Dr. Raj & MetabolixMD and they delivered, quite literally! I would recommend metabolixMD to anyone interested in getting healthier, happier, and improving their quality of life. You cannot put a price on happiness, but metabolixMD makes it more affordable. Take the first step, I promise you it will be worth it. My life has slowly been improving and I have their great team to thank! I’m so excited for what the future holds! You can always start today!"',
    beforeImg: "/images/FZ_testimonial_before.webp",
    afterImg: "/images/FZ_testimonial_after.webp", // Use same for demo, replace with real after image
  },
  
];

function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col md:flex-row items-center justify-between  text-black md:py-44 py-0 pt-54 pb-10 md:pb-40 z-50 md:rounded-[100px] rounded-[35px] mt-5 bg-white relative px-4">
      {/* Mobile Title */}
      <div className="w-full text-center md:hidden mb-8 mt-10">
        <h3 className="text-4xl font-medium leading-tight">
          Real People,
          Real Results
        </h3>
      </div>

      {/* Navigation Controls - Mobile Only */}
      <div className="w-full flex justify-center items-center gap-4 mb-8 md:hidden">
        <button onClick={handlePrev} className="flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black"/>
            <path d="M32 23H19.83L25.42 17.41L24 16L16 24L24 32L25.41 30.59L19.83 25H32V23Z" fill="black"/>
          </svg>
        </button>
        <button onClick={handleNext} className="flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black"/>
            <path d="M24 16L22.59 17.41L28.17 23H16V25H28.17L22.59 30.59L24 32L32 24L24 16Z" fill="black"/>
          </svg>
        </button>
      </div>

      {/* Dots Indicator - Mobile Only */}
      <div className="w-full flex justify-center mb-8 md:hidden">
        <div className="flex items-center">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`mx-1 w-2 h-2 rounded-full ${
                idx === current ? "bg-orange-400" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Desktop Left Content */}
      <div className="hidden md:flex flex-col items-start max-w-[40%] ml-24">
        <h3 className="text-7xl font-medium text-[#2E2E2E] tracking-tighter leading-[-9px] mb-8 max-w-[80%]">
          Real People,
          
          Real Results
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handlePrev} className="flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black"/>
              <path d="M32 23H19.83L25.42 17.41L24 16L16 24L24 32L25.41 30.59L19.83 25H32V23Z" fill="black"/>
            </svg>
          </button>
          <button onClick={handleNext} className="flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black"/>
              <path d="M24 16L22.59 17.41L28.17 23H16V25H28.17L22.59 30.59L24 32L32 24L24 16Z" fill="black"/>
            </svg>
          </button>
          <div className="flex items-center ml-4">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={`mx-1 w-2 h-2 rounded-full ${
                  idx === current ? "bg-orange-400" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
        <p className="text-base mb-8 max-w-[65%] text-[#626262]">
          {testimonial.text}
        </p>
        <span className="font-bold text-lg">{testimonial.name}</span>
      </div>

      {/* Images Section - Responsive */}
      <div className="w-full md:w-auto">
        <div className="flex bg-gray-100 rounded-3xl overflow-hidden md:mr-24 shadow-lg">
          <div className="relative w-1/2">
            <img
              src={testimonial.beforeImg}
              alt="Before"
              className="object-cover md:h-[32vw] h-full md:w-[20vw] w-full"
            />
            <span className="absolute bottom-6 left-6 bg-orange-500 text-black px-6 py-2 rounded-lg text-lg font-semibold">
              Before
            </span>
          </div>
          <div className="relative w-1/2">
            <img
              src={testimonial.afterImg}
              alt="After"
              className="object-cover md:h-[32vw] h-full md:w-[20vw] w-full"
            />
            <span className="absolute bottom-6 left-6 bg-[#3B6252] text-white px-6 py-2 rounded-lg text-lg font-semibold">
              After
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Text Content */}
      <div className="md:hidden w-full px-4 text-center mt-8">
        <p className="text-sm mb-4 text-[#626262]">
          {testimonial.text}
        </p>
        <span className="font-bold text-base">{testimonial.name}</span>
      </div>
    </div>
  );
}

export default TestimonialSection;
