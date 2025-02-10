import React from 'react';

const Stepper = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="">
      {steps.map((step, index) => (
        <div key={step} className="flex-1">
          <div className="relative flex justify-center items-center">
            <div
              className={` flex items-center justify-center 
              ${currentStep >= step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}
            >
             
            </div>

            {index < totalSteps - 1 && (
              <div
                className={`absolute left-1/2 top-4 w-full h-1 
                ${currentStep > step ? 'bg-green-500' : 'bg-gray-300'} z-0`}
                style={{ transform: 'translateX(50%)' }}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
