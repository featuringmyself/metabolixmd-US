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


  return (
    <div className=" -mt-48 min-h-[150vh]">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between max-w-6xl w-full mb-24 md:mb-32 px-4 md:px-0">
        {/* Weight Loss Calculator Card */}
        <motion.div
          variants={fadeIn}
          className="bg-[#365D56] rounded-3xl text-white overflow-hidden shadow-lg w-full md:max-w-[450px] lg:max-w-[500px] z-10 md:hidden flex-col flex md:mt-0 mt-48"
        >
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-light mb-6">
              Lose 15-20% Body
              <br />
              Fat in a Year!
            </h2>

            <div className="my-12">
              <div className="flex items-start justify-between">
                <span className="text-lg font-light md:text-lg  w-[40%]">
                  Select your Current Weight
                </span>
                <div className="flex items-end">
                  <span className="text-7xl md:text-7xl font-light">
                    {currentWeight}
                  </span>
                  <span className="text-2xl  ml-2 align-top">lbs</span>
                </div>
              </div>
              <div className="relative mt-4">
                {/* Background track */}
                <div className="w-full h-1 bg-white/20 rounded-full"></div>
                {/* Filled track */}
                <div
                  className="absolute left-0 top-0 h-1 bg-white rounded-full"
                  style={{ width: `${((currentWeight - 100) / 300) * 100}%` }}
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
              <div className="flex items-start justify-start">
                <span className="text-lg md:text-lg font-light w-[40%]">
                  Weight you could lose (lbs):
                </span>
                <div className="flex items-end ml-8">
                  <span className="text-8xl md:text-8xl font-extralight">
                    {weightLoss}
                  </span>
                  <span className="text-2xl ml-20 absolute top-0 right-0 font-light">lbs</span>
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
        className="relative w-full min-h-screen flex flex-col md:mt-12 mt-0"
      >
        <div className="relative w-full  h-[150vh]">
          <Image
            src="/images/weightloss_calculator.png"
            alt="Weight Loss Background"
            fill
            className="object-cover w-screen h-[150vh]"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 w-[90%] mx-auto px-0 md:px-6 flex flex-col justify-evenly py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between max-w-6xl w-full mb-8 md:mb-10">
              {/* Weight Loss Calculator Card - Desktop */}
              <motion.div
                variants={fadeIn}
                className="bg-[#365D56] md:flex flex-col hidden text-white rounded-3xl overflow-hidden shadow-lg w-full md:w-[50vw] lg:w-[30vw] z-10"
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

            {/* Lab Tested & Certified Card */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-3xl overflow-hidden shadow-lg md:flex md:flex-row hidden justify-between items-center w-[80%] max-w-full  mx-auto z-10 relative "
            >
              {/* Left: Image */}
              <div className="relative w-1/2 h-40 md:h-56 flex-shrink-0">
                <Image
                  src="/images/lab-test.webp"
                  alt="Lab Doctor"
                  fill
                  className="object-cover object-top rounded-3xl "
                />
              </div>

              {/* Right: Text */}
              <div className="w-1/2 flex flex-col justify-center pl-24 pr-4 py-6">
                <h3 className="text-lg md:text-3xl font-medium text-[#2E2E2E] mb-2">
                  Lab tested & Certified
                </h3>
                <p className="text-[#626262] text-xs md:text-lg">
                  Filled the shipped same day as your appointment
                </p>
              </div>

              {/* Badge: Overlapping both halves */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ width: "90px", height: "90px" }}>
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 142 142"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M64.9913 2.74073C68.5148 -0.0392264 73.4852 -0.0392275 77.0087 2.74073C79.6606 4.83302 83.21 5.39518 86.3786 4.22478C90.5887 2.66971 95.3159 4.20566 97.8079 7.93837C99.6835 10.7477 102.885 12.3792 106.261 12.2453C110.745 12.0673 114.766 14.9888 115.983 19.3089C116.899 22.5604 119.44 25.1014 122.691 26.017C127.011 27.2336 129.933 31.2548 129.755 35.7394C129.621 39.1146 131.252 42.3165 134.062 44.1921C137.794 46.6841 139.33 51.4113 137.775 55.6214C136.605 58.79 137.167 62.3394 139.259 64.9913C142.039 68.5148 142.039 73.4852 139.259 77.0087C137.167 79.6606 136.605 83.21 137.775 86.3786C139.33 90.5888 137.794 95.3159 134.062 97.8079C131.252 99.6835 129.621 102.885 129.755 106.261C129.933 110.745 127.011 114.766 122.691 115.983C119.44 116.899 116.899 119.44 115.983 122.691C114.766 127.011 110.745 129.933 106.261 129.755C102.885 129.621 99.6835 131.252 97.8079 134.062C95.3159 137.794 90.5887 139.33 86.3786 137.775C83.21 136.605 79.6606 137.167 77.0087 139.259C73.4852 142.039 68.5148 142.039 64.9913 139.259C62.3394 137.167 58.79 136.605 55.6214 137.775C51.4113 139.33 46.6841 137.794 44.1921 134.062C42.3165 131.252 39.1146 129.621 35.7394 129.755C31.2548 129.933 27.2336 127.011 26.017 122.691C25.1014 119.44 22.5604 116.899 19.3089 115.983C14.9888 114.766 12.0673 110.745 12.2453 106.261C12.3792 102.885 10.7477 99.6835 7.93837 97.8079C4.20566 95.3159 2.66971 90.5887 4.22478 86.3786C5.39518 83.21 4.83302 79.6606 2.74073 77.0087C-0.039227 73.4852 -0.0392264 68.5148 2.74073 64.9913C4.83302 62.3394 5.39518 58.79 4.22478 55.6214C2.66971 51.4113 4.20565 46.6841 7.93837 44.1921C10.7477 42.3165 12.3792 39.1146 12.2453 35.7394C12.0673 31.2548 14.9888 27.2336 19.3089 26.017C22.5604 25.1014 25.1014 22.5604 26.017 19.3089C27.2336 14.9888 31.2548 12.0673 35.7394 12.2453C39.1146 12.3792 42.3165 10.7477 44.1921 7.93837C46.6841 4.20565 51.4113 2.66971 55.6214 4.22478C58.79 5.39518 62.3394 4.83302 64.9913 2.74073Z"
                    fill="#365D56"
                  />
                  <path
                    d="M64.9913 2.74073C68.5148 -0.0392264 73.4852 -0.0392275 77.0087 2.74073C79.6606 4.83302 83.21 5.39518 86.3786 4.22478C90.5887 2.66971 95.3159 4.20566 97.8079 7.93837C99.6835 10.7477 102.885 12.3792 106.261 12.2453C110.745 12.0673 114.766 14.9888 115.983 19.3089C116.899 22.5604 119.44 25.1014 122.691 26.017C127.011 27.2336 129.933 31.2548 129.755 35.7394C129.621 39.1146 131.252 42.3165 134.062 44.1921C137.794 46.6841 139.33 51.4113 137.775 55.6214C136.605 58.79 137.167 62.3394 139.259 64.9913C142.039 68.5148 142.039 73.4852 139.259 77.0087C137.167 79.6606 136.605 83.21 137.775 86.3786C139.33 90.5888 137.794 95.3159 134.062 97.8079C131.252 99.6835 129.621 102.885 129.755 106.261C129.933 110.745 127.011 114.766 122.691 115.983C119.44 116.899 116.899 119.44 115.983 122.691C114.766 127.011 110.745 129.933 106.261 129.755C102.885 129.621 99.6835 131.252 97.8079 134.062C95.3159 137.794 90.5887 139.33 86.3786 137.775C83.21 136.605 79.6606 137.167 77.0087 139.259C73.4852 142.039 68.5148 142.039 64.9913 139.259C62.3394 137.167 58.79 136.605 55.6214 137.775C51.4113 139.33 46.6841 137.794 44.1921 134.062C42.3165 131.252 39.1146 129.621 35.7394 129.755C31.2548 129.933 27.2336 127.011 26.017 122.691C25.1014 119.44 22.5604 116.899 19.3089 115.983C14.9888 114.766 12.0673 110.745 12.2453 106.261C12.3792 102.885 10.7477 99.6835 7.93837 97.8079C4.20566 95.3159 2.66971 90.5887 4.22478 86.3786C5.39518 83.21 4.83302 79.6606 2.74073 77.0087C-0.039227 73.4852 -0.0392264 68.5148 2.74073 64.9913C4.83302 62.3394 5.39518 58.79 4.22478 55.6214C2.66971 51.4113 4.20565 46.6841 7.93837 44.1921C10.7477 42.3165 12.3792 39.1146 12.2453 35.7394C12.0673 31.2548 14.9888 27.2336 19.3089 26.017C22.5604 25.1014 25.1014 22.5604 26.017 19.3089C27.2336 14.9888 31.2548 12.0673 35.7394 12.2453C39.1146 12.3792 42.3165 10.7477 44.1921 7.93837C46.6841 4.20565 51.4113 2.66971 55.6214 4.22478C58.79 5.39518 62.3394 4.83302 64.9913 2.74073Z"
                    fill="url(#paint0_linear_33_1391)"
                    fill-opacity="0.2"
                  />
                  <path
                    d="M95.7897 52.5264C105.399 58.2054 106.535 71.4242 99.3982 79.5769C95.5987 83.9176 82.371 97.5965 77.9419 99.446C71.3708 102.19 64.4135 101.254 58.7824 96.9986L59.0242 96.6786C68.379 98.6093 74.6744 92.7272 80.7086 86.9048C84.2663 83.4725 95.3826 72.7856 96.267 68.851C97.6093 62.8789 91.6508 56.8249 85.6207 57.5494C79.5905 58.2739 68.999 73.0276 63.6186 77.0387C61.9829 78.2585 60.4874 78.6669 58.5824 77.5881C58.0157 77.2672 51.6356 71.1041 51.1382 70.421C47.9668 66.0668 52.8917 61.6226 57.2434 64.8733C58.3559 65.7045 59.9191 68.3932 61.4073 67.6973C70.3276 59.7221 76.9599 46.942 91.3082 50.6641C92.686 51.0216 94.5676 51.8034 95.7889 52.5256L95.7897 52.5264Z"
                    fill="white"
                  />
                  <path
                    d="M66.7699 54.7548C67.2584 55.1919 68.3492 55.8893 68.0549 56.5971C67.7582 57.3113 63.5815 60.484 63.0188 61.5086L62.5584 61.3813C55.5439 52.4968 41.0223 61.8295 46.7534 71.7274C47.8023 73.5387 55.548 81.1923 57.382 82.2376C61.3451 84.4979 64.7553 83.2328 68.0638 80.705C71.5327 78.0546 83.0473 64.5524 85.3764 63.9879C88.7413 63.1726 91.9047 66.1384 90.3577 69.5037C89.512 71.3437 76.5536 83.7726 74.1786 85.8721C67.9541 91.3752 59.9996 93.0066 52.4732 88.7105C50.4199 87.5385 42.3364 79.8475 40.7386 77.7855C27.8672 61.1822 51.1197 40.7613 66.7699 54.7548Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_33_1391"
                      x1="71"
                      y1="-2"
                      x2="71"
                      y2="144"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-opacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Lab tested & certified card (Mobile card) */}
            <motion.div
              variants={fadeIn}
              className="bg-[#F6F6F3] -bottom-32   absolute rounded-3xl overflow-hidden shadow-lg md:hidden flex-col flex justify-center items-center md:w-[60%] w-full mx-auto z-[99] p-8"
            >
              <svg
                width="97"
                height="97"
                viewBox="0 0 97 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.6901 2.23332C47.0932 0.337306 50.4832 0.337307 52.8864 2.23332C54.695 3.66033 57.1158 4.04374 59.2769 3.24549C62.1483 2.18488 65.3724 3.23245 67.072 5.77827C68.3512 7.69435 70.535 8.80705 72.837 8.71569C75.8957 8.59432 78.6382 10.5869 79.468 13.5333C80.0924 15.7509 81.8255 17.484 84.0431 18.1085C86.9895 18.9382 88.9821 21.6808 88.8607 24.7394C88.7694 27.0414 89.8821 29.2252 91.7982 30.5044C94.344 32.204 95.3916 35.4281 94.331 38.2995C93.5327 40.4606 93.9161 42.8814 95.3431 44.6901C97.2391 47.0932 97.2391 50.4832 95.3431 52.8864C93.9161 54.695 93.5327 57.1158 94.331 59.2769C95.3916 62.1483 94.344 65.3724 91.7982 67.072C89.8821 68.3512 88.7694 70.535 88.8607 72.837C88.9821 75.8957 86.9895 78.6382 84.0431 79.468C81.8255 80.0924 80.0924 81.8255 79.468 84.0431C78.6382 86.9895 75.8957 88.9821 72.837 88.8607C70.535 88.7694 68.3512 89.8821 67.072 91.7982C65.3724 94.344 62.1483 95.3916 59.2769 94.331C57.1158 93.5327 54.695 93.9161 52.8864 95.3431C50.4832 97.2391 47.0932 97.2391 44.6901 95.3431C42.8814 93.9161 40.4606 93.5327 38.2995 94.331C35.4281 95.3916 32.204 94.344 30.5044 91.7982C29.2252 89.8821 27.0414 88.7694 24.7394 88.8607C21.6808 88.9821 18.9382 86.9895 18.1085 84.0431C17.484 81.8255 15.7509 80.0924 13.5333 79.468C10.5869 78.6382 8.59432 75.8957 8.71569 72.837C8.80705 70.535 7.69435 68.3512 5.77827 67.072C3.23244 65.3724 2.18488 62.1483 3.24549 59.2769C4.04374 57.1158 3.66033 54.695 2.23332 52.8864C0.337307 50.4832 0.337306 47.0932 2.23332 44.6901C3.66033 42.8814 4.04374 40.4606 3.24549 38.2995C2.18488 35.4281 3.23245 32.204 5.77827 30.5044C7.69435 29.2252 8.80705 27.0414 8.71569 24.7394C8.59432 21.6808 10.5869 18.9382 13.5333 18.1085C15.7509 17.484 17.484 15.7509 18.1085 13.5333C18.9382 10.5869 21.6808 8.59432 24.7394 8.71569C27.0414 8.80705 29.2252 7.69435 30.5044 5.77827C32.204 3.23244 35.4281 2.18488 38.2995 3.24549C40.4606 4.04374 42.8814 3.66033 44.6901 2.23332Z"
                  fill="#365D56"
                />
                <path
                  d="M44.6901 2.23332C47.0932 0.337306 50.4832 0.337307 52.8864 2.23332C54.695 3.66033 57.1158 4.04374 59.2769 3.24549C62.1483 2.18488 65.3724 3.23245 67.072 5.77827C68.3512 7.69435 70.535 8.80705 72.837 8.71569C75.8957 8.59432 78.6382 10.5869 79.468 13.5333C80.0924 15.7509 81.8255 17.484 84.0431 18.1085C86.9895 18.9382 88.9821 21.6808 88.8607 24.7394C88.7694 27.0414 89.8821 29.2252 91.7982 30.5044C94.344 32.204 95.3916 35.4281 94.331 38.2995C93.5327 40.4606 93.9161 42.8814 95.3431 44.6901C97.2391 47.0932 97.2391 50.4832 95.3431 52.8864C93.9161 54.695 93.5327 57.1158 94.331 59.2769C95.3916 62.1483 94.344 65.3724 91.7982 67.072C89.8821 68.3512 88.7694 70.535 88.8607 72.837C88.9821 75.8957 86.9895 78.6382 84.0431 79.468C81.8255 80.0924 80.0924 81.8255 79.468 84.0431C78.6382 86.9895 75.8957 88.9821 72.837 88.8607C70.535 88.7694 68.3512 89.8821 67.072 91.7982C65.3724 94.344 62.1483 95.3916 59.2769 94.331C57.1158 93.5327 54.695 93.9161 52.8864 95.3431C50.4832 97.2391 47.0932 97.2391 44.6901 95.3431C42.8814 93.9161 40.4606 93.5327 38.2995 94.331C35.4281 95.3916 32.204 94.344 30.5044 91.7982C29.2252 89.8821 27.0414 88.7694 24.7394 88.8607C21.6808 88.9821 18.9382 86.9895 18.1085 84.0431C17.484 81.8255 15.7509 80.0924 13.5333 79.468C10.5869 78.6382 8.59432 75.8957 8.71569 72.837C8.80705 70.535 7.69435 68.3512 5.77827 67.072C3.23244 65.3724 2.18488 62.1483 3.24549 59.2769C4.04374 57.1158 3.66033 54.695 2.23332 52.8864C0.337307 50.4832 0.337306 47.0932 2.23332 44.6901C3.66033 42.8814 4.04374 40.4606 3.24549 38.2995C2.18488 35.4281 3.23245 32.204 5.77827 30.5044C7.69435 29.2252 8.80705 27.0414 8.71569 24.7394C8.59432 21.6808 10.5869 18.9382 13.5333 18.1085C15.7509 17.484 17.484 15.7509 18.1085 13.5333C18.9382 10.5869 21.6808 8.59432 24.7394 8.71569C27.0414 8.80705 29.2252 7.69435 30.5044 5.77827C32.204 3.23244 35.4281 2.18488 38.2995 3.24549C40.4606 4.04374 42.8814 3.66033 44.6901 2.23332Z"
                  fill="url(#paint0_linear_33_1391)"
                  fill-opacity="0.2"
                />
                <path
                  d="M65.694 36.1889C72.2481 40.0622 73.0228 49.0778 68.1551 54.6382C65.5637 57.5987 56.542 66.9281 53.5213 68.1895C49.0396 70.0613 44.2945 69.4227 40.4539 66.5203L40.6188 66.302C46.9991 67.6188 51.2928 63.6071 55.4083 59.636C57.8347 57.2951 65.4164 50.0063 66.0195 47.3227C66.935 43.2496 62.8712 39.1206 58.7584 39.6147C54.6457 40.1089 47.4219 50.1714 43.7523 52.9071C42.6367 53.7389 41.6168 54.0175 40.3175 53.2817C39.931 53.0629 35.5796 48.8595 35.2404 48.3936C33.0773 45.4238 36.4363 42.3928 39.4043 44.6099C40.163 45.1768 41.2292 47.0105 42.2442 46.5359C48.3281 41.0966 52.8516 32.3802 62.6375 34.9188C63.5772 35.1626 64.8605 35.6958 65.6935 36.1883L65.694 36.1889Z"
                  fill="white"
                />
                <path
                  d="M45.9016 37.7087C46.2348 38.0068 46.9787 38.4825 46.7781 38.9652C46.5757 39.4523 43.727 41.6162 43.3432 42.3151L43.0293 42.2282C38.2452 36.1687 28.341 42.5339 32.2498 49.2846C32.9651 50.5199 38.2479 55.7399 39.4988 56.4529C42.2018 57.9945 44.5276 57.1316 46.7841 55.4076C49.15 53.5999 57.0033 44.391 58.5918 44.006C60.8868 43.45 63.0444 45.4727 61.9892 47.768C61.4124 49.0229 52.5744 57.4998 50.9546 58.9317C46.7093 62.685 41.2841 63.7976 36.1509 60.8675C34.7504 60.0682 29.2372 54.8228 28.1475 53.4164C19.3688 42.0924 35.2277 28.1648 45.9016 37.7087Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_33_1391"
                    x1="48.7882"
                    y1="-1"
                    x2="48.7882"
                    y2="98.5764"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-opacity="0" />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg>
              
              <h4 className="max-w-xl text-3xl font-semibold text-center text-[#2E2E2E] my-4">Lab tested & Certified</h4>
              <p className="text-[#626262] text-center max-w-lg font-medium my-2">Filled the shipped same day as your appointment</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WeightLossCalculatorSection;
