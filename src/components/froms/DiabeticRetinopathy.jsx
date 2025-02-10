import React, { useState } from 'react';

const DiabeticRetinopathy = ({ onNext }) => {
    const [activeTab, setActiveTab] = useState("");

    const handleTab = (e) => {
        setActiveTab(e.currentTarget.id);
    }

    const handleContinue = () => {
        const data = {
            diabetic: activeTab
        };
        onNext(data, "anyDisease2"); // Pass the data and move to the next step
    }

    const isButtonDisabled = !activeTab; // Disable if no tab is selected

    return (
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full md:w-[500px]">
                <h2 className="text-2xl  mb-6 text-primary">
                    Do you currently have or have you ever been diagnosed with diabetic retinopathy?
                </h2>
                <p className='text-zinc-500 font-semibold'>We want to make sure there is a provider overseeing your overall care</p>

                <div onClick={handleTab} id="yes" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "yes" ? "border-primary border-2" : ""}`}>
                    Yes
                </div>
                <div onClick={handleTab} id="no" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "no" ? "border-primary border-2" : ""}`}>
                    No
                </div>
                <div onClick={handleTab} id="noBut" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "noBut" ? "border-primary border-2" : ""}`}>
                    No, I don&apos;t know
                </div>
                <button
                    type="button"
                    className={`mt-6 hover:bg-primary/90  p-3 text-white w-full font-semibold rounded-full ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary"}`}
                    disabled={isButtonDisabled}
                    onClick={handleContinue}
                    aria-label='Continue'
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default DiabeticRetinopathy;
