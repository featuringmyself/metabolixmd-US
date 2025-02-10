import React, { useState } from 'react'

const PrimaryCareConfirmation = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState("");

  const handleTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };

  const isButtonDisabled = !activeTab; // Disable button until a choice is made

  const handleNext = () => {
    const data = {
      seen_primary_care_provider: activeTab === "yes" ? true : false
    };
    onNext(data, "heartDisease"); // Replace "heartDiseaseForm" with the next form step
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">
          Have you seen your primary care provider in the past 12 months?
        </h2>
        <p className='text-zinc-500 font-semibold'>
          We want to make sure there is a provider overseeing your overall care.
        </p>

        {/* Yes Option */}
        <div
          onClick={handleTab}
          id="yes"
          className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "yes" ? "border-primary border-2" : ""}`}
        >
          Yes
        </div>

        {/* No Option */}
        <div
          onClick={handleTab}
          id="no"
          className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "no" ? "border-primary border-2" : ""}`}
        >
          No
        </div>

        {/* Continue Button */}
        <button
          type="button"
          className={`mt-6 p-3 hover:bg-primary/90   w-full py-3 text-white font-semibold rounded-full ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
          disabled={isButtonDisabled}
          onClick={handleNext}
          aria-label='Continue'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PrimaryCareConfirmation;
