import React, { useState } from 'react';

const PrescriptionQuestion = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState("");

  const handleTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };

  const handleClick = () => {
    if (activeTab === "yes") {
      onNext({}, "uploadPrescription");
    } else {
      onNext({}, "goalSelection");
    }
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl mb-6 text-primary">
          Do you have a prescription?
        </h2>

        <div
          onClick={handleTab}
          id="yes"
          className={`bg-white cursor-pointer border rounded-xl p-3 text-lg mt-3 ${activeTab === "yes" ? "border-primary border-2" : ""}`}
        >
          Yes
        </div>
        <div
          onClick={handleTab}
          id="no"
          className={`bg-white cursor-pointer border rounded-xl p-3 text-lg mt-3 ${activeTab === "no" ? "border-primary border-2" : ""}`}
        >
          No
        </div>

        <button
          type="button"
          className={`mt-6 p-3 text-white w-full font-semibold rounded-full bg-primary hover:bg-primary/90 ${activeTab ? "" : "opacity-50 cursor-not-allowed"}`}
          onClick={handleClick}
          disabled={!activeTab}
          aria-label='Continue'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PrescriptionQuestion;
