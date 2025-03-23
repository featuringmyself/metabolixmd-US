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
    // Calculate potential weight loss (approximately 15-20%)
    setWeightLoss(Math.round(weight * 0.2));
  };

  // Background pattern image path
  const backgroundPattern = "/images/weightloss_calculator.png";

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between max-w-6xl w-full mb-8 md:mb-16">
        {/* Weight Loss Calculator Card */}
        <motion.div
          variants={fadeIn}
          className="bg-[#365D56] text-white overflow-hidden shadow-lg w-full md:w-[450px] lg:w-[500px] z-10 md:hidden flex-col flex md:mt-0 mt-12"
        >
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 leading-tight">
              Lose 15-20% Body
              <br />
              Fat in a Year!
            </h2>

            <div className="my-12">
              <div className="flex items-start justify-between">
                <span className="text-xs md:text-lg opacity-80 font-light w-[40%]">
                  Select your Current Weight
                </span>
                <div className="flex items-end">
                  <span className="text-6xl md:text-7xl font-light">
                    {currentWeight}
                  </span>
                  <span className="text-xl opacity-80 ml-2">lbs</span>
                </div>
              </div>
              <div className="relative mt-4">
                {/* Background track */}
                <div className="w-full h-2 bg-white/20 rounded-full"></div>
                {/* Filled track */}
                <div
                  className="absolute left-0 top-0 h-2 bg-white/60 rounded-full"
                  style={{ width: `${((currentWeight - 100) / 300) * 100}%` }}
                ></div>
                {/* Slider thumb with glow effect */}
                <div
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md shadow-white/30 border-2 border-white/80"
                  style={{ left: `${((currentWeight - 100) / 300) * 100}%` }}
                ></div>
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

            <div className="mb-8">
              <div className="flex items-start justify-between">
                <span className="text-xs md:text-lg opacity-80 font-light w-[40%]">
                  Weight you could lose
                </span>
                <div className="flex items-end">
                  <span className="text-7xl md:text-8xl font-">
                    {weightLoss}
                  </span>
                  <span className="text-xl opacity-80 ml-2">lbs</span>
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
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full min-h-screen flex flex-col md:rounded-3xl md:mt-12 mt-0"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[90%] mx-auto px-4 md:px-6 flex flex-col justify-between py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between max-w-6xl w-full mb-8 md:mb-16">
            {/* Weight Loss Calculator Card */}
            <motion.div
              variants={fadeIn}
              className="bg-[#365D56] md:flex flex-col hidden text-white rounded-3xl overflow-hidden shadow-lg w-full md:w-[450px] lg:w-[500px] z-10"
            >
              <div className="p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 leading-tight">
                  Lose 15-20% Body
                  <br />
                  Fat in a Year!
                </h2>

                <div className="my-12">
                  <div className="flex items-start justify-between">
                    <span className="text-xs md:text-lg opacity-80 font-light w-[40%]">
                      Select your Current Weight
                    </span>
                    <div className="flex items-end">
                      <span className="text-6xl md:text-7xl font-light">
                        {currentWeight}
                      </span>
                      <span className="text-xl opacity-80 ml-2">lbs</span>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    {/* Background track */}
                    <div className="w-full h-2 bg-white/20 rounded-full"></div>
                    {/* Filled track */}
                    <div
                      className="absolute left-0 top-0 h-2 bg-white/60 rounded-full"
                      style={{
                        width: `${((currentWeight - 100) / 300) * 100}%`,
                      }}
                    ></div>
                    {/* Slider thumb with glow effect */}
                    <div
                      className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md shadow-white/30 border-2 border-white/80"
                      style={{
                        left: `${((currentWeight - 100) / 300) * 100}%`,
                      }}
                    ></div>
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

                <div className="mb-8">
                  <div className="flex items-start justify-between">
                    <span className="text-xs md:text-lg opacity-80 font-light w-[40%]">
                      Weight you could lose
                    </span>
                    <div className="flex items-end">
                      <span className="text-7xl md:text-8xl font-">
                        {weightLoss}
                      </span>
                      <span className="text-xl opacity-80 ml-2">lbs</span>
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

          {/* Lab Tested & Certified Card - Positioned at the bottom */}
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col justify-center items-center md:w-[50%] w-full md:ml-auto z-10"
          >
            <div className="flex flex-row items-center p-6 md:p-8 md:pb-8">
              {/* Doctor Image */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                <Image
                  src="/images/lab-test.jpeg"
                  alt="Lab Doctor"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Check Icon - Now positioned in the middle */}
              <div className="mx-4 md:mx-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#365D56] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="67"
                    height="51"
                    viewBox="0 0 67 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-3"
                  >
                    <path
                      d="M58.7897 2.52636C68.3993 8.20541 69.5352 21.4242 62.3982 29.5769C58.5987 33.9176 45.371 47.5965 40.9419 49.446C34.3708 52.1904 27.4135 51.2541 21.7824 46.9986L22.0242 46.6786C31.379 48.6093 37.6744 42.7272 43.7086 36.9048C47.2663 33.4725 58.3826 22.7856 59.267 18.851C60.6093 12.8789 54.6508 6.82486 48.6207 7.54937C42.5905 8.27388 31.999 23.0276 26.6186 27.0387C24.9829 28.2585 23.4874 28.6669 21.5824 27.5881C21.0157 27.2672 14.6356 21.1041 14.1382 20.421C10.9668 16.0668 15.8917 11.6226 20.2434 14.8733C21.3559 15.7045 22.9191 18.3932 24.4073 17.6973C33.3276 9.72211 39.9599 -3.05795 54.3082 0.664126C55.686 1.0216 57.5676 1.80344 58.7889 2.52556L58.7897 2.52636Z"
                      fill="white"
                    />
                    <path
                      d="M29.7699 4.75477C30.2584 5.19186 31.3492 5.88931 31.0549 6.5971C30.7582 7.31126 26.5815 10.484 26.0188 11.5086L25.5584 11.3813C18.5439 2.49684 4.02234 11.8295 9.75342 21.7274C10.8023 23.5387 18.548 31.1923 20.382 32.2376C24.3451 34.4979 27.7553 33.2328 31.0638 30.705C34.5327 28.0546 46.0473 14.5524 48.3764 13.9879C51.7413 13.1726 54.9047 16.1384 53.3577 19.5037C52.512 21.3437 39.5536 33.7726 37.1786 35.8721C30.9541 41.3752 22.9996 43.0066 15.4732 38.7105C13.4199 37.5385 5.3364 29.8475 3.73857 27.7855C-9.13279 11.1822 14.1197 -9.23865 29.7699 4.75477Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="">
                <h3 className="text-lg md:text-xl font-medium text-zinc-800 mb-2">
                  Lab tested & Certified
                </h3>
                <p className="text-zinc-600 text-xs md:text-sm">
                  Filled the shipped same day as your appointment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default WeightLossCalculatorSection;
