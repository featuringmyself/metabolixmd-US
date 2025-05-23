import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GLP1Section = () => {
  return (
    <section className="-mt-40 pt-32 pb-12 bg-[#365D56] max-w-screen text-white shadow-lg relative z-10 md:rounded-b-[75px] rounded-b-[50px]">
      <div className="md:max-w-[90%] max-w-full mx-auto px-5 md:px-10 py-16 md:py-32">
        {/* Header Section */}
        <div className="mb-16 md:mb-36 flex md:items-center md:flex-row flex-col md:justify-between gap-6">
          <h2 className="text-4xl md:text-7xl font-medium mb-4 leading-tight tracking-tight">
            Understanding<br />GLP-1 Drugs
          </h2>
          <p className="text-md md:w-[50%] md:leading-relaxed leading-normal">
            GLP-1 receptor agonists are transforming the way we approach weight management. These medications mimic a natural hormone in your body to regulate blood sugar, slow digestion, and reduce appetite. The result? Effective weight loss, improved metabolism, and even cardiovascular benefits. 
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white text-black rounded-3xl shadow-lg md:py-10 py-0 relative">
          {/* How GLP-1 Drugs Work Section */}
          <div className="p-8 md:p-16 lg:p-24">
            <div className="relative flex flex-col-reverse md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/2 w-full flex flex-col md:text-start text-center md:items-start md:justify-start items-center justify-center md:mt-0 mt-16">
                <h3 className="text-4xl md:text-5xl font-medium text-zinc-800 mb-6 md:w-[70%] md:mt-0 mt-52 w-full tracking-tight">
                  How GLP-1 Drugs Work
                </h3>
                <p className="text-[#626262] mb-8 w-full md:w-[80%] leading-relaxed">
                  GLP-1 drugs help regulate blood sugar, slow digestion, and curb appetite. They trigger insulin production when needed, reduce the hormone that raises blood sugar, and keep food in the stomach longer, leading to increased fullness and lower calorie intake.
                </p>
                
                <a 
                  href="/get-started" 
                  className="inline-block bg-[#365D56] text-white px-8 py-4 rounded-full relative z-50"
                  style={{ position: 'relative' }}
                >
                  Start your Journey
                </a>
              </div>
              <div className="absolute md:top-[-68%] md:right-64 top-[-22%] right-[50%] w-full h-[32rem] md:h-[45rem] md:w-full translate-x-1/2 -translate-y-[5%] z-[150]">
                <Image 
                  src="/images/tirzepatide-injection.png" 
                  alt="GLP-1 Drugs" 
                  fill 
                  className="object-contain object-center md:scale-95 scale-125 drop-shadow-lg"
                />
                </div>
            </div>
          </div>

          {/* Delivery Methods Section */}
          <div className=" relative  p-8 md:p-0 text-start flex flex-col justify-center items-center md:mt-10 mt-0">
            <h3 className="text-3xl md:text-5xl font-medium text-zinc-800 mb-6 leading-tight">
              GLP-1 Delivery Methods
            </h3>
            <p className="text-[#626262] mb-28 w-[95%] md:w-[70%] md:text-center text-start leading-relaxed hidden md:block">
              GLP-1 medications come in different forms, but they all work toward the same goal - supporting weight management and metabolic health. These treatments are typically delivered through vials with syringes or auto-injectors and can be self-administered. Each method ensures effective absorption, allowing the medication to work efficiently in your body. During your consultation with one of our healthcare professionals, we will help determine the best option for you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full md:max-w-4xl mx-auto">
              {/* Vial & Syringe Option */}
              <div className="relative bg-[#F98F4C] rounded-3xl shadow-lg max-h-[20rem] md:min-h-[45vh] min-h-[75vw]">
                <div className="absolute md:right-6 -right-8 md:-top-12 -top-28 w-[10rem] -rotate-40 h-[150%] md:w-[10rem] md:h-full transform translate-x-[15%] -translate-y-[15%] z-[99]">
                  <Image 
                    src="/images/41.png" 
                    alt="Vial and Syringe"
                    fill
                    className="object-contain drop-shadow-lg md:scale-[2] scale-90  "
                  />
                </div>
                <div className="md:p-16 md:pb-8 p-8 pt-6 pb-8 flex flex-col h-full justify-end items-start text-start">
                  <div className="mt-auto ">
                    <h4 className="md:text-3xl text-2xl tracking-tight font-medium text-black drop-shadow-sm max-w-[80%]">Vial & Syringe</h4>
                    <p className="text-black/90 text-md w-full  md:my-3 my-4 font-light text-md opacity-70">
                      A more traditional method, requiring manual dosage preparation before injection.
                    </p>
                  </div>
                  <div className="text-center">
                    <Link 
                      href="/safety-information"
                      className="inline-block text-sm md:px-2 md:py-2 py-0 text-black font-medium underline underline-offset-2"
                    >
                      Important Safety Information
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Auto-Injectors Option */}
              <div className="relative bg-[#365D56] rounded-3xl shadow-lg max-h-[20rem] md:min-h-[45vh] min-h-[75vw]">
                <div className="absolute md:top-[-10%] md:right-0 -top-36 -right-14 w-[60vw] h-[150%] md:w-[16rem] md:h-[16rem] rotate-[20deg]">
                  <Image 
                    src="/images/42-inverted.webp" 
                    alt="Auto-Injector Pen" 
                    fill 
                    className="object-contain drop-shadow-lg scale-75 md:scale-125"
                  />
                </div>
                <div className="md:p-16 md:pb-8 p-8 pt-6 pb-8 flex flex-col h-full justify-end items-start text-start">
                  <div className="mt-auto md:max-w-[80%] max-w-full">
                    <h4 className="md:text-3xl text-2xl font-medium text-white drop-shadow-sm">Auto-injectors</h4>
                    <p className="text-white/90 text-sm md:max-w-full w-full leading-relaxed md:my-3 my-4 opacity-70">
                      Designed for quick and seamless administration, often with a single-use format.
                    </p>
                  </div>
                  <div className="text-center">
                    <Link 
                      href="/safety-information"
                      className="inline-block text-sm md:px-2 px-0 md:py-2 py-0 text-white font-medium underline underline-offset-2"
                    >
                      Important Safety Information
                    </Link>
                  </div>
                </div>
              </div>
              <p className="text-[#626262] mb-12 w-[95%] md:w-[80%] md:text-center text-start leading-relaxed block md:hidden">
                GLP-1 medications come in different forms, but they all work toward the same goal - supporting weight management and metabolic health. These treatments are typically delivered through vials with syringes or auto-injectors and can be self-administered. Each method ensures effective absorption, allowing the medication to work efficiently in your body. During your consultation with one of our healthcare professionals, we will help determine the best option for you.
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default GLP1Section;