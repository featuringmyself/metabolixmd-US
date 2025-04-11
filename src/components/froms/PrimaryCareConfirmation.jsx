import React, { useState } from 'react'

const PrimaryCareConfirmation = ({ onNext, onBack }) => {
  // Initialize state from localStorage if available
  const [activeTab, setActiveTab] = useState(() => {
    const savedChoice = localStorage.getItem('PrimaryCareConfirmation_choice');
    return savedChoice || "";
  });

  const handleTab = (e) => {
    const choice = e.currentTarget.id;
    setActiveTab(choice);
    localStorage.setItem('PrimaryCareConfirmation_choice', choice);
  };

  const isButtonDisabled = !activeTab; // Disable button until a choice is made

  const handleNext = () => {
    const data = {
      seen_primary_care_provider: activeTab === "yes" ? true : false
    };
    
    // Store the complete form data in localStorage
    localStorage.setItem('PrimaryCareConfirmation_data', JSON.stringify(data));
    
    onNext(data, "heartDisease"); // Replace "heartDiseaseForm" with the next form step
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-4xl text-center  mb-12 font-semibold text-zinc-700">
          Have you seen your primary care provider in the past 12 months?
        </h2>
        <p className='text-zinc-500 font-semibold mb-5'>
          We want to make sure there is a provider overseeing your overall care.
        </p>

        <div className='flex justify-center items-center text-center gap-5'>

        {/* Yes Option */}
        <div
          onClick={handleTab}
          id="yes"
          className={`bg-white cursor-pointer border rounded-xl w-1/2 p-3 text-lg font-semibold mt-3 ${activeTab === "yes" ? "border-primary border-2" : ""}`}
        >
          Yes
        </div>

        {/* No Option */}
        <div
          onClick={handleTab}
          id="no"
          className={`bg-white cursor-pointer border w-1/2 rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "no" ? "border-primary border-2" : ""}`}
        >
          No
        </div>

        </div>
        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12">
          <button
            type="button"
            className="flex-1 p-3 border border-primary text-primary hover:bg-primary/10 font-semibold rounded-full"
            onClick={onBack}
            aria-label='Back'
          >
            Back
          </button>
          <button
            type="button"
            className={`flex-1 p-3 hover:bg-primary/90 text-white font-semibold rounded-full ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
            disabled={isButtonDisabled}
            onClick={handleNext}
            aria-label='Continue'
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryCareConfirmation;
