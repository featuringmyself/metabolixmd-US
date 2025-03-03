import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GLP1Section = () => {
  return (
    <section className="mt-20 pt-10 bg-[#365D56] w-full rounded-xl text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-10">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl font-medium mb-4">
            Understanding<br />GLP-1 Drugs
          </h2>
          <p className="text-lg opacity-80">
            GLP-1 receptor agonists are revolutionizing how we approach weight loss.
            Discover how these medications work to support your health goals.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white text-black rounded-3xl overflow-hidden">
          {/* How GLP-1 Drugs Work Section */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-medium text-[#365D56] mb-4">How GLP-1 Drugs Work</h3>
                <p className="text-gray-700 mb-4">
                  GLP-1 drugs mimic a naturally occurring hormone that regulates blood sugar, slows gastric emptying, reduces hunger, and helps control food intake. These medications work by targeting receptors in your brain that control appetite and food intake, helping you feel fuller longer.
                </p>
                <Link 
                  href="/get-started" 
                  className="inline-block bg-[#365D56] text-white px-6 py-2 rounded-full hover:bg-[#2e4f49] transition-colors"
                >
                  Start your free trial
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="relative w-[200px] h-[200px]">
                  <Image 
                    src="/images/medicine.webp" 
                    alt="GLP-1 Medication" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Methods Section */}
          <div className="bg-gray-50 p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-medium text-[#365D56] mb-6">GLP-1 Delivery Methods</h3>
            <p className="text-gray-700 mb-6">
              GLP-1 medications are typically administered through injections. These treatments are typically injected once weekly. There are two main delivery options available to suit your preferences and lifestyle.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vial & Syringe Option */}
              <div className="bg-orange-100 rounded-2xl p-6">
                <h4 className="text-xl font-medium text-[#365D56] mb-2">Vial & Syringe</h4>
                <p className="text-gray-700 mb-4">
                  A traditional option where medication is drawn from a vial into a syringe for injection. This method offers flexibility in dosing.
                </p>
                <div className="flex justify-center">
                  <div className="relative w-[150px] h-[150px]">
                    <Image 
                      src="/images/41.webp" 
                      alt="Vial and Syringe" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>
                <Link 
                  href="/get-started" 
                  className="text-sm text-[#365D56] font-medium underline block text-center mt-4"
                >
                  Learn more about this option
                </Link>
              </div>
              
              {/* Auto-Injectors Option */}
              <div className="bg-blue-100 rounded-2xl p-6">
                <h4 className="text-xl font-medium text-[#365D56] mb-2">Auto-Injectors</h4>
                <p className="text-gray-700 mb-4">
                  Pre-filled pens with fixed doses that are easier to use and more convenient for those new to self-injection.
                </p>
                <div className="flex justify-center">
                  <div className="relative w-[150px] h-[150px]">
                    <Image 
                      src="/images/medicine-2.webp" 
                      alt="Auto-Injector Pen" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>
                <Link 
                  href="/get-started" 
                  className="text-sm text-[#365D56] font-medium underline block text-center mt-4"
                >
                  Learn more about this option
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GLP1Section;