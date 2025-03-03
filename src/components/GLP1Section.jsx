import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GLP1Section = () => {
  return (
    <section className="mt-20 pt-10 bg-[#365D56] w-full rounded-3xl text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-20">
        {/* Header Section */}
        <div className="mb-20 flex md:items-center md:flex-row flex-col  md:justify-between">
          <h2 className="text-4xl md:text-6xl font-medium mb-4">
            Understanding<br />GLP-1 Drugs
          </h2>
          <p className="text-sm opacity-80 md:w-[40%]">
          GLP-1 receptor agonists are transforming the way we approach weight management. These medications mimic a natural hormone in your body to regulate blood sugar, slow digestion, and reduce appetite. The result? Effective weight loss, improved metabolism, and even cardiovascular benefits. 
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white text-black rounded-3xl overflow-hidden">
          {/* How GLP-1 Drugs Work Section */}
          <div className="p-6 md:p-24 ">
            <div className="flex flex-col-reverse md:flex-row gap-6">
              <div className="md:w-1/2  flex flex-col md:text-start text-center md:items-start md:justify-start items-center justify-center">
                <h3 className="text-4xl md:text-5xl font-medium text-zinc-800 md:mb-4 w-[80%]">How GLP-1 Drugs Work</h3>
                <p className="text-gray-600 mb-7 mt-8 w-[80%]">
                  GLP-1 drugs mimic a naturally occurring hormone that regulates blood sugar, slows gastric emptying, reduces hunger, and helps control food intake. These medications work by targeting receptors in your brain that control appetite and food intake, helping you feel fuller longer.
                </p>
                <Link 
                  href="/get-started" 
                  className="inline-block bg-[#365D56] text-white px-6 py-3 rounded-full hover:bg-[#2e4f49] transition-colors"
                >
                  Start your Journey
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center items-center relative">
                {/* Container with floating effect */}
                <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                  {/* Background glow effect */}
                  <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-teal-50/30 to-emerald-50/30 rounded-full blur-xl"></div>
                  
                  {/* Floating medication image */}
                  <div className="relative w-[350px] h-[350px] bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50 overflow-hidden
                              animate-[float_6s_ease-in-out_infinite] z-10">
                    <Image 
                      src="/images/41.webp" 
                      alt="GLP-1 Medication" 
                      fill 
                      className="object-contain drop-shadow-lg"
                    />
                    
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent
                                animate-[shine_3s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Methods Section */}
          <div className="p-6 md:p-8 text-center flex flex-col justify-center items-center">
            <h3 className="text-2xl md:text-5xl font-medium text-zinc-800 mb-6">GLP-1 Delivery Methods</h3>
            <p className="text-gray-700 mb-[5vw] w-[80%]">
            GLP-1 medications come in different forms, but they all work toward the same goal - supporting weight management and metabolic health. These treatments are typically delivered through vials with syringes or auto-injectors and can be self-administered. Each method ensures effective absorption, allowing the medication to work efficiently in your body. During your consultation with one of our healthcare professionals, we will help determine the best option for you.
            </p>
            
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Vial & Syringe Option */}
              <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[400px] md:min-h-[500px]">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] md:w-[280px] md:h-[280px] transform translate-x-[10%] -translate-y-[5%] group-hover:translate-y-[-8%] transition-transform duration-500">
                  <Image 
                    src="/images/41.webp" 
                    alt="Vial and Syringe" 
                    fill 
                    className="object-contain drop-shadow-lg"
                  />
                </div>
                <div className="p-8 pt-6 pb-8 flex flex-col h-full justify-end items-start text-start">
                  <div className="mt-auto">
                    <h4 className="text-2xl font-semibold text-white mb-4 drop-shadow-sm">Vial & Syringe</h4>
                    <p className="text-white/90 text-sm max-w-[70%] leading-relaxed mb-6">
                    A more traditional method, requiring 
                    manual dosage preparation before injection. This approach allows for precise dosing and is typically more cost-effective for long-term treatment plans.
                    </p>
                  </div>
                  <div className="mt-8 text-center">
                    <Link 
                      href="#" 
                      className="inline-block text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium transition-colors duration-300"
                    >
                      Important safety information
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Auto-Injectors Option */}
              <div className="relative bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[400px] md:min-h-[500px]">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] md:w-[280px] md:h-[280px] transform translate-x-[5%] -translate-y-[5%] group-hover:translate-y-[-8%] transition-transform duration-500">
                  <Image 
                    src="/images/42-inverted.png" 
                    alt="Auto-Injector Pen" 
                    fill 
                    className="object-contain drop-shadow-lg"
                  />
                </div>
                <div className="p-8 pt-6 pb-8 flex flex-col h-full justify-end items-start text-start">
                  <div className="mt-auto">
                    <h4 className="text-2xl font-semibold text-white mb-4 drop-shadow-sm">Auto-injectors</h4>
                    <p className="text-white/90 text-sm max-w-[70%] leading-relaxed mb-6">
                      Designed for quick and seamless administration, often with a single-use format. These pens offer convenience and ease of use, making them ideal for those who prefer a simplified injection process with minimal preparation.
                    </p>
                  </div>
                  <div className="mt-8 text-center">
                    <Link 
                      href="#" 
                      className="inline-block text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium transition-colors duration-300"
                    >
                      Important safety information
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GLP1Section;