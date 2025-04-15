import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * UserInfoForm Component
 * 
 * A form component that allows users to input their height and weight information.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form with selected data
 * @param {Function} props.onBack - Callback function to go back to the previous form
 */
const UserInfoForm = ({ onNext, onBack }) => {
  // Initialize state from localStorage if available
  const [feet, setFeet] = useState(() => {
    const savedFeet = localStorage.getItem('UserInfoForm_feet');
    return savedFeet || "";
  });
  
  const [inches, setInches] = useState(() => {
    const savedInches = localStorage.getItem('UserInfoForm_inches');
    return savedInches || "";
  });
  
  const [weight, setWeight] = useState(() => {
    const savedWeight = localStorage.getItem('UserInfoForm_weight');
    return savedWeight || "";
  });

  const isButtonDisabled = !feet || !inches || !weight;

  /**
   * Handles the form submission when the user clicks Continue
   * Passes the height and weight data to the parent component and navigates to the next form
   */
  const handleContinue = () => {
    // Pass the height and weight data to the parent component and move to the next form
    const formData = {
      height: {
        feet,
        inches,
      },
      weight,
    };
    
    // Store the complete form data in localStorage as well
    localStorage.setItem('UserInfoForm_data', JSON.stringify(formData));
    
    onNext(formData, "weightCalculation");
  };

  return (
    <div className="w-full p-4 sm:p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full max-w-full min-h-[50vh] flex flex-col justify-evenly">
        {/* Main heading for the form */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-[10%] text-zinc-800 text-center leading-snug">
          Let's start with where you are now
        </h2>

        {/* White rounded container for form fields */}
        <div className="bg-white rounded-3xl md:px-28 px-10 md:py-16 py-10 shadow-sm md:mb-6">
          {/* Height Section */}
          <div className="mb-16">
            <label className="block text-gray-700 font-medium mb-2 text-left">
              Your height
            </label>
            <div className="flex flex-wrap gap-4 ">
              <input
                type="text"
                placeholder="Feet"
                className={`flex-1 p-2 sm:p-3 w-1/2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-sm sm:text-base ${!feet ? 'bg-[#ebf4f1]' : 'bg-white'}`}
                value={feet}
                onChange={(e) => {
                  const value = e.target.value;
                  setFeet(value);
                  localStorage.setItem('UserInfoForm_feet', value);
                }}
              />
              <input
                type="text"
                placeholder="Inches"
                className={`flex-1 p-2 sm:p-3 w-1/2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-sm sm:text-base ${!inches ? 'bg-[#ebf4f1]' : 'bg-white'}`}
                value={inches}
                onChange={(e) => {
                  const value = e.target.value;
                  setInches(value);
                  localStorage.setItem('UserInfoForm_inches', value);
                }}
              />
            </div>
          </div>

          {/* Weight Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-left">
              Your current weight
            </label>
            <div>
              <input
                type="text"
                placeholder="Pounds"
                className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-sm sm:text-base ${!weight ? 'bg-[#ebf4f1]' : 'bg-white'}`}
                value={weight}
                onChange={(e) => {
                  const value = e.target.value;
                  setWeight(value);
                  localStorage.setItem('UserInfoForm_weight', value);
                }}
              />
            </div>
          </div>
        </div>

        {/* Container for the back and continue buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {/* Back button */}
          <button
            type="button"
            className="hover:bg-gray-200 px-8 py-3 text-gray-700 font-semibold rounded-full border border-gray-300"
            onClick={onBack}
            aria-label="Back"
          >
            Back
          </button>
          {/* Continue button - disabled when required fields are empty */}
          <button
            type="button"
            className={`hover:bg-primary/90 px-4 sm:px-8 py-2 sm:py-3 text-white text-sm sm:text-base font-semibold rounded-full ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed" // Gray styling when disabled
                : "bg-primary hover:bg-primary"    // Primary color when enabled
            }`}
            disabled={isButtonDisabled}
            onClick={handleContinue} // Trigger the continue action
            aria-label="Continue"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
