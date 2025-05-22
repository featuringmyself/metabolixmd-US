import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const WeightLossCalculatorSection = () => {
  const [currentWeight, setCurrentWeight] = useState(252);
  const [weightLoss, setWeightLoss] = useState(50);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleWeightChange = (e) => {
    const weight = parseInt(e.target.value);
    setCurrentWeight(weight);
    setWeightLoss(Math.round(weight * 0.2));
  };

  return (
    <section className="mt-3  relative w-full min-h-screen bg-white overflow-visible flex items-center ">
      <div className="container mx-auto max-w-full px-0 md:px-0 py-0 md:py-0" 
      >
        {/* Mobile Calculator Card */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-[#365D56] flex flex-col md:hidden text-white overflow-hidden shadow-lg z-30 absolute top-0 mt-20 mx-4 rounded-3xl"
        >
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-3xl lg:text-4xl md:font-light font-medium leading-tight">
              Lose 15-20% Body
              <br />
              Fat in a Year!
            </h2>

            <div className="my-6">
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-xl font-extralight w-[40%]">
                  Select your Current Weight
                </span>
                <div className="flex items-end">
                  <span className="text-7xl md:text-7xl font-light">
                    {currentWeight}
                  </span>
                  <span className="text-xl  ml-2 align-top">
                    lbs
                  </span>
                </div>
              </div>
              <div className="relative  my-8">
                {/* Background track */}
                <div className="w-full h-1 bg-white/20 rounded-full"></div>
                {/* Filled track */}
                <div
                  className="absolute left-0 top-0 h-1 bg-white rounded-full"
                  style={{
                    width: `${((currentWeight - 100) / 300) * 100}%`,
                  }}
                ></div>
                {/* Slider thumb */}
                <div
                  className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white"
                  style={{
                    left: `${((currentWeight - 100) / 300) * 100}%`,
                    boxShadow: "0px 0.5px 4px 0px #0000001F",
                  }}
                >
                  <div
                    className="w-full h-full bg-[#365D56] rounded-full"
                    style={{ boxShadow: "0px 6px 13px 0px #0000001F" }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={currentWeight}
                  onChange={handleWeightChange}
                  className="absolute inset-0 w-full h-6 opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>

            <div className="mb-8 relative">
              <div className="flex items-start justify-between mr-10">
                <span className="text-xl md:text-xl  font-extralight w-[40%]">
                  Weight you could lose (lbs):
                </span>
                <div className="flex items-end">
                  <span className="text-8xl md:text-8xl ">
                    {weightLoss}
                  </span>
                  <span className="absolute top-0 right-0 text-xl ml-2 align-top">
                    lbs
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/get-started"
              className="inline-block bg-transparent text-white border px-6 py-3 rounded-full hover:bg-white hover:text-[#365D56] transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium w-full text-center md:w-auto"
            >
              Start your journey
            </Link>
          </div>
        </motion.div>

        {/* Background Section with Desktop Calculator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full min-h-[150vh] -mt-20"
        >
          <div className="absolute inset-0 overflow-hidden ">
            {/* Desktop background image */}
            <Image
              src="/images/weightloss_calculator.png"
              alt="Weight Loss Background Desktop"
              fill
              className="object-cover hidden md:block"
              priority
            />
            {/* Mobile background image */}
            <Image
              src="/images/weightloss_calculator_mobile.png"
              alt="Weight Loss Background Mobile"
              fill
              className="object-cover block md:hidden"
              priority
            />
            {/* Mobile top gradient overlay */}
            <div className="block md:hidden absolute top-0 left-0 w-full h-96 pointer-events-none" style={{background: 'linear-gradient(180deg, #214E46 28.02%, rgba(97, 126, 122, 0) 100%)'}}></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content container - ensuring content is above background */}
          <div className="relative z-20 min-h-screen flex items-center">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
              <div className="flex flex-col items-start justify-center min-h-[500px]">
                {/* Desktop Calculator Card */}
                <motion.div
                  variants={fadeIn}
                  className="bg-[#365D56] hidden md:flex flex-col text-white rounded-3xl overflow-hidden shadow-lg w-full md:w-[50%] lg:w-[40%]"
                >
                  <div className="p-6 md:p-8 lg:p-10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl md:font-light font-bold mb-6 leading-tight">
                      Lose 15-20% Body
                      <br />
                      Fat in a Year!
                    </h2>

                  <div className="my-12">
                    <div className="flex items-start justify-between">
                      <span className="text-xl md:text-xl font-extralight w-[40%]">
                        Select your Current Weight
                      </span>
                      <div className="flex items-end">
                        <span className="text-6xl md:text-7xl font-light">
                          {currentWeight}
                        </span>
                        <span className="text-xl  ml-2 align-top">
                          lbs
                        </span>
                      </div>
                    </div>
                    <div className="relative mt-4">
                      {/* Background track */}
                      <div className="w-full h-1 bg-white/20 rounded-full"></div>
                      {/* Filled track */}
                      <div
                        className="absolute left-0 top-0 h-1 bg-white rounded-full"
                        style={{
                          width: `${((currentWeight - 100) / 300) * 100}%`,
                        }}
                        ></div>
                      {/* Slider thumb */}
                      <div
                        className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white"
                        style={{
                          left: `${((currentWeight - 100) / 300) * 100}%`,
                          boxShadow: "0px 0.5px 4px 0px #0000001F",
                        }}
                        >
                        <div
                          className="w-full h-full bg-[#365D56] rounded-full"
                          style={{ boxShadow: "0px 6px 13px 0px #0000001F" }}
                          ></div>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="400"
                        value={currentWeight}
                        onChange={handleWeightChange}
                        className="absolute inset-0 w-full h-6 opacity-0 cursor-pointer z-10"
                        />
                    </div>
                  </div>

                  <div className="mb-8 relative">
                    <div className="flex items-start justify-between mr-10">
                      <span className="text-xs md:text-xl  font-extralight w-[40%]">
                        Weight you could lose (lbs)
                      </span>
                      <div className="flex items-end">
                        <span className="text-7xl md:text-8xl ">
                          {weightLoss}
                        </span>
                        <span className="absolute top-0 right-0 text-xl ml-2 align-top">
                          lbs
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/get-started"
                    className="inline-block bg-transparent text-white border px-6 py-3 rounded-full hover:bg-white hover:text-[#365D56] transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium w-full text-center md:w-auto"
                    >
                    Start your journey
                  </Link>
                </div>
              </motion.div>

                    </div>
            </div>
          </div>
         {/* Lab Testing & Certification Section */}
          {/* Lab Testing & Certification Section */}
          <div className="relative bg-white rounded-3xl shadow-lg hidden md:flex overflow-hidden mx-40">
            {/* Centered Seal */}
            <div className="absolute inset-0 z-20 pointer-events-none mt-10">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src="/images/metabolixmd-seal.svg" 
                  alt="Certification Seal" 
                  width={120} 
                  height={120}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                />
              </div>
            </div>
            
            <div className="flex md:flex-row flex-col items-stretch justify-between w-full">
              {/* Image Section */}
              <div className="relative md:w-[50%] w-full">
                <Image 
                  src="/images/lab-test.jpg" 
                  alt="Lab Testing Professional" 
                  fill 
                  className="object-cover object-top  rounded"
                  priority
                />
              </div>
              
              {/* Content Section */}
              <div className="md:w-1/2 w-full  p-8 md:pl-20 md:p-16 flex flex-col items-start justify-center bg-white relative">
                <h3 className="text-4xl md:text-3xl font-medium text-[#2E2E2E] mb-4">
                  Lab tested & Certified
                </h3>
                <p className="text-[#626262] text-xl leading-relaxed">
                  Filled and shipped same day as your appointment
                </p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Mobile Lab Tested Card */}
        <motion.div
          variants={fadeIn}
          className="bg-[#F6F6F3] relative md:hidden rounded-3xl overflow-hidden shadow-lg flex flex-col justify-center items-center w-[90%] mx-auto z-20 p-8 -mt-20"
        >
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <svg width="80" height="80" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
          <path d="M44.6901 2.23332C47.0932 0.337306 50.4832 0.337307 52.8864 2.23332C54.695 3.66033 57.1158 4.04374 59.2769 3.24549C62.1483 2.18488 65.3724 3.23245 67.072 5.77827C68.3512 7.69435 70.535 8.80705 72.837 8.71569C75.8957 8.59432 78.6382 10.5869 79.468 13.5333C80.0924 15.7509 81.8255 17.484 84.0431 18.1085C86.9895 18.9382 88.9821 21.6808 88.8607 24.7394C88.7694 27.0414 89.8821 29.2252 91.7982 30.5044C94.344 32.204 95.3916 35.4281 94.331 38.2995C93.5327 40.4606 93.9161 42.8814 95.3431 44.6901C97.2391 47.0932 97.2391 50.4832 95.3431 52.8864C93.9161 54.695 93.5327 57.1158 94.331 59.2769C95.3916 62.1483 94.344 65.3724 91.7982 67.072C89.8821 68.3512 88.7694 70.535 88.8607 72.837C88.9821 75.8957 86.9895 78.6382 84.0431 79.468C81.8255 80.0924 80.0924 81.8255 79.468 84.0431C78.6382 86.9895 75.8957 88.9821 72.837 88.8607C70.535 88.7694 68.3512 89.8821 67.072 91.7982C65.3724 94.344 62.1483 95.3916 59.2769 94.331C57.1158 93.5327 54.695 93.9161 52.8864 95.3431C50.4832 97.2391 47.0932 97.2391 44.6901 95.3431C42.8814 93.9161 40.4606 93.5327 38.2995 94.331C35.4281 95.3916 32.204 94.344 30.5044 91.7982C29.2252 89.8821 27.0414 88.7694 24.7394 88.8607C21.6808 88.9821 18.9382 86.9895 18.1085 84.0431C17.484 81.8255 15.7509 80.0924 13.5333 79.468C10.5869 78.6382 8.59432 75.8957 8.71569 72.837C8.80705 70.535 7.69435 68.3512 5.77827 67.072C3.23244 65.3724 2.18488 62.1483 3.24549 59.2769C4.04374 57.1158 3.66033 54.695 2.23332 52.8864C0.337307 50.4832 0.337306 47.0932 2.23332 44.6901C3.66033 42.8814 4.04374 40.4606 3.24549 38.2995C2.18488 35.4281 3.23245 32.204 5.77827 30.5044C7.69435 29.2252 8.80705 27.0414 8.71569 24.7394C8.59432 21.6808 10.5869 18.9382 13.5333 18.1085C15.7509 17.484 17.484 15.7509 18.1085 13.5333C18.9382 10.5869 21.6808 8.59432 24.7394 8.71569C27.0414 8.80705 29.2252 7.69435 30.5044 5.77827C32.204 3.23244 35.4281 2.18488 38.2995 3.24549C40.4606 4.04374 42.8814 3.66033 44.6901 2.23332Z" fill="#365D56"/>
          <path d="M44.6901 2.23332C47.0932 0.337306 50.4832 0.337307 52.8864 2.23332C54.695 3.66033 57.1158 4.04374 59.2769 3.24549C62.1483 2.18488 65.3724 3.23245 67.072 5.77827C68.3512 7.69435 70.535 8.80705 72.837 8.71569C75.8957 8.59432 78.6382 10.5869 79.468 13.5333C80.0924 15.7509 81.8255 17.484 84.0431 18.1085C86.9895 18.9382 88.9821 21.6808 88.8607 24.7394C88.7694 27.0414 89.8821 29.2252 91.7982 30.5044C94.344 32.204 95.3916 35.4281 94.331 38.2995C93.5327 40.4606 93.9161 42.8814 95.3431 44.6901C97.2391 47.0932 97.2391 50.4832 95.3431 52.8864C93.9161 54.695 93.5327 57.1158 94.331 59.2769C95.3916 62.1483 94.344 65.3724 91.7982 67.072C89.8821 68.3512 88.7694 70.535 88.8607 72.837C88.9821 75.8957 86.9895 78.6382 84.0431 79.468C81.8255 80.0924 80.0924 81.8255 79.468 84.0431C78.6382 86.9895 75.8957 88.9821 72.837 88.8607C70.535 88.7694 68.3512 89.8821 67.072 91.7982C65.3724 94.344 62.1483 95.3916 59.2769 94.331C57.1158 93.5327 54.695 93.9161 52.8864 95.3431C50.4832 97.2391 47.0932 97.2391 44.6901 95.3431C42.8814 93.9161 40.4606 93.5327 38.2995 94.331C35.4281 95.3916 32.204 94.344 30.5044 91.7982C29.2252 89.8821 27.0414 88.7694 24.7394 88.8607C21.6808 88.9821 18.9382 86.9895 18.1085 84.0431C17.484 81.8255 15.7509 80.0924 13.5333 79.468C10.5869 78.6382 8.59432 75.8957 8.71569 72.837C8.80705 70.535 7.69435 68.3512 5.77827 67.072C3.23244 65.3724 2.18488 62.1483 3.24549 59.2769C4.04374 57.1158 3.66033 54.695 2.23332 52.8864C0.337307 50.4832 0.337306 47.0932 2.23332 44.6901C3.66033 42.8814 4.04374 40.4606 3.24549 38.2995C2.18488 35.4281 3.23245 32.204 5.77827 30.5044C7.69435 29.2252 8.80705 27.0414 8.71569 24.7394C8.59432 21.6808 10.5869 18.9382 13.5333 18.1085C15.7509 17.484 17.484 15.7509 18.1085 13.5333C18.9382 10.5869 21.6808 8.59432 24.7394 8.71569C27.0414 8.80705 29.2252 7.69435 30.5044 5.77827C32.204 3.23244 35.4281 2.18488 38.2995 3.24549C40.4606 4.04374 42.8814 3.66033 44.6901 2.23332Z" fill="url(#paint0_linear_33_1391)" fill-opacity="0.2"/>
          <path d="M65.694 36.1889C72.2481 40.0622 73.0228 49.0778 68.1551 54.6382C65.5637 57.5987 56.542 66.9281 53.5213 68.1895C49.0396 70.0613 44.2945 69.4227 40.4539 66.5203L40.6188 66.302C46.9991 67.6188 51.2928 63.6071 55.4083 59.636C57.8347 57.2951 65.4164 50.0063 66.0195 47.3227C66.935 43.2496 62.8712 39.1206 58.7584 39.6147C54.6457 40.1089 47.4219 50.1714 43.7523 52.9071C42.6367 53.7389 41.6168 54.0175 40.3175 53.2817C39.931 53.0629 35.5796 48.8595 35.2404 48.3936C33.0773 45.4238 36.4363 42.3928 39.4043 44.6099C40.163 45.1768 41.2292 47.0105 42.2442 46.5359C48.3281 41.0966 52.8516 32.3802 62.6375 34.9188C63.5772 35.1626 64.8605 35.6958 65.6935 36.1883L65.694 36.1889Z" fill="white"/>
          <path d="M45.9016 37.7087C46.2348 38.0068 46.9787 38.4825 46.7781 38.9652C46.5757 39.4523 43.727 41.6162 43.3432 42.3151L43.0293 42.2282C38.2452 36.1687 28.341 42.5339 32.2498 49.2846C32.9651 50.5199 38.2479 55.7399 39.4988 56.4529C42.2018 57.9945 44.5276 57.1316 46.7841 55.4076C49.15 53.5999 57.0033 44.391 58.5918 44.006C60.8868 43.45 63.0444 45.4727 61.9892 47.768C61.4124 49.0229 52.5744 57.4998 50.9546 58.9317C46.7093 62.685 41.2841 63.7976 36.1509 60.8675C34.7504 60.0682 29.2372 54.8228 28.1475 53.4164C19.3688 42.0924 35.2277 28.1648 45.9016 37.7087Z" fill="white"/>
          <defs>
          <linearGradient id="paint0_linear_33_1391" x1="48.7882" y1="-1" x2="48.7882" y2="98.5764" gradientUnits="userSpaceOnUse">
          <stop stop-opacity="0"/>
          <stop offset="1"/>
          </linearGradient>
          </defs>
            </svg>
            <h3 className="text-3xl px-[2vw] font-semibold text-[#2E2E2E] mb-3 text-center">Lab tested & Certified</h3>
            <p className="text-[#626262] text-base leading-relaxed text-center mt-3 px-[1vw]">Filled and shipped same day as your appointment</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeightLossCalculatorSection;
